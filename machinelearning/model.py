import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics
import pickle 

test=pd.read_csv("Testing.csv") 
train=pd.read_csv("Training.csv")

data = pd.concat([train, test])
columns_delete= ['nodal_skin_eruptions','muscle_wasting','burning_micturition','spotting_ urination','patches_in_throat','fluid_overload',
                'swelled_lymph_nodes', 'malaise', 'phlegm', 'swollen_extremeties', 'extra_marital_contacts', 'toxic_look_(typhos)', 'altered_sensorium',
                'dischromic _patches', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'receiving_unsterile_injections', 'coma', 'fluid_overload.1', 'silver_like_dusting',
                'small_dents_in_nails', 'yellow_crust_ooze']
for i in columns_delete:
    data.drop(data[data[i] == 1].index, inplace = True)
    del data[i]
# print(data['prognosis'].value_counts())

# columns=[]
# for i in data.columns:
#     if i=="prognosis":
#         break
#     else:
#         columns.append(i)

X, y=data.iloc[:,:-1], data.iloc[:,-1]
X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.2)

clf=RandomForestClassifier(n_estimators=100,criterion="gini",max_depth=10,min_samples_leaf=5,max_features="log2")
clf.fit(X_train,y_train)
y_pred=clf.predict(X_test)
print("Confusion Matrix", metrics.confusion_matrix(y_test, y_pred))
print("Report",metrics.classification_report(y_test, y_pred))
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))

pkl_filename = "pickle_model.pkl"
with open(pkl_filename, 'wb') as file:
    pickle.dump(clf, file)
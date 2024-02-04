import numpy as np
import pandas as pd
import os
import pickle
from flask import Flask, jsonify, request, redirect, json, session
from functools import wraps
import json
from flask_cors import CORS, cross_origin
import tensorflow as tf
from transformers import DistilBertTokenizerFast
from transformers import TFDistilBertForSequenceClassification
import collections

app = Flask(__name__)
cors = CORS(app, resources={r"": {"origins": "*"}})

# filename = '../machinelearning/pickle_model.pkl'
# model = pickle.load(open(filename, 'rb'))
# nlp = TFDistilBertForSequenceClassification.from_pretrained(
#     "../nlp/oversampling")
# tokenizer = DistilBertTokenizerFast.from_pretrained('distilbert-base-uncased')

# mappings = {
#     "Arthritis": "Rheumatologist",
#     "Varicose veins": "Vascular Surgeon",
#     "Dimorphic hemmorhoids(piles)": "General Surgeon",
#     "Heart attack": "Cardiologist",
#     "Cervical spondylosis": "Orthopedic",
#     "Hyperthyroidism": "Endocrinologist",
#     "Malaria": "General Physician",
#     "Acne": "Dermatologist",
#     "Hypoglycemia": "General Physician",
#     "Osteoarthristis": "Orthopedic",
#     "Hepatitis D": "Gastrologist",
#     "Jaundice": "General Physician",
#     "(vertigo) Paroymsal  Positional Vertigo": "Neurologist",
#     "Migraine": "Neurologist",
#     "Hypertension": "General Physician",
#     "hepatitis A": "Gastrologist",
#     "Diabetes ": "Diabetologist",
#     "Peptic ulcer diseae": "Gastrologist",
#     "Gastroenteritis": "Gastrologist",
#     "Chronic cholestasis": "Gastrologist",
#     "Allergy": "General Physician",
#     "GERD": "Gastrologist",
#     "Urinary tract infection": "Urologist",
#     "Typhoid": "General Physician",
#     "Alcoholic hepatitis": "Gastrologist",
#     "Hepatitis C": "Gastrologist",
#     "Paralysis (brain hemorrhage)": "Neurologist",
#     "Impetigo": "Dermatologist",
#     "Dengue": "General Physician",
# }

# @app.route('/ml/',methods=['GET'])
# def getSymptoms():
#     data=pd.read_csv("../machinelearning/Training.csv")
#     columns_delete= ['nodal_skin_eruptions','muscle_wasting','burning_micturition','spotting_ urination','patches_in_throat','fluid_overload',
#                     'swelled_lymph_nodes', 'malaise', 'phlegm', 'swollen_extremeties', 'extra_marital_contacts', 'toxic_look_(typhos)', 'altered_sensorium',
#                     'dischromic _patches', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'receiving_unsterile_injections', 'coma', 'fluid_overload.1', 'silver_like_dusting',
#                     'small_dents_in_nails', 'yellow_crust_ooze']
#     for i in columns_delete:
#         del data[i]
#     column = data.columns.values.tolist()
#     column.remove('prognosis')
#     return jsonify({"symptoms" : column})


# @app.route('/ml/predict/', methods=['POST'])
# @cross_origin()
# def predictDisease():
#     # Response:   {
#     #                 "disease": "Allergy",
#     #                 "specialist": "General Physician"
#     #             }
#     print(0)
#     data = json.loads(request.data)
#     print(1)
#     final_features = [np.array(list(data.values()))]
#     prediction = model.predict(final_features)
#     specialist = mappings[prediction[0]]
#     print(prediction[0], specialist)
#     return jsonify({"disease": prediction[0], "specialist": specialist})


# @app.route('/nlp/ratings/', methods=['POST'])
# @cross_origin()
# def getRatings():
#     # Response:   {
#     #                 "disease": "Allergy",
#     #                 "specialist": "General Physician"
#     #             }
#     data = json.loads(request.data)
#     final_features = data.get('string')
#     predict_input = tokenizer.encode(final_features,
#                                      truncation=True,
#                                      padding=True,
#                                      return_tensors="tf")
#     tf_output = nlp.predict(predict_input)[0]
#     tf_prediction = tf.nn.softmax(tf_output, axis=1)
#     labels = [0, 1, 2, 3, 4, 5]
#     label = tf.argmax(tf_prediction, axis=1)
#     label = label.numpy()
#     print(labels[label[0]])
#     return jsonify({"rating": labels[label[0]]})

@app.route('/ecg/predict', methods=['POST'])
def predict():
    file = request.files['file']
    file.save('uploads/{}'.format(file.filename))

    def is_sleep_pattern_irregular(sleep_stages):
        transitions = [(sleep_stages[i], sleep_stages[i + 1]) for i in range(len(sleep_stages) - 1) if sleep_stages[i] != sleep_stages[i+1]]
        transition_counts = {transition: transitions.count(transition) for transition in set(transitions)}
        total_transitions = sum(transition_counts.values())
        proportion_transitions = {transition: count / total_transitions for transition, count in transition_counts.items()}
        irregularity_threshold = 0.1
        for proportion in proportion_transitions.values():
            if proportion > irregularity_threshold:
                return True 
        return False

    model = tf.keras.models.load_model('../machinelearning/final_model.h5')
    test = np.load('uploads/{}'.format(file.filename))
    prediction = model.predict(test, 64)
    prediction = np.array([np.argmax(s) for s in prediction])
    c = collections.Counter(prediction)
    
    if(is_sleep_pattern_irregular([c[0], c[1], c[2], c[3], c[4]])):
        return redirect('http://localhost:3000/user/doctors?query=Sleep%20Specialist')
    else:
        return redirect('http://localhost:3000/user/sleep-well')

if __name__ == "__main__":
    app.run(debug=True, port=8000)

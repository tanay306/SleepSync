from flask import Flask, request, render_template
import json
import numpy as np
import tensorflow as tf
import collections

app = Flask(__name__)


@app.route('/')
def index():
    model = tf.keras.models.load_model('./model/final_model.h5')
    test = np.load('./model/test.npy')
    prediction = model.predict(test, 64)
    prediction = np.array([np.argmax(s) for s in prediction])
    c = collections.Counter(prediction)
    c1 = c[0] + c[1] + c[2]
    print(c[4]/(c1 + c[4]))
    return "<h1>Hello, World</h1>"

@app.route('/ecg/predict', methods=['POST'])
def predict():
    uploaded_file = request.files
    print(uploaded_file)
    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)
    return True

if __name__ == '__main__':
    app.run(debug=True)
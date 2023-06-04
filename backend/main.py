from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import requests

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://quickclickcuisine:egzUt9nRmDlZPZSr@qcc.xnffmnn.mongodb.net/restaurant?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true"
mongo = PyMongo(app)

if __name__ == '__main__':
    app.run(debug=True)

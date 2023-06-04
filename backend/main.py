from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import requests
from helpers import generate_id

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://quickclickcuisine:egzUt9nRmDlZPZSr@qcc.xnffmnn.mongodb.net/restaurant?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true"
mongo = PyMongo(app)

@app.route('/order', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data or 'user_id' not in data or 'ingredients' not in data or 'type' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    order_id = generate_id()
    order = {
        'user_id': data.get('user_id'),
        'order_id': order_id,
        'ingredients': data.get('ingredients'),
        'type': data.get('type'),
        'status': 'in progress',
    }
    mongo.db.orders.insert_one(order)
    return jsonify({'message': 'Order placed successfully', 'order_id': order_id}), 201

if __name__ == '__main__':
    app.run(debug=True)

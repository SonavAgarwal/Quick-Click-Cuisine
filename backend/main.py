from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import requests
from datetime import datetime
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
        'timestamp': datetime.utcnow()  # add timestamp when the order is created
    }
    mongo.db.orders.insert_one(order)
    return jsonify({'message': 'Order placed successfully', 'order_id': order_id}), 201


@app.route('/orders/inprogress', methods=['GET'])
def get_in_progress_orders():
    try:
        in_progress_orders = mongo.db.orders.find({'status': 'in progress'})
        return jsonify(list(in_progress_orders)), 200
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500
    

@app.route('/orders/user/<user_id>', methods=['GET'])
def get_past_orders(user_id):
    try:
        past_orders = mongo.db.orders.find({'user_id': user_id, 'status': 'completed'})
        return jsonify(list(past_orders)), 200
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500

@app.route('/orders/all', methods=['GET'])
def get_all_orders():
    try:
        all_orders = mongo.db.orders.find()
        return jsonify(list(all_orders)), 200
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
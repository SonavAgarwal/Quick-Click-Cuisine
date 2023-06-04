from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import bson
from bson import json_util
import requests
from datetime import datetime
from helpers import generate_id, generate_estimate, generate_order_number
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
        'user_name': data.get('user_name'),
        'order_id': str(order_id),
        'order_number': generate_order_number(),
        'ingredients': data.get('ingredients'),
        'side': data.get('side'),
        'beverage': data.get('beverage'),
        'type': data.get('type'),
        'status': 0,
        'timestamp': datetime.utcnow()  # add timestamp when the order is created
    }
    res = requests.get("http://127.0.0.1:5000/orders/inprogress").json()
    mongo.db.orders.insert_one(order)
    return jsonify({'message': 'Order placed successfully', 'order_id': order_id, 'order_position': str(len(res) + 1)}), 201


@app.route('/orders/inprogress', methods=['GET'])
def get_in_progress_orders():
    try:
        in_progress_orders = mongo.db.orders.find({'status': 'in progress'})
        newList = list(in_progress_orders)
        newList = [json_util.dumps(doc) for doc in newList]
        return jsonify(newList), 200
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500
    

@app.route('/orders/user/<user_id>', methods=['GET'])
def get_past_orders(user_id):
    try:
        past_orders = mongo.db.orders.find({'user_id': user_id, 'status': 'completed'})
        newList = list(past_orders)
        newList = [json_util.dumps(doc) for doc in newList]
        return jsonify(newList), 200
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500

@app.route('/orders/all', methods=['GET'])
def get_all_orders():
    try:
        all_orders = mongo.db.orders.find()
        newList = list(all_orders)
        newList = [json_util.dumps(doc) for doc in newList]
        return jsonify(newList), 200
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500
    
@app.route('/orders/status/<order_id>', methods=['GET'])
def get_order_status(order_id):
    order = mongo.db.orders.find_one({'order_id': order_id})
    if not order_id:
        return jsonify({'error': 'Missing order_id'}), 400
    if order:
        order_timestamp = order.get('timestamp')
        orders_ahead = mongo.db.orders.count_documents({'status': 'in progress', 'timestamp': {'$lt': order_timestamp}})
        order_position = orders_ahead + 1
    else:
        return jsonify({'error': 'Order not found'}), 404

    estimated_time = generate_estimate(orders_ahead)

    return jsonify({'status': order['status'], 'position': order_position, 'estimated_time': estimated_time}), 200

@app.route('/order/bumpStatus', methods=['POST'])
def finish_order():
    data = request.get_json()
    if not data or 'order_id' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    order = mongo.db.orders.find_one({'order_id': data.get('order_id')})
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    order_id = data.get('order_id')
    if (order.get('status') == 2):
        mongo.db.orders.delete_one({'order_id': order_id})
        return jsonify({'message': 'Order deleted'}), 200
    else:
        mongo.db.orders.update_one({'order_id': order_id}, {'$set': {'status': order.get('status') + 1}})
        return jsonify({'message': 'Order status changed'}), 200
    


if __name__ == '__main__':
    app.run(debug=True)
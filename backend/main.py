from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import bson
from bson import json_util
import requests
from datetime import datetime
from helpers import generate_id, generate_estimate, generate_order_number
from flask_cors import CORS
import sys
import re
import math

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://quickclickcuisine:egzUt9nRmDlZPZSr@qcc.xnffmnn.mongodb.net/restaurant?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true"
mongo = PyMongo(app)

# UTILITIES

# create new object in users collection with default values
def create_user(user_id, user_name="no name"):

    print('Creating new user object:', file=sys.stderr)
    print('    user_id =', user_id, file=sys.stderr)
    print('    user_name =', user_name, file=sys.stderr)

    mongo.db.users.insert_one({
        'user_id': user_id,
        'user_name': user_name,
        'favorites': [],
        'orders': [],
        'food_type_count': {
            'pizza': 0,
            'salad': 0,
            'sandwich': 0
        }
    })


# ROUTES

@app.route('/order', methods=['POST'])
def create_order():
    print('/order', file=sys.stderr)
    data = request.get_json()
    # return 'test', 201
    print(data, file=sys.stderr)
    if not data or 'user_id' not in data or 'ingredients' not in data or 'type' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    order_id = generate_id()
    order = {
        'user_id': data.get('user_id'),
        'user_name': data.get('user_name'),
        'order_id': order_id,
        'order_number': generate_order_number(),
        'ingredients': data.get('ingredients'),
        'side': data.get('side'),
        'beverage': data.get('beverage'),
        'type': data.get('type'),
        'status': 0,
        'isFavorite': False,
        'timestamp': datetime.utcnow()  # add timestamp when the order is created
    }

    order_position = mongo.db.orders.count_documents({'status': 1})
    mongo.db.orders.insert_one(order)

    # create user if not exists
    if not mongo.db.users.find_one({'user_id': data.get('user_id')}):
        create_user(user_id=data.get('user_id'), user_name=data.get('user_name'))

    # update user orders and food type count
    mongo.db.users.update_one(
        {'user_id': data.get('user_id')},
        {
            '$push': {
                'orders': order_id
            },
            '$inc': {
                'food_type_count.' + data.get('type'): 1
            }
        }
    )

    # update total food type count
    mongo.db.globals.update_one(
        {'title': 'food_type_count'},
        {
            '$inc': {
                'content.' + data.get('type'): 1
            }
        }
    )

    return jsonify({
        'message': 'Order placed successfully',
        'order_id': order_id,
        'order_position': str(order_position + 1)
    }), 201


@app.route('/orders/inprogress', methods=['GET'])
def get_in_progress_orders():
    try:
        in_progress_orders = mongo.db.orders.find({})
        newList = list(in_progress_orders)
        newList = [json_util.dumps(doc) for doc in newList]
        return jsonify(newList), 200
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500
    

@app.route('/waitTime', methods=['GET'])
def get_wait_time():
    try:
        print("SDLFKJSDLKJFSDKLJSFKLDJLKFD")
        status_0_orders = mongo.db.orders.find({'status': 0})
        print("SDLFKJSDLKJFSDKLJSFKLDJLKFD")
        status_1_orders = mongo.db.orders.find({'status': 1})
        print("SDLFKJSDLKJFSDKLJSFKLDJLKFD")
        size = len(list(status_0_orders)) + len(list(status_1_orders))
        wait_time = math.ceil(size * 1.37)
        return jsonify({'wait_time': wait_time}), 200
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500
    

@app.route('/orders/user/<user_id>', methods=['GET'])
def get_user_orders(user_id):
    try:
        past_orders = mongo.db.orders.find({'user_id': user_id })
        newList = list(past_orders)
        newList = [json_util.dumps(doc) for doc in newList]
        return jsonify(newList), 200
    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500

@app.route('/orders/past/user/<user_id>', methods=['GET'])
def get_past_orders(user_id):
    try:
        # include status in the query
        past_orders = mongo.db.orders.find({'user_id': user_id, 'status': 3})
        newList = list(past_orders)
        # convert each document to a JSON string
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
    if not order_id:
        return jsonify({'error': 'Missing order_id'}), 400

    order = mongo.db.orders.find_one({'order_id': order_id})
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    order_timestamp = order.get('timestamp')
    orders_ahead = mongo.db.orders.count_documents({'status': 1, 'timestamp': {'$lt': order_timestamp}})
    order_position = orders_ahead + 1

    estimated_time = generate_estimate(orders_ahead)

    return jsonify({'status': order['status'], 'position': order_position, 'estimated_time': estimated_time}), 200

@app.route('/orders/type_count', methods=['GET'])
def get_global_type_count():
    type_count = mongo.db.globals.find_one({'title': 'food_type_count'})
    return jsonify(type_count['content']), 200


@app.route('/order/<order_id>/contents', methods=['GET'])
def get_order_contents(order_id):

    order = mongo.db.orders.find_one({'order_id': order_id})

    if not order:
        return jsonify({'error': 'Order not found'}), 404

    contents = {
        'type': order['type'],
        'ingredients': order['ingredients'],
        'side': order['side'],
        'beverage': order['beverage']
    }

    return jsonify(contents), 200

@app.route('/order/<order_id>/isFavorite', methods=['GET'])
def get_is_favorite(order_id):

    # # script to update isFavorite for all existing favorites
    # for user in mongo.db.users.find({}):
    #     favorites = user['favorites']
    #     for favorite in favorites:
    #         mongo.db.orders.update_one( { 'order_id': favorite['order_id'] }, { '$set': {'isFavorite': True} })

    order = mongo.db.orders.find_one({'order_id': order_id, 'isFavorite': True})
    if not order:
        return jsonify(False), 200

    return jsonify(True), 200

@app.route('/order/bumpStatus', methods=['POST'])
def finish_order():
    data = request.get_json()
    if not data or 'order_id' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    if not mongo.db.orders.find_one({'order_id': data.get('order_id')}):
        return jsonify({'error': 'Order not found'}), 404
    
    mongo.db.orders.update_one({'order_id': data.get('order_id')}, {'$inc': {'status': 1}})
    return jsonify({'message': 'Order status changed'}), 200
    
@app.route('/order/favorite', methods=['POST'])
def favorite_order():
    data = request.get_json()
    if not data or 'order_id' not in data or 'order_nickname' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    order_id = data.get('order_id')
    order_nickname = data.get('order_nickname')

    order = mongo.db.orders.find_one({'order_id': order_id})
    if not order:
        return jsonify({'error': 'Order ID not found'}), 400

    # set isFavorite to true for the order
    mongo.db.orders.update_one(
        {
            'order_id': order_id
        },
        {
            '$set': {
                'isFavorite': True
            }
        }
    )

    # create user if not exists
    user_id = order['user_id']
    if not mongo.db.users.find_one({'user_id': user_id}):
        create_user(user_id=user_id, user_name=order['user_name'])

    # add favorite to the user's favorite array
    mongo.db.users.update_one(
        {'user_id': user_id},
        {
            '$push': {
                'favorites': {
                    'order_nickname': order_nickname,
                    'order_id': order_id
                }
            }
        }
    )


    return jsonify({'message': 'Order favorited!'}), 200

@app.route('/user/<user_id>/favorites', methods=['GET'])
def get_user_favorites(user_id):
    try:
        user_doc = mongo.db.users.find_one({'user_id': user_id})
        if not user_doc:
            return jsonify({'error': 'User not found'}), 200

        return jsonify(user_doc['favorites']), 200

    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500

@app.route('/user/<user_id>/type_count', methods=['GET'])
def get_user_type_count(user_id):
    try:
        user = mongo.db.users.find_one({'user_id': user_id})
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user['food_type_count']), 200

    except Exception as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500

@app.route('/user/<user_id>/searchIngredients/<ingredients>', methods=['GET'])
def get_user_orders_with_ingredients(user_id, ingredients):

    pattern = re.compile(ingredients, re.IGNORECASE)

    orders = mongo.db.orders.find({
        'user_id': user_id,
        'ingredients': {
            #'$all': ingredients.split(",")
            '$regex': pattern
        }
    })

    return_list = []

    newList = list(orders)
    newList = [json_util.dumps(doc) for doc in newList]
    return jsonify(newList), 200

if __name__ == '__main__':
    
    app.run(debug=True)
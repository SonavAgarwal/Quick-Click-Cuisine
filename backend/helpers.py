import uuid
import random

def generate_id():
    return str(uuid.uuid4())

def generate_estimate(incomplete_orders_count):
    return incomplete_orders_count / 3 * 13 

def generate_order_number():
    # return a random 6 digit number
    return random.randint(100000, 999999)

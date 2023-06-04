import uuid

def generate_id():
    return str(uuid.uuid4())

def generate_estimate(incomplete_orders_count):
    return incomplete_orders_count / 3 * 13 

# Quick-Click-Cuisine backend

## MongoDB

https://cloud.mongodb.com/v2/647b539cee2b2a15c2042948#/metrics/replicaSet/647b53e18b72bf284b5fb1b1/explorer/restaurant/orders/find

quickclickcuisine@gmail.com

MOngodb01!

## Endpoints

### GET `/order`

### GET `/orders/inprogress`

### GET `/orders/user/<user_id>`

Returns ALL orders with a matching user_id (can be currently open orders).

### GET `/orders/past/user/<user_id>`

Returns the order history of a user by filtering through the status tag.

### GET `/orders/all`

### GET `orders/status/<order_id>`

### GET `/orders/type_count`

Returns the count of each type of order for all users.

Example return:
```json
{
    "pizza": 1,
    "salad": 2,
    "sandwich": 3
}
```

### GET `order/<order_id>/contents`

Gets the ingredients, side, and beverage of an order.

Example return:
```json
{
    "type": ,
    "ingredients": [],
    "side": ,
    "beverage": 
}
```

### POST `/order/bumpStatus`

### POST `/order/favorite`

Adds `order_id` to the list of favorite orders of the user that made the order, under the name `order_nickname`.

Body:
```json
{
    "order_id": ,
    "order_nickname": ,
}
```

### GET `/user/<user_id>/favorites`

Returns the list of `order_id`'s of the user's favorite orders.

Example return:
```json
[
    {
        "order_id": "order_id_1",
        "order_nickname": "order_nickname_1"
    },
    {
        "order_id": "order_id_2",
        "order_nickname": "order_nickname_2"
    }
    // ...
]
```

### GET `/user/<user_id>/type_count`

Returns the count of each type of order the user has made.

Example return:
```json
{
    "pizza": 1,
    "salad": 2,
    "sandwich": 3 
}
```

### GET `/user/<user_id>/searchIngredients`

Given a list of ingredients, returns the `order_id`'s of all orders that contain all these ingredients from `user_id`.

Body:
```json
{
    "ingredients": [
        "ingredient_1",
        "ingredient_2",
        // ...
    ]
}
```

Example return:
```json
[
    "order_id_1",
    "order_id_2",
    // ...
]
```

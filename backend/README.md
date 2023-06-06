# Quick-Click-Cuisine backend

## Endpoints

### GET `/order`

### GET `/orders/inprogress`

### GET `/orders/user/<user_id>`

### GET `/orders/past/user/<user_id>`

### GET `/orders/all`

### GET `orders/status/<order_id>`

### GET `order/<order_id>/contents`

Gets the ingredients, side, and beverage of an order.

Return format:
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

Return format:
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
    ...
]
```

### GET `/user/<user_id>/searchIngredients`

Given a list of ingredients, returns the `order_id`'s of all orders that contain all these ingredients from `user_id`.

Body:
```json
{
    "ingredients": [
        "ingredient_1",
        "ingredient_2",
        ...
    ]
}
```

Return format: 
```json
[
    "order_id_1",
    "order_id_2",
    ...
]
```
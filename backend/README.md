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

Data:
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
    "order_id_1",
    "order_id_2",
    ...
]
```
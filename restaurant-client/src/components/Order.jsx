import React, {useState, useEffect} from 'react'
import './Order.css'
import axios from 'axios';


export const Order = ({column, order, fetchData}) => {

    function getButtonText() {
        if (column == 1) {
            return "Start"
        }
        else if (column == 2) {
            return "Finish"
        }
        else if (column == 3) {
            return "Picked Up"
        }

        return "Broken"
    }

    async function incrementColumn() {
        const data = {
            order_id: order.order_id,
        };

        const response = await axios.post(
            "http://127.0.0.1:5000/order/bumpStatus",
            data
        );

        if (response.status === 200) {
            console.log("Order changed successfully!");
            console.log(response.data);

            setTimeout(() => {
                fetchData();
            }, 50);
        } else {
            console.log("Error changing order!");
            console.log(response.data);
        }
    }

    if (!order) return null

  return (
    <div className='order-card'>
        <div className='info'>
            <h1>4:20 PM</h1>
            <h1>666</h1>
            <h1>Rahul Ravi (123456789)</h1>
        </div>
        
        <div className='order-items'>
            <div className='items-list'>
                <h1>{order.type}</h1>
                <ul>
                {order.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
                </ul>
            </div>
            <div className='items-list'>
                <h1>sides</h1>
                <ul>
                    <li>{order.side}</li>
                    <li>{order.beverage}</li>
                </ul>
            </div>
        </div>
        
        <button onClick = {incrementColumn}>{getButtonText()}</button>

    </div>
  )
}

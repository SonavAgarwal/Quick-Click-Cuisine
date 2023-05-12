import React from 'react';
import './InstantOrderCard.scss';
import pizzaImage from '../static/pizzaIcon.png';
import sandwichImage from '../static/sandwichIcon.png';
import saladImage from '../static/saladIcon.png';

export function InstantOrderCard({name, type}){

    let image;
    let time = 20;

    if (type === "sandwich"){
        image = sandwichImage;
    }
    else if (type === "pizza"){
        image = pizzaImage;
    }
    else if (type === "salad"){
        image = saladImage;
    }

    return (
        <div className="container">
            <img src = {image} className = "orderImage"></img>
            <div className = "textContainer">
                <div className = "orderName">{name}</div>
                <div className = "waitTime">Ready in {time} min</div>
            </div>
            <button className = "orderButton">Order</button>
        </div>
    )
}
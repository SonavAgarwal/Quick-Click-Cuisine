import React from "react";
import "./OrderCard.scss";
import pizzaFull from '../static/pizza.png';
import sandwichFull from '../static/sandwich.png';
import saladFull from '../static/salad.png';

export const OrderCard = (props) => {

    const type = props.type;
    const desc = props.desc;
    let redirect;
    
    let image; 
    if (type === "Sandwich"){
        image = sandwichFull;
        redirect = '/sandwich';
    }
    if (type === "Pizza"){
        image = pizzaFull;
        redirect = '/pizza';
    }
    if (type === "Salad"){
        image = saladFull;
        redirect = '/salad';
    }

    return (
        <div className = "orderCard">
            <div className = "content">
                <img src = {image}></img>
                <div className = "textContainer">
                    <div className = "orderTitle">{type}</div>
                    <div className = "orderDesc">{desc}</div>
                </div>
            </div>
            <button className = "orderButton" onClick = {() => window.location.href = redirect}>Select</button>
        </div>
    );
}
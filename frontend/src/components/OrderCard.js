import React from "react";
import "./OrderCard.scss";
import pizzaFull from '../static/pizza.png';
import sandwichFull from '../static/sandwich.png';
import saladFull from '../static/salad.png';
import { useNavigate } from 'react-router-dom';

export const OrderCard = (props) => {

    const type = props.type;
    const desc = props.desc;
    let redirect;
    let image; 

    const navigate = useNavigate();
    const destination = "/" + type;

    if (type === "sandwich"){
        image = sandwichFull;
    }
    if (type === "pizza"){
        image = pizzaFull;
    }
    if (type === "salad"){
        image = saladFull;
    }

    const handleClick = () => {
        navigate(destination, {state: {fromPage : "order" }});
    };

    return (
        <div className = "orderCard">
            <div className = "content">
                <img src = {image}></img>
                <div className = "textContainer">
                    <div className = "orderTitle">{type}</div>
                    <div className = "orderDesc">{desc}</div>
                </div>
            </div>
            <button className = "orderButton" onClick = {handleClick}>Select</button>
        </div>
    );
}
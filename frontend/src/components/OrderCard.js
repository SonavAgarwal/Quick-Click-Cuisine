import React from "react";
import "./OrderCard.scss";
import pizzaFull from '../static/pizza.png';
import sandwichFull from '../static/sandwich.png';
import saladFull from '../static/salad.png';
import { useNavigate } from 'react-router-dom';

export const OrderCard = (props) => {

    const type = props.type;
    const desc = props.desc;
    let image;
    let altText;

    const navigate = useNavigate();
    const destination = "/" + type.charAt(0).toLowerCase() + type.slice(1);

    if (type === "Sandwich"){
        image = sandwichFull;
        altText = "Sandwich";
    }
    if (type === "Pizza"){
        image = pizzaFull;
        altText = "Pizza";
    }
    if (type === "Salad"){
        image = saladFull;
        altText = "Salad";
    }

    const handleClick = () => {
        navigate(destination, {state: {fromPage : "order" }});
    };

    return (
        <div className = "orderCard">
            <div className = "content">
                <img src = {image} alt = {altText}></img>
                <div className = "textContainer">
                    <div className = "orderTitle">{type}</div>
                    <div className = "orderDesc">{desc}</div>
                </div>
            </div>
            <button className = "orderButton" onClick = {handleClick}>Select</button>
        </div>
    );
}
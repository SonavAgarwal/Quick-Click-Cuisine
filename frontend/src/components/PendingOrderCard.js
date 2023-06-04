import {React, useState} from 'react';
import './PendingOrderCard.scss';
import pizzaFull from '../static/pizza.png';
import sandwichFull from '../static/sandwich.png';
import saladFull from '../static/salad.png';

export const PendingOrderCard = (props) => {
    let type = props.type;
    let ingredients = props.ingredients;
    let progress = props.status;
    let image;

    if (type === "Sandwich"){
        image = sandwichFull;
    }
    if (type === "Pizza"){
        image = pizzaFull;
    }
    if (type === "Salad"){
        image = saladFull;
    }

    let desc = type + " with ";
    for (let i = 0; i < ingredients.length - 1; i++){
        desc += ingredients[i] + ", ";
    }

    desc += "and " + ingredients[ingredients.length - 1];

    //Tracks stage of completion for bar width and color
    const [completion, setCompletion] = useState(0);
    let status = "Pending";

    let barStyle;
    let buttonStyle;

    if (progress === 0){
        barStyle = "pending";
        buttonStyle = "buttonPending";
        status = "Pending";
    }
    if (progress === 1){
        barStyle = "inProgress";
        buttonStyle = "buttonProgress";
        status = "In Progress";
    }

    if (progress === 2){
        barStyle = "completed";
        buttonStyle = "buttonReady";
        status = "Ready!";
    }

    const updateCompletion = () =>{
        if (completion <= 1){
            setCompletion(completion + 1);
        }
        else{
            setCompletion(0);
        }
    }

    return (
        <div className = "pendingCard">
            <div className = {`bar ${barStyle}`}></div>
            <div className = "content">
                <img src = {image}></img>
                <div className = "textContainer">
                    <div className = "orderTitle">{type}</div>
                    <div className = "orderDesc">{desc}</div>
                </div>
            </div>
            <button className = {`status ${buttonStyle}`}>{status}</button>

        </div>
    );
}
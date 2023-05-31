import {React, useState} from 'react';
import './HistoryCard.scss';
import pizzaFull from '../static/pizza.png';
import sandwichFull from '../static/sandwich.png';
import saladFull from '../static/salad.png';
import starIcon from '../static/starIcon.svg';
import writeIcon from '../static/writeIcon.svg';

export const HistoryCard = (props) => {
    let type = props.type;
    let desc = props.desc;
    let date = props.date;
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

    return (
        <div className = "historyCard">
            {/* <div className = {`bar ${barStyle}`}></div> */}
            <div className = "content">
                <img src = {image}></img>
                <div className = "textContainer">
                    <div className = "orderTitle">{type}</div>
                    <div className = "date">{date}</div>
                    <div className = "orderDesc">{desc}</div>
                </div>
            </div>
            <div className = "historyFooter">
                <img  className = "starIcon" src = {starIcon}></img>
                <div className = "spacer"></div>
                <img classname = "writeIcon" src = {writeIcon}></img>
                <button className = "reorder">Reorder</button>
            </div>

        </div>
    );
}
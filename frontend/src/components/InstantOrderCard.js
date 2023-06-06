import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './InstantOrderCard.scss';
import pizzaImage from '../static/pizzaIcon.png';
import sandwichImage from '../static/sandwichIcon.png';
import saladImage from '../static/saladIcon.png';

export function InstantOrderCard(props){
    
    const order_id = props.oid;
    const name = props.nickname;
    let image;
    let time = 20;
    const navigate = useNavigate();
    const [orderType, setType] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [beverage, setBeverage] = useState();
    const [side, setSide] = useState();


    useEffect(() => {
        fetch("http://127.0.0.1:5000/order/" + order_id + "/contents")
        .then((res) => res.json())
        .then((data) => {
            const typeUpper = data.type.charAt(0).toUpperCase() + data.type.slice(1);
            setType(typeUpper);
            // console.log("type is " + type);
            setIngredients(data.ingredients);
            setBeverage(data.beverage);
            setSide(data.side);
        })
    }, [])

    const handleOrder = () => {
        // console.log(type);
        navigate('/reorder', {state: { ingredients, side, beverage, orderType}});
      }

    if (orderType === "Sandwich"){
        image = sandwichImage;
    }
    else if (orderType === "Pizza"){
        image = pizzaImage;
    }
    else if (orderType === "Salad"){
        image = saladImage;
    }

    return (
        <div className="container">
            <img src = {image} className = "orderImage"></img>
            <div className = "textContainer">
                <div className = "orderName">{name}</div>
                <div className = "waitTime">Ready in {time} min</div>
            </div>
            <button className = "orderButton" onClick = {handleOrder}>Order</button>
        </div>
    )
}
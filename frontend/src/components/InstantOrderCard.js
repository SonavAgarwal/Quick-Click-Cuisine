import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import './InstantOrderCard.scss';
import pizzaFull from '../static/pizza.png';
import sandwichFull from '../static/sandwich.png';
import saladFull from '../static/salad.png';

export function InstantOrderCard(props){
    
    const order_id = props.oid;
    const name = props.nickname;
    let image;
    const navigate = useNavigate();
    const [orderType, setType] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [beverage, setBeverage] = useState();
    const [side, setSide] = useState();

    const fetchContents = () => {
        fetch("http://127.0.0.1:5000/order/" + order_id + "/contents")
        .then((res) => res.json())
        .then((data) => {
            const typeUpper = data.type.charAt(0).toUpperCase() + data.type.slice(1);
            setType(typeUpper);
            setIngredients(data.ingredients);
            setBeverage(data.beverage);
            setSide(data.side);
        })
    }


    useEffect(() => {
        //Gets contents of the order
        fetchContents();
    }, [])

    const handleOrder = () => {
        navigate('/reorder', {state: { ingredients, side, beverage, orderType}});
      }

    if (orderType === "Sandwich"){
        image = sandwichFull;
    }
    else if (orderType === "Pizza"){
        image = pizzaFull;
    }
    else if (orderType === "Salad"){
        image = saladFull;
    }

    return (
        <div className="container">
            <img src = {image} className = "orderImage"></img>
            <div className = "textContainer">
                <div className = "orderName">{name}</div>
            </div>
            <button className = "orderButton" onClick = {handleOrder}>Order</button>
        </div>
    )
}
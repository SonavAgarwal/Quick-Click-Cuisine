import {React, useState, useEffect} from 'react';
import './HistoryCard.scss';
import pizzaFull from '../static/pizza.png';
import sandwichFull from '../static/sandwich.png';
import saladFull from '../static/salad.png';
import axios from "axios";

export const HistoryCard = (props) => {
    const [isFavorite, setFavorite] = useState();
    const [buttonStyle, setButtonStyle] = useState("yellow");
    const [buttonContent, setButtonContent] = useState("Favorite");

    const fetchFavorite = () => {
        console.log("fetchFavorite is called");
        fetch("http://127.0.0.1:5000/order/" + orderId + "/isFavorite")
        .then((res) => res.json())
        .then((data) => {
            setFavorite(data);
            console.log("favorite is now " + isFavorite);
        })
    }

    useEffect(() =>{
        fetchFavorite();
        if (isFavorite === true){
            setButtonStyle("green");
            setButtonContent("Favorited");
        }
    });

    let type = props.type;
    let ingredients = props.ingredients; 
    let orderId = props.oid;
    let image;

    if (type === "Sandwich"){
        image = sandwichFull;
    }
    if (type === "Salad"){
        image = saladFull;
    }
    if (type === "Pizza"){
        image = pizzaFull;
    }

    const [orderTitle, setOrderTitle] = useState("");

    let desc = type + " with ";
    for (let i = 0; i < ingredients.length - 1; i++){
        desc += ingredients[i] + ", ";
    }

    desc += "and " + ingredients[ingredients.length - 1];

    const handleNameChange = (event) => {
        setOrderTitle(event.target.value);
        console.log(orderTitle);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.target.blur();
        }
     };

      async function addFavorite () {
        setFavorite(false);
        setButtonStyle("green");
        setButtonContent("Favorited");
        if (isFavorite !== true){
            if (orderTitle === ""){
                const data = {
                    "order_id": orderId,
                    "order_nickname": type
                }
        
                const response = await axios.post("http://127.0.0.1:5000/order/favorite", data);
                if (response.status === 200){
                    console.log("order favorited successfully!");
                }
            }
            else{
                const data = {
                    "order_id": orderId,
                    "order_nickname": orderTitle
                }
        
                const response = await axios.post("http://127.0.0.1:5000/order/favorite", data);
                if (response.status === 200){
                    console.log("order favorited successfully!");
                }
            }
        }
      }

    return (
        <div className = "historyCard">
            <div className = "content">
                <img src = {image}></img>
                <div className = "textContainer">
                    <div className = "orderContainer">
                        <input className = "orderTitle" id = "inputField" placeholder={type} value = {orderTitle} maxLength={10} onChange={handleNameChange} onKeyDown = {handleKeyDown}></input>
                    </div>
                    <div className = "orderDesc">{desc}</div>
                </div>
            </div>
            <div className = "historyFooter">
                <div className = "spacer"></div>
                <button className = {`reorder ${buttonStyle}`} onClick = {addFavorite}>{buttonContent}</button>
            </div>

        </div>
    );
}

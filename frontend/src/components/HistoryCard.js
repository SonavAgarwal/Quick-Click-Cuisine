import {React, useState, useEffect} from 'react';
import './HistoryCard.scss';
import pizzaFull from '../static/pizza.png';
import sandwichFull from '../static/sandwich.png';
import saladFull from '../static/salad.png';
import starIcon from '../static/starIcon.svg';
import writeIcon from '../static/writeIcon.svg';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const HistoryCard = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    let type = props.type;

    let pastIngredients = props.ingredients;
    let pastSide = props.side;
    let pastBeverage = props.beverage;
    let timestamp = props.timestamp;
    let orderId = props.oid;

    const [ingredients, setIngredients] = useState(pastIngredients);
    const [newType, setNewType] = useState(type);
    const [orderTitle, setOrderTitle] = useState(newType);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState();

    useEffect(() =>{
        setIngredients(pastIngredients);
    }, [pastIngredients]);

    useEffect(() => {
        setNewType(type)
    }, [type]);

    useEffect(() => {
        if(newType === "Sandwich") {
            setImage(sandwichFull);
        }
        if(newType === "Pizza") {
            setImage(pizzaFull);
        }
        if(newType === "Salad") {
            setImage(saladFull);
        }
    }, [newType]);

    let desc = type + " with ";
    for (let i = 0; i < ingredients.length - 1; i++){
        desc += ingredients[i] + ", ";
    }

    desc += "and " + ingredients[ingredients.length - 1];

    const handleTitleClick = () => {
        setIsEditing(true);
     };
    
    const handleTitleBlur = () => {
        setIsEditing(false);
    };

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

     const redirectToInputField = (event) => {
        event.preventDefault();
        const inputField = document.getElementById("inputField");
        inputField.scrollIntoView({ behavior: 'smooth' });
        inputField.focus();
      };

      async function addFavorite () {
        const data = {
            "order_id": orderId,
            "order_nickname": orderTitle
        }

        const response = await axios.post("http://127.0.0.1:5000/order/favorite", data);
        if (response.status === 200){
            console.log("order favorited successfully!");
        }
        else{
            console.log("shit")
        }
      }

    return (
        <div className = "historyCard">
            <div className = "content">
                <img src = {image}></img>
                <div className = "textContainer">
                    <div className = "orderContainer">
                        <input className = "orderTitle" id = "inputField" defaultValue={newType} maxLength={10} onClick={handleTitleClick} onBlur={handleTitleBlur} onChange={handleNameChange} onKeyDown = {handleKeyDown}></input>
                    </div>
                    <div className = "date">{timestamp}</div>
                    <div className = "orderDesc">{desc}</div>
                </div>
            </div>
            <div className = "historyFooter">
                <div className = "spacer"></div>
                <button className = "reorder" onClick = {addFavorite}>Favorite</button>
            </div>

        </div>
    );
}

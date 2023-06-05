import {React, useState, useEffect} from 'react';
import './HistoryCard.scss';
import pizzaFull from '../static/pizza.png';
import sandwichFull from '../static/sandwich.png';
import saladFull from '../static/salad.png';
import starIcon from '../static/starIcon.svg';
import writeIcon from '../static/writeIcon.svg';
import { useLocation, useNavigate } from "react-router-dom";

export const HistoryCard = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    let type = props.type;
    let desc = props.desc;
    let date = props.date;
    let image;

    const [ingredients, setIngredients] = useState(["Hoagie Roll", "Cucumber", "Sundried Tomato Pesto"]);
    const [side, setSide] = useState("Orange");
    const [beverage, setBeverage] = useState("Fountain Beverage");
    const [orderType, setOrderType] = useState("sandwich");

    useEffect(() =>{
        
    }, []);

    if (type === "Sandwich"){
        image = sandwichFull;
    }
    if (type === "Pizza"){
        image = pizzaFull;
    }
    if (type === "Salad"){
        image = saladFull;
    }

    const [orderTitle, setOrderTitle] = useState(type);
    const [isEditing, setIsEditing] = useState(false);


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
          event.target.blur(); // Trigger the onBlur event
        }
     };

     const redirectToInputField = (event) => {
        event.preventDefault();
        const inputField = document.getElementById("inputField");
        inputField.scrollIntoView({ behavior: 'smooth' });
        inputField.focus();
      };

    //   setIngredients(["Hoagie Roll", "Cucumber", "Sundried Tomato Pesto"]);
    //   setSide("Orange");
    //   setBeverage("Fountain Beverage");

      const handleReorderClick = () => {
        console.log(orderType);
        navigate('/reorder', {state: { ingredients, side, beverage, orderType}});
      }

    return (
        <div className = "historyCard">
            <div className = "content">
                <img src = {image}></img>
                <div className = "textContainer">
                    <div className = "orderContainer">
                        <input className = "orderTitle" id = "inputField" defaultValue={orderTitle} maxLength={10} onClick={handleTitleClick} onBlur={handleTitleBlur} onChange={handleNameChange} onKeyDown = {handleKeyDown}></input>
                        {/* {!isEditing && <img className = "writeIcon" src = {writeIcon} onClick={redirectToInputField}></img>} */}
                        <div className = "writeIcon" onClick={redirectToInputField}>✏️</div>
                    </div>
                    <div className = "date">{date}</div>
                    <div className = "orderDesc">{desc}</div>
                </div>
            </div>
            <div className = "historyFooter">
                <img  className = "starIcon" src = {starIcon}></img>
                <div className = "spacer"></div>
                <button className = "reorder" onClick={handleReorderClick}>Reorder</button>
            </div>

        </div>
    );
}
import './sandwich.scss'
import { React, useState } from 'react';
import ButtonGroup from './IngredientButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { saucePizzaData, cheesePizzaData, toppingsPizzaData, addOnsPizzaData } from './pizzaIngredientsData';

export function Pizza() {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state.fromPage;
    const finalOrder = location.state.finalOrder || null;

    let side;
    let beverage;
    if(finalOrder) {
        side = finalOrder.side;
        beverage = finalOrder.beverage;
    }

    const handleClick = () => {
        if(fromPage === "order") {
            navigate('/sides', {state: { ingredients, side, beverage, fromPage : "pizza", type: "pizza" }});
        }
        else {
            navigate('/sides', {state: { ingredients, side, beverage, fromPage : "confirmOrder", type: "pizza" }});
        }
    };

    const [sauce, setSauce] = useState([]);
    const [cheese, setCheese] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [addOns, setAddOns] = useState([]);

    const handleSauceChange = (selectedButtons) => {
        setSauce(selectedButtons);
    }

    const handleCheeseChange = (selectedButtons) => {
        setCheese(selectedButtons);
    }

    const handleToppingsChange = (selectedButtons) => {
        setToppings(selectedButtons);
    }

    const handleAddOnsChange = (selectedButtons) => {
        setAddOns(selectedButtons);
    }

    const ingredients = {sauce, cheese, toppings, addOns};

    return <div className="sandwichPage">
        <div className = "header">
            <div className = "mainTitle">Rahul, Craft Your Pizza Below!</div>
            <div className = "mainSubtitle">Choose 1 sauce, 1 type of cheese, 1 topping, and upto 3 add-ons.</div>
            <div className = "ingredientType">
                <div className = "ingredientTypeText">Sauce</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.sauce} name = "sauce" data = {saucePizzaData} width = {11} color = "rgb(244, 66, 109)" maximum = {1} onSelectedButtonsChange={handleSauceChange}></ButtonGroup>
                <div className = "ingredientTypeText">Cheese</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.cheese} name = "cheese" data = {cheesePizzaData} width = {11} color = "rgb(255, 165, 0)" maximum = {1} onSelectedButtonsChange={handleCheeseChange}></ButtonGroup>
                <div className = "ingredientTypeText">Toppings</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.toppings} n name = "toppings" data = {toppingsPizzaData} width = {11} color = "rgb(66, 133, 244)" maximum = {1} onSelectedButtonsChange={handleToppingsChange}></ButtonGroup>
                <div className = "ingredientTypeText">Add-Ons</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.addOns} n name = "addOns" data = {addOnsPizzaData} width = {11} color = "rgb(0, 128, 128)" maximum = {3} onSelectedButtonsChange={handleAddOnsChange}></ButtonGroup>
            </div>
            <button className = "mainOrderButton" onClick={handleClick}>Continue</button>
        </div>
    </div>
}
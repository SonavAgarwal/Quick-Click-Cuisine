import './sandwich.scss'
import { React, useState, useEffect } from 'react';
import ButtonGroup from './IngredientButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { breadSandwichData, cheeseSandwichData, toppingsSandwichData, addOnsSandwichData, spreadsCondimentsSandwichData } from './sandwichIngredientsData';
import { NameText } from './NameText';

export function Sandwich() {
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

    const [breadSelected, setBreadSelected] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [continueClicked, setContinueClicked] = useState(false);

    useEffect(()=> {
        if(continueClicked) {
            setErrorVisible(!breadSelected);
        }
    }, [breadSelected, continueClicked]);

    const handleClick = () => {
        if(breadSelected || bread.length !== 0) {
            if(fromPage === "order") {
                navigate('/sides', {state: { ingredients, side, beverage, fromPage : "sandwich", type: "sandwich" }});
            }
            else {
                navigate('/sides', {state: { ingredients, side, beverage, fromPage : "confirmOrder", type: "sandwich" }});
            }
        }
        else {
            setContinueClicked(true);
            setErrorVisible(true);
        }
    };

    const [bread, setBread] = useState([]);
    const [cheese, setCheese] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [spreadsCondiments, setSpreadsCondiments] = useState([]);

    const handleBreadChange = (selectedButtons) => {
        setBread(selectedButtons);
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

    const handleSpreadsCondimentsChange = (selectedButtons) => {
        setSpreadsCondiments(selectedButtons);
    }

    const ingredients = {bread, cheese, toppings, addOns, spreadsCondiments};

    return <div className="sandwichPage">
        <div className = "header">
            <div className = "mainTitle"><NameText/>, Craft Your Sandwich Below!</div>
            <div className = "mainSubtitle">Choose 1 bread, 1 type of cheese, and upto 2 toppings, 3 add-ons, and 2 spreads/condiments.</div>
            <div className = "ingredientType">
                <div className = "ingredientTypeText">Bread</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.bread} name = "bread" data = {breadSandwichData} width = {11} color = "rgb(150, 75, 0)" maximum = {1} setRequiredSelected={setBreadSelected} onSelectedButtonsChange={handleBreadChange}></ButtonGroup>
                {errorVisible && <div className = "errorMessage" color="red">You must choose a type of bread to continue.</div>}
                <div className = "ingredientTypeText">Cheese</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.cheese} name = "cheese" data = {cheeseSandwichData} width = {11} color = "rgb(255, 165, 0)" maximum = {1} onSelectedButtonsChange={handleCheeseChange}></ButtonGroup>
                <div className = "ingredientTypeText">Toppings</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.toppings} name = "toppings" data = {toppingsSandwichData} width = {11} color = "rgb(66, 133, 244)" maximum = {2} onSelectedButtonsChange={handleToppingsChange}></ButtonGroup>
                <div className = "ingredientTypeText">Add-Ons</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.addOns} name = "addOns" data = {addOnsSandwichData} width = {11} color = "rgb(0, 128, 128)" maximum = {3} onSelectedButtonsChange={handleAddOnsChange}></ButtonGroup>
                <div className = "ingredientTypeText">Spreads & Condiments</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.spreadsCondiments} name = "spreadsCondiments" data = {spreadsCondimentsSandwichData} width = {11} color = "rgb(244, 66, 109)" maximum = {2} onSelectedButtonsChange={handleSpreadsCondimentsChange}></ButtonGroup>
            </div>
            <button className = "mainOrderButton" onClick={handleClick}>Continue</button>
        </div>
    </div>
}
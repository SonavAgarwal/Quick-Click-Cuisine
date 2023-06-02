import './sandwich.scss'
import { React, useState, useEffect } from 'react';
import ButtonGroup from './IngredientButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { greensSaladData, proteinsSaladData, toppingsSaladData, dressingsSaladData } from './saladIngredientsData';
import { NameText } from './NameText';

export function Salad() {
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

    const [greenSelected, setGreenSelected] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [continueClicked, setContinueClicked] = useState(false);

    useEffect(()=> {
        if(continueClicked) {
            setErrorVisible(!greenSelected);
        }
    }, [greenSelected, continueClicked]);

    const handleClick = () => {
        if(greenSelected || green.length !== 0) {
            if(fromPage === "order") {
                navigate('/sides', {state: { ingredients, side, beverage, fromPage : "salad", type: "salad" }});
            }
            else {
                navigate('/sides', {state: { ingredients, side, beverage, fromPage : "confirmOrder", type: "salad" }});
            }
        }
        else {
            setContinueClicked(true);
            setErrorVisible(true);
        }
    };

    const [green, setGreen] = useState([]);
    const [protein, setProtein] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [dressing, setDressing] = useState([]);

    const handleGreenChange = (selectedButtons) => {
        setGreen(selectedButtons);
    }

    const handleProteinChange = (selectedButtons) => {
        setProtein(selectedButtons);
    }

    const handleToppingsChange = (selectedButtons) => {
        setToppings(selectedButtons);
    }

    const handleDressingChange = (selectedButtons) => {
        setDressing(selectedButtons);
    }

    const ingredients = {green, protein, toppings, dressing};

    return <div className="sandwichPage">
        <div className = "header">
            <div className = "mainTitle"><NameText/>, Craft Your Salad Below!</div>
            <div className = "mainSubtitle">Choose 1 green, 1 protein, 1 dressing, and upto 4 toppings.</div>
            <div className = "ingredientType">
                <div className = "ingredientTypeText">Greens</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.green} name = "green" data = {greensSaladData} width = {11} color = "rgb(0, 70, 0)" maximum = {1} setRequiredSelected={setGreenSelected} onSelectedButtonsChange={handleGreenChange}></ButtonGroup>
                {errorVisible && <div className = "errorMessage" color="red">You must choose a green to continue.</div>}
                <div className = "ingredientTypeText">Protein</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.protein} name = "protein" data = {proteinsSaladData} width = {11} color = "rgb(255, 165, 0)" maximum = {1} onSelectedButtonsChange={handleProteinChange}></ButtonGroup>
                <div className = "ingredientTypeText">Toppings</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.toppings} name = "toppings" data = {toppingsSaladData} width = {11} color = "rgb(66, 133, 244)" maximum = {4} onSelectedButtonsChange={handleToppingsChange}></ButtonGroup>
                <div className = "ingredientTypeText">Dressing</div>
                <ButtonGroup from = {fromPage} finalOrder = {finalOrder && finalOrder.ingredients.ingredients.dressing} name = "dressing" data = {dressingsSaladData} width = {11} color = "rgb(244, 66, 109)" maximum = {1} onSelectedButtonsChange={handleDressingChange}></ButtonGroup>
            </div>
            <button className = "mainOrderButton" onClick={handleClick}>Continue</button>
        </div>
    </div>
}
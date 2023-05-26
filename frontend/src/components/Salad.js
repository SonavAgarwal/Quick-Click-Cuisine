import './sandwich.scss'
import { React, useState } from 'react';
import ButtonGroup from './IngredientButton';
import { useNavigate } from 'react-router-dom';
import { greensSaladData, proteinsSaladData, toppingsSaladData, dressingsSaladData } from './saladIngredientsData';

export function Salad() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/sides', {state: { ingredients, fromPage : "salad" }});
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
            <div className = "mainTitle">Rahul, Craft Your Salad Below!</div>
            <div className = "mainSubtitle">Choose 1 green, 1 protein, 1 dressing, and upto 4 toppings.</div>
            <div className = "ingredientType">
                <div className = "ingredientTypeText">Greens</div>
                <ButtonGroup name = "green" data = {greensSaladData} width = {11} color = "rgb(0, 70, 0)" maximum = {1} onSelectedButtonsChange={handleGreenChange}></ButtonGroup>
                <div className = "ingredientTypeText">Protein</div>
                <ButtonGroup name = "protein" data = {proteinsSaladData} width = {11} color = "rgb(255, 165, 0)" maximum = {1} onSelectedButtonsChange={handleProteinChange}></ButtonGroup>
                <div className = "ingredientTypeText">Toppings</div>
                <ButtonGroup name = "toppings" data = {toppingsSaladData} width = {11} color = "rgb(66, 133, 244)" maximum = {4} onSelectedButtonsChange={handleToppingsChange}></ButtonGroup>
                <div className = "ingredientTypeText">Dressing</div>
                <ButtonGroup name = "dressing" data = {dressingsSaladData} width = {14} color = "rgb(244, 66, 109)" maximum = {1} onSelectedButtonsChange={handleDressingChange}></ButtonGroup>
            </div>
            <button className = "mainOrderButton" onClick={handleClick}>Continue</button>
        </div>
    </div>
}
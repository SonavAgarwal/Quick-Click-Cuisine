import './sandwich.scss'
import { React, useState } from 'react';
import ButtonGroup from './IngredientButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { sidesData, beverageData } from './ingredientsData';

export function Sides() {
    const location = useLocation();
    const ingredients = location.state || [];

    const navigate = useNavigate();
    const handleClick = () => {
        //window.location.href = '/confirmOrder';
        navigate('/confirmOrder', {state: finalOrder});
    };

    const [side, setSide] = useState([]);
    const [beverage, setBeverage] = useState([]);

    const handleSideChange = (selectedButtons) => {
        setSide(selectedButtons);
    }

    const handleBeverageChange = (selectedButtons) => {
        setBeverage(selectedButtons);
    }

    const finalOrder = {ingredients, side, beverage};
    //console.log(finalOrder);

    return <div className="sandwichPage">
        <div className = "header">
            <div className = "mainTitle">Rahul, Choose Your Sides & Beverages!</div>
            <div className = "mainSubtitle">Choose upto 1 side & 1 beverage.</div>
            <div className = "ingredientType">
                <div className = "ingredientTypeText">Sides</div>
                <ButtonGroup data = {sidesData} width = {11.8} color = "rgb(115, 79, 150)" maximum = {1} onSelectedButtonsChange={handleSideChange}></ButtonGroup>
                <div className = "ingredientTypeText">Beverages</div>
                <ButtonGroup data = {beverageData} width = {11.8} color = "rgb(0, 128, 128)" maximum = {1} onSelectedButtonsChange={handleBeverageChange}></ButtonGroup>
            </div>
            <button className = "mainOrderButton" onClick={handleClick}>Continue</button>
        </div>
    </div>
}
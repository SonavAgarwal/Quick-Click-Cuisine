import './sandwich.scss'
import { React, useState } from 'react';
import ButtonGroup from './IngredientButton';
import { useNavigate } from 'react-router-dom';
import { sauceData, cheeseData, toppingsData, addOnsData } from './pizzaIngredientsData';

export function Pizza() {
    const navigate = useNavigate();

    // const [breadSelected, setBreadSelected] = useState(false);
    // const [errorVisible, setErrorVisible] = useState(false);
    // const [continueClicked, setContinueClicked] = useState(false);

    // useEffect(()=> {
    //     if(continueClicked) {
    //         setErrorVisible(!breadSelected);
    //     }
    // }, [breadSelected, continueClicked]);


    const handleClick = () => {
        // if(breadSelected) {
            navigate('/sides', {state: ingredients });
        // }
        // else {
        //     setContinueClicked(true);
        //     setErrorVisible(true);
        // }
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
                <div className = "ingredientTypeText">Bread</div>
                <ButtonGroup name = "sauce" data = {sauceData} width = {12} color = "rgb(244, 66, 109)" maximum = {1} onSelectedButtonsChange={handleSauceChange}></ButtonGroup>
                {/* {errorVisible && <div className = "errorMessage" color="red">You must choose a type of bread to continue.</div>} */}
                <div className = "ingredientTypeText">Cheese</div>
                <ButtonGroup name = "cheese" data = {cheeseData} width = {8.5} color = "rgb(255, 179, 2)" maximum = {1} onSelectedButtonsChange={handleCheeseChange}></ButtonGroup>
                <div className = "ingredientTypeText">Toppings</div>
                <ButtonGroup name = "toppings" data = {toppingsData} width = {8.5} color = "rgb(66, 133, 244)" maximum = {1} onSelectedButtonsChange={handleToppingsChange}></ButtonGroup>
                <div className = "ingredientTypeText">Add-Ons</div>
                <ButtonGroup name = "addOns" data = {addOnsData} width = {8.5} color = "rgb(0, 128, 128)" maximum = {3} onSelectedButtonsChange={handleAddOnsChange}></ButtonGroup>
            </div>
            <button className = "mainOrderButton" onClick={handleClick}>Continue</button>
        </div>
    </div>
}
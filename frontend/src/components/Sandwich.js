import './sandwich.scss'
import React from 'react';
import ButtonGroup from './IngredientButton';

export function Sandwich() {
    const breadData = [
        { name: 'Sourdough', id: 1 },
        { name: 'Whole Wheat', id: 2 },
        { name: 'Hoagie Roll', id: 3 },
    ];

    const cheeseData = [
        { name: 'Cheddar', id: 1 },
        { name: 'Mozzarella', id: 2 },
        { name: 'Provolone', id: 3 },
        { name: 'Vegan Cheddar', id: 4},
    ];

    const toppingsData = [
        { name: 'Avocado', id: 1 },
        { name: 'Bacon', id: 2 },
        { name: 'Black Forest Ham', id: 3 },
        { name: 'Egg Salad', id: 4},
        { name: 'Grilled Chicken', id: 5},
        { name: 'Pepperoni', id: 6},
        { name: 'Prosciutto', id: 7},
        { name: 'Roast Beef', id: 8},
        { name: 'Turkey', id: 9},
    ];

    const addOnsData = [
        { name: 'Spinach', id: 1 },
        { name: 'Cucumber', id: 2 },
        { name: 'Bell Peppers', id: 3 },
        { name: 'Black Olives', id: 4},
        { name: 'Pepperoncini', id: 5},
        { name: 'Pickles', id: 6},
        { name: 'Red Onion', id: 7},
        { name: 'Lettuce', id: 8},
        { name: 'Tomatoes', id: 9},
        { name: 'Jalapeños', id: 10},
    ];

    const spreadsCondimentsData = [
        { name: 'Balsamic Vinaigrette', id: 1 },
        { name: 'Deli Mustard', id: 2 },
        { name: 'Mayonnaise', id: 3 },
        { name: 'Olive Oil', id: 4},
        { name: 'Pesto Sauce', id: 5},
        { name: 'Red Wine Vinegar', id: 6},
        { name: 'Sundried Tomato Pesto', id: 7},
    ];

    return <div className="sandwichPage">
        <div className = "header">
            <div className = "mainTitle">Rahul, Craft Your Sandwich Below!</div>
            <div className = "mainSubtitle">Choose 1 bread, 1 type of cheese, and upto 3 toppings, 3 add-ons, and 2 spreads/condiments.</div>
            <div className = "ingredientType">
                <div className = "ingredientTypeText">Bread</div>
                <ButtonGroup data = {breadData} width = {8.5} color = "rgb(150, 75, 0)" maximum = {1}></ButtonGroup>
                <div className = "ingredientTypeText">Cheese</div>
                <ButtonGroup data = {cheeseData} width = {8.5} color = "rgb(251, 188, 5)" maximum = {1}></ButtonGroup>
                <div className = "ingredientTypeText">Toppings</div>
                <ButtonGroup data = {toppingsData} width = {8.5} color = "rgb(66, 133, 244)" maximum = {2}></ButtonGroup>
                <div className = "ingredientTypeText">Add-Ons</div>
                <ButtonGroup data = {addOnsData} width = {7.43} color = "rgb(0, 128, 128)" maximum = {3}></ButtonGroup>
                <div className = "ingredientTypeText">Spreads & Condiments</div>
                <ButtonGroup data = {spreadsCondimentsData} width = {11} color = "rgb(244, 66, 109)" maximum = {2}></ButtonGroup>
            </div>
            <button className = "mainOrderButton">Continue</button>
        </div>
    </div>
}
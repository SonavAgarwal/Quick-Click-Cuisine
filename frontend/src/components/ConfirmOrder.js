import './sandwich.scss'
import { React } from 'react';
import { useLocation } from 'react-router-dom';
import { breadData, cheeseData, toppingsData, addOnsData, spreadsCondimentsData, sidesData, beverageData } from './sandwichIngredientsData';

export function ConfirmOrder() {
    const location = useLocation();
    const finalOrder = location.state || [];

    const breadId = finalOrder.ingredients.bread[0];
    const breadItem = breadData.find(item => item.id === breadId);
    const breadName = breadItem ? breadItem.name : 'None';

    const cheeseId = finalOrder.ingredients.cheese[0];
    const cheeseItem = cheeseData.find(item => item.id === cheeseId);
    const cheeseName = cheeseItem ? cheeseItem.name : 'No';

    const toppingId = finalOrder.ingredients.toppings;
    const toppingItems = toppingId.flatMap(id => toppingsData.find(item => item.id === id));
    const toppingNames = (toppingItems.length !== 0) ? toppingItems.map(item => item.name) : ["No Toppings"];

    const addOnsId = finalOrder.ingredients.addOns;
    const addOnsItems = addOnsId.flatMap(id => addOnsData.find(item => item.id === id));
    const addOnsNames = (addOnsItems.length !== 0) ? addOnsItems.map(item => item.name) : ["No Add Ons"];

    const spreadsCondimentsId = finalOrder.ingredients.spreadsCondiments;
    const spreadsCondimentsItems = spreadsCondimentsId.flatMap(id => spreadsCondimentsData.find(item => item.id === id));
    const spreadsCondimentsNames = (spreadsCondimentsItems.length !== 0) ? spreadsCondimentsItems.map(item => item.name) : ["No Spreads or Condiments"];

    const sideId = finalOrder.side[0];
    const sideItem = sidesData.find(item => item.id === sideId);
    const sideName = sideItem ? sideItem.name : 'No Side';

    const beverageId = finalOrder.beverage[0];
    const beverageItem = beverageData.find(item => item.id === beverageId);
    const beverageName = beverageItem ? beverageItem.name : 'No Beverage';

    const handleEditOrder = () => {
        window.location.href = '/sandwich';
    };

    const handlePlaceOrder = () => {
        window.location.href = '/';
    };

    return <div className="sandwichPage">
        <div className = "header">
            <div className = "mainTitle">Rahul, Confirm Your Order!</div>
            <div className = "mainSubtitle">Make sure that your order is correct.</div>
            <div className = "ingredientType">
                <div className = "finalOrderText">{breadName} Bread</div>
                <div className = "finalOrderText">{cheeseName} Cheese</div>
                {toppingNames.map((name, index) => (
                    <div key={index} className = "finalOrderText">{name}</div>
                ))}
                {addOnsNames.map((name, index) => (
                    <div key={index} className = "finalOrderText">{name}</div>
                ))}
                {spreadsCondimentsNames.map((name, index) => (
                    <div key={index} className = "finalOrderText">{name}</div>
                ))}
                <div className = "finalOrderText">{sideName}</div>
                <div className = "finalOrderText">{beverageName}</div>
            </div>
            <button className = "mainOrderButton" onClick={handleEditOrder}>Edit Order</button>
            <button className = "mainOrderButton" onClick={handlePlaceOrder}>Place Order</button>
        </div>
    </div>
}
import React from "react";
import {OrderCard} from "./OrderCard";
import "./Order.scss";

export const Order = () => {

    return (
        <div className = "orderContent">
            <div className = "orderTitle">Order</div>
            <OrderCard type="Sandwich" desc="Bread, cheese, toppings, add-ons, spread, side, and beverage."/>
            <OrderCard type = "Pizza" desc = "Sauce, cheese, toppings, add-ons, side, and beverage."/>
            <OrderCard type = "Salad" desc = "Greens, protein, toppings, dressing, side, and beverage."/>
        </div>
    );

}
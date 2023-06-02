import React from "react";
import {OrderCard} from "./OrderCard";
import "./Order.scss";

export const Order = () => {

    return (
        <div className = "orderContent">
            <div className = "orderTitle">Order</div>
            <OrderCard type="Sandwich" desc="filler la dee da dee da"/>
            <OrderCard type = "Pizza" desc = "filler la dee da dee da"/>
            <OrderCard type = "Salad" desc = "filler la dee da dee da"/>
        </div>
    );

}
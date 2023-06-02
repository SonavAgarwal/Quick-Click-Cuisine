import React from "react";
import {OrderCard} from "./OrderCard";
import "./Order.scss";

export const Order = () => {

    return (
        <div className = "orderContent">
            <div className = "orderTitle">Order</div>
            <OrderCard type="sandwich" desc="filler la dee da dee da"/>
            <OrderCard type = "pizza" desc = "filler la dee da dee da"/>
            <OrderCard type = "salad" desc = "filler la dee da dee da"/>
        </div>
    );

}
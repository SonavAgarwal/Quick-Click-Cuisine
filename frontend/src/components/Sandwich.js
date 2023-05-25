import './landing.scss'
import React from 'react';
import { InstantOrderCard } from './InstantOrderCard';

export function Sandwich(){
    return <div className="landingPage">
        <div className = "header">
            <div className="mainTitle">Welcome, Rahul</div>
            <div className ="mainSubtitle">The estimated wait time at the Study is <span id = "subtitleBold">69 minutes.</span></div>
            <button className = "mainOrderButton">Order</button>
        </div>
    </div>
}
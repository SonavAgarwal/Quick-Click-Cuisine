import './landing.scss'
import React from 'react';
import { InstantOrderCard } from './InstantOrderCard';

export function Landing(){
    return <div className="landingPage">
        <div className = "header">
            <div className="mainTitle">Welcome, Rahul</div>
            <div className ="mainSubtitle">The estimated wait time at the Study is <span id = "subtitleBold">69 minutes.</span></div>
            <button className = "mainOrderButton">Order</button>
        </div>
        <div className="instantOrder">
            <div className = "sectionTitle">Instant Order</div>
            <InstantOrderCard type="salad" name = "Ishan Garg 😩"/>
            <InstantOrderCard type ="pizza" name = "Rahul's Dumpy 🍑"/>
            <InstantOrderCard type = "sandwich" name = "Sonav 😋" />
            <InstantOrderCard type = "salad" name = "Willie 🥵" />
        </div>

    </div>
}
import './landing.scss'
import React from 'react';
import { InstantOrderCard } from './InstantOrderCard';
import { useNavigate } from 'react-router-dom';

export function Landing(){
    const navigate = useNavigate();

    const handleClick = () => {
        //navigate('/sandwich');
        window.location.href = '/sandwich';
    };

    return <div className="landingPage">
        <div className = "header">
            <div className="mainTitle">Welcome, Rahul</div>
            <div className ="mainSubtitle">The estimated wait time at the Study is <span id = "subtitleBold">69 minutes.</span></div>
            <button className = "mainOrderButton">Order</button>
            <button className = "mainOrderButton" onClick = {handleClick}>Sandwich Test</button>
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
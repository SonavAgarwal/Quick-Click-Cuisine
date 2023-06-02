import './landing.scss'
import React from 'react';
import { InstantOrderCard } from './InstantOrderCard';
import { PendingOrderCard } from './PendingOrderCard';
import { HistoryCard } from './HistoryCard';

export function Landing(){

    return <div className="landingPage">
        <div className = "header">
            <div className="mainTitle">Welcome, Rahul</div>
            <div className ="mainSubtitle">The estimated wait time at the Study is <span id = "subtitleBold">69 minutes.</span></div>
            <button className = "mainOrderButton" onClick = {() => window.location.href = '/order'}>Order</button>
        </div>
        <div className="instantOrder">
            <div className = "sectionTitle">Instant Order</div>
            <InstantOrderCard type="salad" name = "Ishan Garg 😩"/>
            <InstantOrderCard type ="pizza" name = "Rahul's Dumpy 🍑"/>
            <InstantOrderCard type = "sandwich" name = "Sonav 😋" />
            <InstantOrderCard type = "salad" name = "Willie 🥵" />
        </div>
        <div className = "pendingOrders">
            <div className = "sectionTitle">Pending Orders</div>
            <PendingOrderCard type = "Sandwich" desc = "Sandwich with bro idk someone help me please oh dear lord" />
            <PendingOrderCard type = "Pizza" desc = "a pizza bro i really don't know how much longer i can take this at this point"/>
            <PendingOrderCard type = "Salad" desc = "a salad bro i really don't know how much longer i can take this at this point" />
        </div>
        <div className = "orderHistory">
            <div className = "sectionTitle">Order History</div>
            <HistoryCard type = "Sandwich" desc = "great sandwich that was eaten like many days ago" date = "4/20/23"/>
        </div>

    </div>
}
<<<<<<< HEAD
import './landing.scss'
import React from 'react';
import { InstantOrderCard } from './InstantOrderCard';
import { PendingOrderCard } from './PendingOrderCard';
=======
import "./landing.scss";
import React from "react";
import { InstantOrderCard } from "./InstantOrderCard";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
>>>>>>> fccf958d6a2c90f4aea79f12901fb2ba83565166

export function Landing() {
	const handleClickSandwich = () => {
		window.location.href = "/sandwich";
	};

	const handleClickPizza = () => {
		window.location.href = "/pizza";
	};

	const handleClickSalad = () => {
		window.location.href = "/salad";
	};

	return (
		<div className="landingPage">
			<div className="header">
				<div className="mainTitle">Welcome, Rahul</div>
				<div className="mainSubtitle">
					The estimated wait time at the Study is{" "}
					<span id="subtitleBold">69 minutes.</span>
				</div>
				<button className="mainOrderButton">Order</button>
				<button className="mainOrderButton" onClick={handleClickSandwich}>
					Sandwich Test
				</button>
				<button className="mainOrderButton" onClick={handleClickPizza}>
					Pizza Test
				</button>
				<button className="mainOrderButton" onClick={handleClickSalad}>
					Salad Test
				</button>
			</div>
			<div className="instantOrder">
				<div className="sectionTitle">Instant Order</div>
				<InstantOrderCard type="salad" name="Ishan Garg 😩" />
				<InstantOrderCard type="pizza" name="Rahul's Dumpy 🍑" />
				<InstantOrderCard type="sandwich" name="Sonav 😋" />
				<InstantOrderCard type="salad" name="Willie 🥵" />
			</div>

    return <div className="landingPage">
        <div className = "header">
            <div className="mainTitle">Welcome, Rahul</div>
            <div className ="mainSubtitle">The estimated wait time at the Study is <span id = "subtitleBold">69 minutes.</span></div>
            <button className = "mainOrderButton">Order</button>
            <button className = "mainOrderButton" onClick = {handleClickSandwich}>Sandwich Test</button>
            <button className = "mainOrderButton" onClick = {handleClickPizza}>Pizza Test</button>
            <button className = "mainOrderButton" onClick = {handleClickSalad}>Salad Test</button>
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

    </div>
}
			<button
				className="logOutButton"
				onClick={function () {
					signOut(auth);
				}}
			>
				Log Out
			</button>
		</div>
	);
}

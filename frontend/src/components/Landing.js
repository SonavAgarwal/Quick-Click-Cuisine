import "./landing.scss";
import React, { useEffect, useState } from "react";
import { InstantOrderCard } from "./InstantOrderCard";
import { PendingOrderCard } from "./PendingOrderCard";
import { HistoryCard } from "./HistoryCard";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { NameText } from "./NameText";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export function Landing() {
	const [estimatedTime, setEstimatedTime] = useState("Loading");
	const [pendingOrders, setPendingOrders] = useState([]);
	const [orderHistory, setOrderHistory] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [user] = useAuthState(auth);

	function fetchPendingOrders() {
		const user_id = user?.uid;
		fetch("http://127.0.0.1:5000/orders/user/" + user_id)
			.then((res) => res.json())
			.then((data) => {
				setPendingOrders(data);
			});
	}

	function fetchOrderHistory() {
		const user_id = user?.uid;
		fetch("http://127.0.0.1:5000/orders/past/user/" + user_id)
			.then((res) => res.json())
			.then((data) => {
				setOrderHistory(data);
			});
	}

	function fetchFavorites() {
		const user_id = user?.uid;
		fetch("http://127.0.0.1:5000/user/" + user_id + "/favorites")
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setFavorites(data);
				} else {
					setFavorites([]);
				}
			});
	}

	function fetchWaitTime() {
		fetch("http://127.0.0.1:5000/waitTime")
			.then((res) => res.json())
			.then((data) => {
				setEstimatedTime(data?.wait_time);
			});
	}

	useEffect(() => {
		if (!user) return;

		fetchPendingOrders();
		fetchWaitTime();

		let intervalID = setInterval(() => {
			fetchPendingOrders();
			fetchOrderHistory();
			fetchFavorites();
			fetchWaitTime();
		}, 1000);

		return () => clearInterval(intervalID);
	}, [user]);

	return (
		<div className="landingPage">
			<div className="header">
				<div className="headerLeft">
					<div className="mainTitle">
						Welcome, <NameText />
					</div>
					<div className="mainSubtitle">
						The estimated wait time at the Study is{" "}
						<span id="subtitleBold">{estimatedTime} minutes.</span>
					</div>
				</div>
				<button
					className="mainOrderButton signOutButton"
					onClick={() => signOut(auth)}
				>
					Sign out
				</button>
				<button
					className="mainOrderButton"
					onClick={() => (window.location.href = "/order")}
				>
					Order
				</button>
			</div>
			<div className="landingContent">
				<div className="instantOrder">
					<div className="sectionTitle">Instant Order</div>
					{favorites?.map((favorite, index) => {
						const oid = favorite.order_id;
						const nickname = favorite.order_nickname;
						return (
							<div>
								<InstantOrderCard oid={oid} nickname={nickname} />
							</div>
						);
					})}
				</div>
				<div className="pendingOrders">
					<div className="sectionTitle">Pending Orders</div>
					{pendingOrders?.map((order, index) => {
						const parsed = JSON.parse(order);
						const type = parsed.type;
						const ingredients = parsed.ingredients;
						const status = parsed.status;
						const typeUpper = type.charAt(0).toUpperCase() + type.slice(1);
						if (status !== 3) {
							return (
								<div>
									<PendingOrderCard
										type={typeUpper}
										ingredients={ingredients}
										status={status}
									/>
								</div>
							);
						}
					})}
				</div>
				<div className="orderHistory">
					<div className="sectionTitle">Order History</div>
					{orderHistory.slice(-3)?.map((order, index) => {
						const parsed = JSON.parse(order);
						const type = parsed.type;
						const ingredients = parsed.ingredients;
						const beverage = parsed.beverage;
						const side = parsed.side;
						const oid = parsed.order_id;
						const typeUpper = type.charAt(0).toUpperCase() + type.slice(1);
						if (index < 4) {
							return (
								<div>
									<HistoryCard
										type={typeUpper}
										ingredients={ingredients}
										beverage={beverage}
										side={side}
										oid={oid}
									/>
								</div>
							);
						}
					})}
					{orderHistory.length !== 0 && (
						<div
							className="historyLink"
							onClick={() => {
								window.location.href = "/orderHistory";
							}}
						>
							View Full History
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

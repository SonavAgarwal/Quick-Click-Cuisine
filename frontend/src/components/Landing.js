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

export function Landing() {
	const [estimatedTime, setEstimatedTime] = useState("Loading");
	const [pendingOrders, setPendingOrders] = useState([]);
	const [user] = useAuthState(auth);

	useEffect(() => {
		if (!user) return;
		const user_id = user?.uid;
		fetch("http://127.0.0.1:5000/orders/inprogress")
			.then((res) => res.json())
			.then((data) => {
				setEstimatedTime(data?.length * 5);
			});
		fetch("http://127.0.0.1:5000/orders/user/" + user_id)
			.then((res) => res.json())
			.then((data) => {
				setPendingOrders(data);
			});
	}, [user]);

	return (
		<div className="landingPage">
			<div className="header">
				<div className="mainTitle">
					Welcome, <NameText />
				</div>
				<div className="mainSubtitle">
					The estimated wait time at the Study is{" "}
					<span id="subtitleBold">{estimatedTime} minutes.</span>
				</div>
				<button
					className="mainOrderButton"
					onClick={() => (window.location.href = "/order")}
				>
					Order
				</button>
				<button className="mainOrderButton" onClick={() => signOut(auth)}>
					Sign out button (Temporary)
				</button>

				<button
					className="mainOrderButton"
					onClick={async () => {
						// 854a22ca-ba72-4f0a-839f-23a9dc985150

						const data = {
							order_id: "7002ad47-f100-4b1d-a3ad-64be96bf63da",
						};

						const response = await axios.post(
							"http://127.0.0.1:5000/order/bumpStatus",
							data
						);

						if (response.status === 200) {
							console.log("Order changed successfully!");
							console.log(response.data);
						} else {
							console.log("Error changing order!");
							console.log(response.data);
						}
					}}
				>
					bump order
				</button>
			</div>
			<div className="landingContent">
				<div className="instantOrder">
					<div className="sectionTitle">Instant Order</div>
					<InstantOrderCard type="salad" name="Ishan Garg 😩" />
					<InstantOrderCard type="pizza" name="Rahul's Dumpy 🍑" />
					<InstantOrderCard type="sandwich" name="Sonav 😋" />
					<InstantOrderCard type="salad" name="Willie 🥵" />
				</div>
				<div className="pendingOrders">
					<div className="sectionTitle">Pending Orders</div>
					{pendingOrders?.map((order, index) => {
						const parsed = JSON.parse(order);
						const type = parsed.type;
						const ingredients = parsed.ingredients;
						const status = parsed.status;
						console.log(status);
						const typeUpper = type.charAt(0).toUpperCase() + type.slice(1);
						// console.log(type);
						return (
							<div>
								<PendingOrderCard type={typeUpper} ingredients={ingredients} status = {status}/>
							</div>
						);
					})}
					{/* <PendingOrderCard
						type="Sandwich"
						desc="Sandwich with bro idk someone help me please oh dear lord"
					/>
					<PendingOrderCard
						type="Pizza"
						desc="a pizza bro i really don't know how much longer i can take this at this point"
					/>
					<PendingOrderCard
						type="Salad"
						desc="a salad bro i really don't know how much longer i can take this at this point"
					/> */}
				</div>
				<div className="orderHistory">
					<div className="sectionTitle">Order History</div>
					<HistoryCard
						type="Sandwich"
						desc="great sandwich that was eaten like many days ago"
						date="4/20/23"
					/>
				</div>
			</div>
		</div>
	);
}

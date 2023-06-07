import React, { useEffect, useState } from "react";

import styles from "./Leaderboard.module.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Leaderboard = () => {
	const [selectedOption, setSelectedOption] = useState("pizzas");

	const [user] = useAuthState(auth);

	useEffect(() => {
		// /user/<user_id>/type_count
		if (!user) return;

		fetch("http://127.0.0.1:5000/user/" + user.uid + "/type_count")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	}, [user]);

	return (
		<div className={styles.page}>
			<h1>Leaderboard</h1>
			<div className={styles.options}>
				<button
					style={{
						textDecoration: selectedOption === "pizzas" ? "underline" : "none",
					}}
					onClick={() => {
						setSelectedOption("pizzas");
					}}
				>
					Pizzas
				</button>
				<button
					style={{
						textDecoration:
							selectedOption === "sandwiches" ? "underline" : "none",
					}}
					onClick={() => {
						setSelectedOption("sandwiches");
					}}
				>
					Sandwiches
				</button>
				<button
					style={{
						textDecoration: selectedOption === "salads" ? "underline" : "none",
					}}
					onClick={() => {
						setSelectedOption("salads");
					}}
				>
					Salads
				</button>
			</div>
			<div className={styles.entries}>
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
				<LeaderboardEntry />
			</div>
		</div>
	);
};

const LeaderboardEntry = () => {
	return (
		<div className={styles.entry}>
			<h1>1st</h1>
			<h1>Rahul Ravi</h1>
			<h1>35</h1>
		</div>
	);
};

export default Leaderboard;

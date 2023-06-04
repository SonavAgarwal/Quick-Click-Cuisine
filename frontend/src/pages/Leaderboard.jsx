import React, { useState } from "react";

import styles from "./Leaderboard.module.css";

const Leaderboard = () => {
	const [selectedOption, setSelectedOption] = useState("pizzas");

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

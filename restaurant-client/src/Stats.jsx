import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const defaultDogData = {
	labels: ["Salads", "Pizzas", "Sandwiches"],
	datasets: [
		{
			label: "Data",
			data: [1, 1, 1],
			backgroundColor: [
				"rgb(255, 99, 132)",
				"rgb(54, 162, 235)",
				"rgb(255, 205, 86)",
			],
			hoverOffset: 4,
		},
	],
};

export const Stats = () => {
	// fetch this http://127.0.0.1:5000/orders/type_count

	const [donutData, setDonutData] = useState(defaultDogData);

	useEffect(() => {
		console.log("fetching stats");
		fetch("http://127.0.0.1:5000/orders/type_count")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				const dogData = {
					labels: ["Salads", "Pizzas", "Sandwiches"],
					datasets: [
						{
							label: "Number of Orders",
							data: [
								data?.Salad + data?.salad,
								data?.Pizza + data?.pizza,
								data?.sandwich + data?.Sandwich,
							],
							backgroundColor: [
								"rgb(255, 99, 132)",
								"rgb(54, 162, 235)",
								"rgb(255, 205, 86)",
							],
							hoverOffset: 4,
						},
					],
				};

				setDonutData(dogData);
				console.log("dogData");
				console.log(dogData);
			});
	}, []);

	const chartOptions = {
		responsive: true,
	};	

	return (
		<div className="stats-page">
			<h1>STATISTICS!!!</h1>
			<div style={{ maxWidth: "700px", margin: "0 auto" }}>
				<Doughnut data={donutData} options={chartOptions} />
			</div>
		</div>
	);
};

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
	const [donutData, setDonutData] = useState(defaultDogData);

	function fetchData() {
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
			});
	}

	useEffect(() => {
		console.log("fetching stats");
		fetchData();
	}, []);

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				labels: {
					font: {
						family: "Arial, Helvetica, sans-serif",
						size: 14,
					},
				},
			},
			tooltip: {
				bodyFont: {
					family: "Arial, Helvetica, sans-serif",
					size: 14,
				},
			},
		},
	};

	return (
		<div className="stats-page">
			<h1 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "28px" }}>Statistics!</h1>
			<div style={{ maxWidth: "700px", margin: "0 auto" }}>
				<Doughnut data={donutData} options={chartOptions} />
			</div>
		</div>
	);
};

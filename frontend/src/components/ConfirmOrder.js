import "./sandwich.scss";
import { React } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	breadSandwichData,
	cheeseSandwichData,
	toppingsSandwichData,
	addOnsSandwichData,
	spreadsCondimentsSandwichData,
	sidesData,
	beverageData,
} from "./sandwichIngredientsData";
import {
	saucePizzaData,
	cheesePizzaData,
	toppingsPizzaData,
	addOnsPizzaData,
} from "./pizzaIngredientsData";
import {
	greensSaladData,
	proteinsSaladData,
	toppingsSaladData,
	dressingsSaladData,
} from "./saladIngredientsData";
import { NameText } from "./NameText";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export function ConfirmOrder() {
	const location = useLocation();
	const fromPage = location.state.fromPage;
	const type = location.state.type;
	const finalOrder = location.state.finalOrder || [];
	console.log(finalOrder);

	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	let firstId, firstData, firstOptionalText;
	let secondId, secondData, secondOptionalText;
	let thirdId, thirdData, thirdOptionalText;
	let fourthId, fourthData, fourthOptionalText;
	let fifthId, fifthItem, fifthName, fifthOptionalText;

	if (
		type === "sandwich" ||
		(type === "sandwich" && fromPage === "confirmOrder")
	) {
		firstId = finalOrder.ingredients.ingredients.bread;
		firstData = breadSandwichData;
		firstOptionalText = "No Bread";

		secondId = finalOrder.ingredients.ingredients.cheese;
		secondData = cheeseSandwichData;
		secondOptionalText = "No Cheese";

		thirdId = finalOrder.ingredients.ingredients.toppings;
		thirdData = toppingsSandwichData;
		thirdOptionalText = "No Toppings";

		fourthId = finalOrder.ingredients.ingredients.addOns;
		fourthData = addOnsSandwichData;
		fourthOptionalText = "No Add Ons";

		fifthId = finalOrder.ingredients.ingredients.spreadsCondiments;
		fifthItem = fifthId.flatMap((id) =>
			spreadsCondimentsSandwichData.find((item) => item.id === id)
		);
		fifthOptionalText = "No Spreads or Condiments";
		fifthName =
			fifthItem.length !== 0
				? fifthItem.map((item) => item.name)
				: [fifthOptionalText];
	} else if (
		type === "pizza" ||
		(type === "pizza" && fromPage === "confirmOrder")
	) {
		firstId = finalOrder.ingredients.ingredients.sauce;
		firstData = saucePizzaData;
		firstOptionalText = "No Sauce";

		secondId = finalOrder.ingredients.ingredients.cheese;
		secondData = cheesePizzaData;
		secondOptionalText = "No Cheese";

		thirdId = finalOrder.ingredients.ingredients.toppings;
		thirdData = toppingsPizzaData;
		thirdOptionalText = "No Toppings";

		fourthId = finalOrder.ingredients.ingredients.addOns;
		fourthData = addOnsPizzaData;
		fourthOptionalText = "No Add Ons";
	} else if (
		type === "salad" ||
		(type === "salad" && fromPage === "confirmOrder")
	) {
		firstId = finalOrder.ingredients.ingredients.green;
		firstData = greensSaladData;
		firstOptionalText = "No Greens";

		secondId = finalOrder.ingredients.ingredients.protein;
		secondData = proteinsSaladData;
		secondOptionalText = "No Protein";

		thirdId = finalOrder.ingredients.ingredients.toppings;
		thirdData = toppingsSaladData;
		thirdOptionalText = "No Toppings";

		fourthId = finalOrder.ingredients.ingredients.dressing;
		fourthData = dressingsSaladData;
		thirdOptionalText = "No Dressing";
	}

	const firstItem = firstId.flatMap((id) =>
		firstData.find((item) => item.id === id)
	);
	const firstName =
		firstItem.length !== 0
			? firstItem.map((item) => item.name)
			: [firstOptionalText];

	const secondItem = secondId.flatMap((id) =>
		secondData.find((item) => item.id === id)
	);
	const secondName =
		secondItem.length !== 0
			? secondItem.map((item) => item.name)
			: [secondOptionalText];

	const thirdItem = thirdId.flatMap((id) =>
		thirdData.find((item) => item.id === id)
	);
	const thirdName =
		thirdItem.length !== 0
			? thirdItem.map((item) => item.name)
			: [thirdOptionalText];

	const fourthItem = fourthId.flatMap((id) =>
		fourthData.find((item) => item.id === id)
	);
	const fourthName =
		fourthItem.length !== 0
			? fourthItem.map((item) => item.name)
			: [fourthOptionalText];

	const sideId = finalOrder.side[0];
	const sideItem = sidesData.find((item) => item.id === sideId);
	const sideName = sideItem ? sideItem.name : "No Side";

	const beverageId = finalOrder.beverage[0];
	const beverageItem = beverageData.find((item) => item.id === beverageId);
	const beverageName = beverageItem ? beverageItem.name : "No Beverage";

	const handleEditOrder = () => {
		const destination = "/" + type;
		navigate(destination, { state: { finalOrder, fromPage: "confirmOrder" } });
	};

	async function sendPostRequest() {
		if (!user) {
			alert("Please log in to place an order!");
			return;
		}

		let ingredients = [];
		ingredients = ingredients.concat(
			firstName,
			secondName,
			thirdName,
			fourthName
		);
		if(fifthName !== null) {
			ingredients = ingredients.concat(fifthName);
		}
		const data = {
			user_id: user?.uid,
			ingredients: ingredients,
			type: type,
			side: sideName,
			beverage: beverageName,
			user_name: user?.displayName,
		};

		const response = await axios.post("http://127.0.0.1:5000/order", data);

		if (response.status === 201) {
			console.log("Order placed successfully!");
			console.log(response.data);
			navigate("/");
		} else {
			console.log("Error placing order!");
			console.log(response.data);
			alert("Error placing order!");
		}
	}

	const handlePlaceOrder = () => {
		sendPostRequest();
	};

	return (
		<div className="sandwichPage">
			<div className="header">
				<div className="mainTitle">
					<NameText />, Confirm Your Order!
				</div>
				<div className="mainSubtitle">
					Make sure that your order is correct.
				</div>
				<div className="ingredientType">
					{/* <div className = "finalOrderText">{firstName} {firstOptionalText}</div> */}
					{firstName.map((name, index) => (
						<div key={index} className="finalOrderText">
							{name}
						</div>
					))}
					{secondName.map((name, index) => (
						<div key={index} className="finalOrderText">
							{name}
						</div>
					))}
					{thirdName.map((name, index) => (
						<div key={index} className="finalOrderText">
							{name}
						</div>
					))}
					{fourthName.map((name, index) => (
						<div key={index} className="finalOrderText">
							{name}
						</div>
					))}
					{(type === "sandwich" ||
						(type === "sandwich" && fromPage === "confirmOrder")) &&
						fifthName.map((name, index) => (
							<div key={index} className="finalOrderText">
								{name}
							</div>
						))}
					<div className="finalOrderText">{sideName}</div>
					<div className="finalOrderText">{beverageName}</div>
				</div>
				<div className="confirmButtons">
					<button className="confirmOrderButton" onClick={handleEditOrder}>
						Edit Order
					</button>
					<button className="confirmOrderButton" onClick={handlePlaceOrder}>
						Place Order
					</button>
				</div>
			</div>
		</div>
	);
}

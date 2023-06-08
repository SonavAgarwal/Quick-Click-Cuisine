import "./sandwich.scss";
import { React } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NameText } from "./NameText";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export function Reorder() {
	const location = useLocation();
	const reorderIngredients = location.state.ingredients;
	const side = location.state.side;
	const beverage = location.state.beverage;
	const orderType = location.state.orderType;

	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	async function sendPostRequest() {
		if (!user) {
			alert("Please log in to place an order!");
			return;
		}

		const data = {
			user_id: user?.uid,
			ingredients: reorderIngredients,
			type: orderType,
			side: side,
			beverage: beverage,
			user_name: user?.displayName,
		};

		const response = await axios.post("http://127.0.0.1:5000/order", data);

		if (response.status === 201) {
			navigate("/");
		} else {
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
					{reorderIngredients.map((ingredient, index) => (
						<div key={index} className="finalOrderText">
							{ingredient}
						</div>
					))}
					<div className="finalOrderText">{side}</div>
					<div className="finalOrderText">{beverage}</div>
				</div>
				<div className="confirmButtons">
					<button className="confirmOrderButton" onClick={handlePlaceOrder}>
						Place Order
					</button>
				</div>
			</div>
		</div>
	);
}

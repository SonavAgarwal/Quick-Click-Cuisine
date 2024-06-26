import { React, useState, useEffect } from "react";
import "./HistoryCard.scss";
import pizzaFull from "../static/pizza.png";
import sandwichFull from "../static/sandwich.png";
import saladFull from "../static/salad.png";
import starIcon from "../static/starIcon.svg";
import writeIcon from "../static/writeIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const HistoryCard = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isFavorite, setFavorite] = useState();
	const [buttonStyle, setButtonStyle] = useState("yellow");
	const [buttonContent, setButtonContent] = useState("Favorite");

	const fetchFavorite = () => {
		fetch("http://127.0.0.1:5000/order/" + orderId + "/isFavorite")
			.then((res) => res.json())
			.then((data) => {
				setFavorite(data);
			});
	};

	useEffect(() => {
		fetchFavorite();
		if (isFavorite === true) {
			setButtonStyle("green");
			setButtonContent("Favorited");
		}
	});

	let type = props.type;
	let ingredients = props.ingredients;
	let orderId = props.oid;
	let image;

	if (type === "Sandwich") {
		image = sandwichFull;
	}
	if (type === "Salad") {
		image = saladFull;
	}
	if (type === "Pizza") {
		image = pizzaFull;
	}

	const [orderTitle, setOrderTitle] = useState("");
	const [isEditing, setIsEditing] = useState(false);

	let desc = type + " with ";
	for (let i = 0; i < ingredients.length - 1; i++) {
		desc += ingredients[i] + ", ";
	}

	desc += "and " + ingredients[ingredients.length - 1];

	const handleTitleClick = () => {
		setIsEditing(true);
	};

	const handleTitleBlur = () => {
		setIsEditing(false);
	};

	const handleNameChange = (event) => {
		setOrderTitle(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			event.target.blur();
		}
	};

	const redirectToInputField = (event) => {
		event.preventDefault();
		const inputField = document.getElementById("inputField");
		inputField.scrollIntoView({ behavior: "smooth" });
		inputField.focus();
	};

	async function addFavorite() {
		if (isFavorite !== true) {
			if (orderTitle === "") {
				const data = {
					order_id: orderId,
					order_nickname: type,
				};

				const response = await axios.post(
					"http://127.0.0.1:5000/order/favorite",
					data
				);
			} else {
				const data = {
					order_id: orderId,
					order_nickname: orderTitle,
				};

				const response = await axios.post(
					"http://127.0.0.1:5000/order/favorite",
					data
				);
			}
			setFavorite(false);
			setButtonStyle("green");
		}
	}

	return (
		<div className="historyCard">
			<div className="content">
				<img src={image}></img>
				<div className="textContainer">
					<div className="orderContainer">
						<input
							className="orderTitle"
							id="inputField"
							placeholder={type}
							value={orderTitle}
							maxLength={10}
							onClick={handleTitleClick}
							onBlur={handleTitleBlur}
							onChange={handleNameChange}
							onKeyDown={handleKeyDown}
						></input>
					</div>
					<div className="orderDesc">{desc}</div>
				</div>
			</div>
			<div className="historyFooter">
				{/* <div className="spacer"></div> */}
				<button className={`reorder ${buttonStyle}`} onClick={addFavorite}>
					{buttonContent}
				</button>
			</div>
		</div>
	);
};

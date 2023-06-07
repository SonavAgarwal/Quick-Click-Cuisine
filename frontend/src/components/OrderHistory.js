import "./OrderHistory.scss";
import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NameText } from "./NameText";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import searchIcon from '../static/search.png';
import magnifyingGlass from '../static/magnifying-glass.png'
import { HistoryCard } from "./HistoryCard";

export function OrderHistory() {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [displayedOrders, setDisplayedOrders] = useState([]);


    useEffect(() => {
        fetchOrders();
    }, [searchQuery])
    

    const fetchOrders = () => {
        const user_id = user?.uid;
        if (searchQuery === ""){
            fetch("http://127.0.0.1:5000/orders/past/user/" + user_id)
                .then((res) => res.json())
                .then((data) => {
                    setDisplayedOrders(data);
                });
        }
        else{
            fetch("http://127.0.0.1:5000/user/" + user_id + "/searchIngredients/" + searchQuery)
            .then((res) => res.json())
            .then((data) => {
                setDisplayedOrders(data);
            });
        }
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        // const temp = searchQuery + " i am just added here for fun";
        // setSearchQuery(temp);
        fetchOrders();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
          event.target.blur();
        }
     };

     useEffect(() => {
        if (!user) return;
        fetchOrders();
    }, [user]);


	return (
		<div className="orderHistory">
			<div className="header">
				<div className="mainTitle">
					<NameText />, Here's Your Order History!
				</div>
				<div className="mainSubtitle">
					View all of your past orders here, and add them to your instant orders as needed.
				</div>
				<div className="buttons">
					<button className="button" onClick={() => (window.location.href = "/")}>
						Home
					</button>
				</div>
                <div className="searchBar">
                    <input type="text" placeholder="Search for an ingredient..." value={searchQuery} onChange = {handleSearchChange} onKeyDown={handleKeyDown}/>
                    <button onClick={fetchOrders}>
                        <img className = "searchIcon" src = {magnifyingGlass}></img>
                    </button>
                </div>
			</div>
            <div className="landingContent">
            <div className="orderHistory">
                    <div className="cardContainer">
                    {displayedOrders?.map((order, index) => {
                        const parsed = JSON.parse(order);
                        const type = parsed.type;
                        const ingredients = parsed.ingredients;
                        const beverage = parsed.beverage;
                        const side = parsed.side;
                        const oid = parsed.order_id;
                        const typeUpper = type.charAt(0).toUpperCase() + type.slice(1);
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
                    })}
                    </div>
                </div>
                </div>
		</div>
	);
}
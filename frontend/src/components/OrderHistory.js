import "./OrderHistory.scss";
import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NameText } from "./NameText";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import searchIcon from '../static/search.png';
import magnifyingGlass from '../static/magnifying-glass.png';
import { HistoryCard } from "./HistoryCard";

export function OrderHistory() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [orderHistory, setOrderHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    function fetchOrderHistory() {
        const user_id = user?.uid;
        fetch("http://127.0.0.1:5000/orders/past/user/" + user_id)
            .then((res) => res.json())
            .then((data) => {
                setOrderHistory(data);
                setFilteredHistory(data);
            });
    }

    useEffect(() => {
        setFilteredHistory(orderHistory);
    }, []);

    useEffect(() => {
        handleSearch();
      }, [searchQuery]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        const lowercaseQuery = searchQuery.toLowerCase();

        const temp = orderHistory.filter((order) => {
            const parsed = JSON.parse(order);
            const ingredients = parsed.ingredients?.map((ingredient) => ingredient.toLowerCase());
            const type = parsed.type.toLowerCase();
            return ingredients?.some((ingredient) => ingredient.includes(lowercaseQuery)) ||
                   type === lowercaseQuery;
        });
      
        setFilteredHistory(temp);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
          event.target.blur();
        }
     };

     useEffect(() => {
        if (!user) return;
        fetchOrderHistory();
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
                    <input type="text" placeholder="Search for an ingredient or order type..." value={searchQuery} onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
                    <button onClick={handleSearch}>
                        <img className = "searchIcon" src = {magnifyingGlass}></img>
                    </button>
                </div>
            </div>
            <div className="landingContent">
            <div className="orderHistory">
                    <div className="cardContainer">
                    {filteredHistory?.map((order, index) => {
                        const parsed = JSON.parse(order);
                        const type = parsed.type;
                        const ingredients = parsed.ingredients;
                        const beverage = parsed.beverage;
                        const side = parsed.side;
                        const oid = parsed.order_id;
                        const typeUpper = type.charAt(0).toUpperCase() + type.slice(1);
                        console.log("typeUpper: ", typeUpper, "\n");
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

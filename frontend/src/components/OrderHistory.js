import "./OrderHistory.scss";
import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NameText } from "./NameText";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export function OrderHistory() {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        const temp = searchQuery + " i am just added here for fun";
        setSearchQuery(temp);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
          event.target.blur();
        }
     };

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
                    <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="mainSubtitle">
					{searchQuery}
				</div>
			</div>
		</div>
	);
}

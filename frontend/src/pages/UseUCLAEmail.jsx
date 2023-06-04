import React from "react";

import UCLALogo from "../assets/UCLALogo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./UseUCLAEmail.module.css";

const UseUCLAEmail = () => {
	return (
		<div className={styles.page}>
			<img src={UCLALogo} alt="UCLA Logo" />
			<h1>Please use your UCLA Email to sign in next time.</h1>
			<button
				onClick={() => {
					signOut(auth);
				}}
			>
				Sign out
			</button>
		</div>
	);
};

export default UseUCLAEmail;

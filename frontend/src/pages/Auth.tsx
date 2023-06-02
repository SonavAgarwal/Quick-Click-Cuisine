import {
	GoogleAuthProvider,
	signInWithCredential,
	signInWithRedirect,
} from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import StudyLogo from "../assets/studylogotransparent.png"
import styles from "./Auth.module.css";
import GoogleButton from 'react-google-button'


const provider = new GoogleAuthProvider();

export const Auth = () => {
	const [user, loading, error] = useAuthState(auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, loading, error]);

	function login() {
		signInWithRedirect(auth, provider);
	}

	return (
		<div className={styles.authpage}>
			Auth
			<img className={styles.logo} src={StudyLogo}></img>
			<GoogleButton
			type="light"
  onClick={login}
/>
		</div>
	);
};

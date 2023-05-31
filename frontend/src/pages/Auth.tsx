import {
	GoogleAuthProvider,
	signInWithCredential,
	signInWithRedirect,
} from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

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
		<div>
			Auth
			<button onClick={login}>Sign in With Google</button>
		</div>
	);
};

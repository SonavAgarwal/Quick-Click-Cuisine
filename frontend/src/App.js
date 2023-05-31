import "./App.css";
import { Landing } from "./components/Landing";
import { Sandwich } from "./components/Sandwich";
import { Pizza } from "./components/Pizza";
import { Sides } from "./components/Sides";
import { Salad } from "./components/Salad";
import { ConfirmOrder } from "./components/ConfirmOrder";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { Auth } from "./pages/Auth.tsx";

function App() {
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			return;
		}

		if (error) {
			return;
		}

		if (!user) {
			navigate("/login");
		}
	}, [user, loading, error]);

	return (
		<div>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="sandwich" element={<Sandwich />} />
				<Route path="pizza" element={<Pizza />} />
				<Route path="salad" element={<Salad />} />
				<Route path="sides" element={<Sides />} />
				<Route path="confirmOrder" element={<ConfirmOrder />} />
				<Route path="login" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;

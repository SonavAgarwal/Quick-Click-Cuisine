import "./App.css";
import { Landing } from "./components/Landing";
import { Sandwich } from "./components/Sandwich";
import { Pizza } from "./components/Pizza";
import { Sides } from "./components/Sides";
import { Salad } from "./components/Salad";
import { Order } from "./components/Order";
import { ConfirmOrder } from "./components/ConfirmOrder";
import { Reorder } from "./components/Reorder";
import { OrderHistory } from "./components/OrderHistory";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { Auth } from "./pages/Auth";
import UseUCLAEmail from "./pages/UseUCLAEmail";
import Leaderboard from "./pages/Leaderboard";

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
		} else if (!user?.email.includes("ucla.edu")) {
			navigate("/useUCLAEmail");
		}
	}, [user, loading, error]);

	return (
		<div>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/order" element={<Order />} />
				<Route path="sandwich" element={<Sandwich />} />
				<Route path="pizza" element={<Pizza />} />
				<Route path="salad" element={<Salad />} />
				<Route path="sides" element={<Sides />} />
				<Route path="confirmOrder" element={<ConfirmOrder />} />
				<Route path="reorder" element={<Reorder />} />
				<Route path="orderHistory" element={<OrderHistory />} />
				<Route path="login" element={<Auth />} />
				<Route path="useUCLAEmail" element={<UseUCLAEmail />} />
				<Route path="leaderboard" element={<Leaderboard />} />
			</Routes>
		</div>
	);
}

export default App;

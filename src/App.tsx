import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import BookPage from "./pages/BookPage";
import BookDetailPage from "./pages/BookDetailPage";
import LoginPage from "./pages/LoginPage";
import ReservationsPage from "./pages/ReservationsPage";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<DashboardPage />} />
				<Route path="books" element={<BookPage />} />
				<Route path="books/:id" element={<BookDetailPage />} />
				<Route path="login" element={<LoginPage />} />

				<Route element={<ProtectedRoute />}> {/* <-- the guard */}
					  <Route path="reservations" element={<ReservationsPage />} />
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
);
}
export default App;
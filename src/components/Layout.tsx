import { NavLink, Outlet } from "react-router-dom";
import useAuthStore from "../Store/authStore";
import useUiStore from "../Store/uiStore";

function Layout() {
	const isDarkMode = useUiStore((state) => state.isDarkMode);
	const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
	const userName = useAuthStore((state) => state.userName);
	const logout = useAuthStore((state) => state.logout);
	const linkClass = ({ isActive }: { isActive: boolean }): string =>
		`rounded px-3 py-1.5 text-sm ${isActive ? "bg-blue-600 font-semibold text-white" : "text-gray-700 hover:bg-gray-200 dark:text-gray-300"}`;

	return (
		<div className={isDarkMode ? "dark" : ""}>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
				<nav className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
					<span className="mr-4 text-sm uppercase text-gray-500">Library Book Reservation System</span>
					<NavLink to="/" end className={linkClass}>Dashboard</NavLink>
					<NavLink to="/books" className={linkClass}>Books</NavLink>
					<NavLink to="/reservations" className={linkClass}>Reservations</NavLink>
					{userName === null ? <NavLink to="/login" className={linkClass}>Login</NavLink> : <button onClick={logout} className="text-gray-700 dark:text-white">Logout ({userName})</button>}
					<button onClick={toggleDarkMode} className="ml-auto rounded bg-gray-800 px-3 py-1.5 text-sm text-white dark:bg-gray-200 dark:text-gray-900">
						{isDarkMode ? "Switch to Light" : "Switch to Dark"}
					</button>
				</nav>
				<header className="p-6"><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reserve books with live availability updates</h1></header>
				<main className="p-6"><Outlet /></main>
			</div>
		</div>
	);
}
export default Layout;
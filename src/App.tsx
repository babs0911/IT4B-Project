import { Route, Routes } from "react-router-dom";

import BookDetailPage from "./pages/BookDetailPage";
import BookPage from "./pages/BookPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import LibraryAssistantPage from "./pages/LibraryAssistantPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import ReservationsPage from "./pages/ReservationsPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="books" element={<BookPage />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="library-assistant" element={<LibraryAssistantPage />} />
          <Route path="review" element={<LibraryAssistantPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

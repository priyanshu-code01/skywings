import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

// Pages Import
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookFlight from "./pages/BookFlight"; 
import Dashboard from "./pages/Dashboard";
import SearchPage from "./pages/SearchPage";

// 👇 Naya: Page change hone par automatic top par scroll karne ke liye
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {/* Har page navigation par top par scroll karega */}
      <ScrollToTop />

      <div className="min-h-screen bg-[#0B1120] text-white font-sans selection:bg-cyan-500/30">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          {/* Protected Routes (Sirf logged-in users ke liye) */}
          <Route
            path="/book/:id"
            element={user ? <BookFlight /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          {/* 404 Redirect (Agar koi galat URL dale toh home bhej do) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Context Providers Import
import { AuthProvider } from "./context/AuthContext.jsx";
import { BookingProvider } from "./context/BookingContext.jsx"; // 👈 NAYA

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Sabse upar AuthProvider taaki user login hai ya nahi ye sabko pata ho */}
    <AuthProvider>
      {/* Uske andar BookingProvider taaki booking details pure app me available rahein */}
      <BookingProvider>
        <App />
      </BookingProvider>
    </AuthProvider>
  </React.StrictMode>,
);

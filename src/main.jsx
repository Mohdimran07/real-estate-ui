import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./index.scss";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  </AuthProvider>
);

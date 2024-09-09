import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContex";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);

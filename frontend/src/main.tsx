import { StrictMode } from "react";
import { Container, createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";

createRoot(document.getElementById("root") as Container).render(
  <StrictMode>
    <App />
  </StrictMode>
);

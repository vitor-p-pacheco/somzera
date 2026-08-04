import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

document.documentElement.lang = "pt-BR";
document.title = "SOMZERA - Reviews de Música";
document.body.className = "text-sz-dark h-screen flex flex-col overflow-x-hidden";

createRoot(document.getElementById("root")).render(<App />);

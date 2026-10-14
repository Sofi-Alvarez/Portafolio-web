import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/index.css";
import App from "./app/App";

/* Links viejos con hash (ej. /#/case-study/iupi, compartidos antes de pasar a URLs limpias):
   se reescriben a /case-study/iupi antes de montar la app, sin sumar una entrada al historial */
if (window.location.hash.startsWith("#/")) {
  window.history.replaceState(null, "", window.location.hash.slice(1));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

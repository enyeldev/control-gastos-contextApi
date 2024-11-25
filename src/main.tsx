import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BudgetProvaider } from "./context/BudgetContext/BudgetProvaider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BudgetProvaider>
      <App />
    </BudgetProvaider>
  </StrictMode>
);

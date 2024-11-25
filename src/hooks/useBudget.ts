import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext/BudgetContext";

export const useBudget = () => {
  return useContext(BudgetContext);
};

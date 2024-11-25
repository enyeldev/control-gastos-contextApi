import { ReactNode, useMemo, useReducer } from "react";
import { BudgetContext } from "./BudgetContext";
import { budgetReducer, initialState } from "../../reducers/budget-reducer";

type BudgetProvaiderType = {
  children: ReactNode;
};

export const BudgetProvaider = ({ children }: BudgetProvaiderType) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );

  const remainingBudget = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, remainingBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

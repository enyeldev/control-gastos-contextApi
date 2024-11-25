import { createContext, Dispatch } from "react";
import {
  BudgetActions,
  BudgetState,
  initialState,
} from "../../reducers/budget-reducer";

type BudgetContextType = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  remainingBudget: number;
};

const BudgetContextInitialState: BudgetContextType = {
  state: initialState,
  dispatch: () => {},
  totalExpenses: 0,
  remainingBudget: 0,
};

export const BudgetContext = createContext(BudgetContextInitialState);

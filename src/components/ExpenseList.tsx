import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetail } from "./ExpenseDetail";

export const ExpenseList = () => {
  const { state } = useBudget();

  const showExpenseFiltered = useMemo(
    () =>
      state.categoryFilterId === ""
        ? state.expenses
        : state.expenses.filter(
            (exp) => exp.category === state.categoryFilterId
          ),
    [state.categoryFilterId, state.expenses]
  );

  const isEmpty = useMemo(
    () => showExpenseFiltered.length === 0,
    [state.expenses, state.categoryFilterId]
  );

  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
            Listado de Gastos.
          </p>
          {showExpenseFiltered.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

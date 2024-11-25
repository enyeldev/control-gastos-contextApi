import { categories } from "../data/categories";
import { DatePicker } from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

const DEFAUL_VALUE_DRAFT_EXPENSE: DraftExpense = {
  amount: 0,
  category: "",
  date: new Date(),
  expenseName: "",
};

export const ExpenseForm = () => {
  const [expense, setExpense] = useState(DEFAUL_VALUE_DRAFT_EXPENSE);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [previousAmount, setPreviousAmount] = useState(0);
  const { dispatch, state, remainingBudget } = useBudget();

  useEffect(() => {
    const editingExpense = state.expenses.find((e) => e.id === state.editingId);
    if (!editingExpense) return;
    setIsEditing(true);
    setExpense(editingExpense);
    setPreviousAmount(editingExpense.amount);
  }, [state.editingId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    const isAmountField = ["amount"].includes(name);

    setExpense((prev) => ({
      ...prev,
      [name]: isAmountField ? +value : value,
    }));
  };

  const handleChangeDate = (value: Value) => {
    setExpense((prev) => ({ ...prev, date: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const isSomeValueEmpty = Object.values(expense).includes("");

    if (isSomeValueEmpty) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (expense.amount - previousAmount > remainingBudget) {
      setError("Este gasto se sale del presupuesto.");
      return;
    }

    if (isEditing) {
      dispatch({
        type: "update-expense",
        payload: { expense: { ...expense, id: state.editingId } },
      });
      setIsEditing(false);
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    setExpense(DEFAUL_VALUE_DRAFT_EXPENSE);
    setPreviousAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500">
        {isEditing ? "Guardar Cambios" : "Nuevo Gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl">Fecha Gasto:</label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        value={isEditing ? "Guardar Cambios" : "Registrar Gasto"}
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      />
    </form>
  );
};

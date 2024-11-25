import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";
import { useMemo } from "react";

export const BudgetTracker = () => {
  const { state, remainingBudget, totalExpenses, dispatch } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  const mainColor = useMemo(
    () => (percentage === 100 ? "#dc2626" : "#3b82f6"),
    [state.expenses]
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}% Gastado`}
          styles={buildStyles({
            pathColor: `${mainColor}`,
            trailColor: "#F5F5F5",
            textSize: 10,
            textColor: `${mainColor}`,
          })}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({ type: "restart-app" })}
        >
          Restaurar App
        </button>

        <AmountDisplay label="Presuepuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={remainingBudget} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
};

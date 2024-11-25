import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export const FilterByCategory = () => {
  const { dispatch } = useBudget();
  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form action="">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="filtrar">Filtrar Gastos</label>
          <select
            id="filtrar"
            className="bg-slate-100 p-3 flex-1 rounded"
            onChange={(e) =>
              dispatch({
                type: "set-catgeory-filter",
                paylaod: { id: e.target.value },
              })
            }
          >
            <option value="">--- Todas las categorias ---</option>
            {categories.map((catgeory) => (
              <option value={catgeory.id} key={catgeory.id}>
                {catgeory.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

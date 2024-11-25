import { ReactNode } from "react";

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center rounded-md">
      {children}
    </p>
  );
};

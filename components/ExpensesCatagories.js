import { currencyFormatter } from "@/lib/utils";
import React from "react";
import ViewExpensesModal from "./modals/ViewExpensesModal";

const ExpensesCatagories = ({
  expense,
  setViewExpenseModal,
  viewExpenseModal,
}) => {
  return (
    <>
      <button
        onClick={() => {
          setViewExpenseModal(true);
        }}
      >
        {/* expensees */}
        <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-full">
          <div className="flex items-center gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            ></div>
            <h4 className="capitalize"> {expense.title}</h4>
          </div>
          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
      {/* Add expense  modal */}
      {viewExpenseModal && (
        <ViewExpensesModal
          onClose={setViewExpenseModal}
          show={viewExpenseModal}
          expense={expense}
        />
      )}{" "}
    </>
  );
};

export default ExpensesCatagories;

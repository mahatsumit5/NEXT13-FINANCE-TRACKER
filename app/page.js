"use client";
import ExpensesCatagories from "@/components/ExpensesCatagories";
import { currencyFormatter } from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useContext, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

import AddModal from "@/components/modals/AddModal";
import { financeContext } from "@/lib/store/finance-context";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import ViewExpensesModal from "@/components/modals/ViewExpensesModal";

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [viewExpenseModal, setViewExpenseModal] = useState(false);
  const { expenses, income } = useContext(financeContext);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const newBalace =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);
    setBalance(newBalace);
  }, [income, expenses]);
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-gray-400 text-md"> My Balance</small>
        <h2 className="text-4xl font-bold"> {currencyFormatter(balance)}</h2>
      </section>
      <section className="py-3 flex items-center gap-2">
        <button
          onClick={() => {
            setShowExpenseModal(true);
          }}
          className="btn btn-primary"
        >
          + Expenses
        </button>
        <button
          onClick={() => {
            setShowAddIncomeModal(true);
          }}
          className="btn btn-primary-outline"
        >
          + Income
        </button>
      </section>{" "}
      {/* eXPENSES */}
      <section className="py-6">
        <h3 className="text-2xl"> My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {expenses.map((data) => (
            <ExpensesCatagories
              key={data.id}
              expense={data}
              setViewExpenseModal={setViewExpenseModal}
              viewExpenseModal={viewExpenseModal}
            />
          ))}
        </div>
      </section>
      {/* chartjs */}
      <section className="py-6">
        <h3 className="text-2xl">Stats</h3>
        <div className="w-1/2 mx-auto">
          <Doughnut
            data={{
              labels: expenses.map((d) => d.title),
              datasets: [
                {
                  label: "Expenses",
                  backgroundColor: expenses.map((d) => d.color),
                  data: expenses.map((expense) => expense.total),
                  borderWidth: 5,
                  borderColor: ["#18181b"],
                },
              ],
            }}
          />
        </div>
      </section>
      {/* add income modal */}
      {showAddIncomeModal && (
        <AddModal
          setShowAddIncomeModal={setShowAddIncomeModal}
          showAddIncomeModal={showAddIncomeModal}
        />
      )}
      {/* Add expense  modal */}
      {showExpenseModal && (
        <AddExpensesModal
          onClose={setShowExpenseModal}
          show={showExpenseModal}
        />
      )}
    </main>
  );
}

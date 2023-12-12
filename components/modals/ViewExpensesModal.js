import { currencyFormatter, dateFormatter } from "@/lib/utils";
import Modal from "../Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { getExpenseByCat } from "@/lib/axios/axios";

export default function ViewExpensesModal({ onClose, show, expense }) {
  const { deleteExpenseItem, deleteExpense } = useContext(financeContext);
  const [expenses, setExpenses] = useState([]);
  console.log(expenses);
  const handleOnDelete = async (item) => {
    try {
      const updateitems = expense.items.filter((i) => i.id !== item.id);
      const updatedExpenses = {
        items: [...updateitems],
        total: expense.total - item.amount,
      };
      deleteExpenseItem(expense.id, updatedExpenses);
    } catch (error) {}
  };
  //   delete expenses
  const handledeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    async function getExpenses() {
      const { status, expenses } = await getExpenseByCat(expense.id);
      setExpenses(expenses);
    }
    getExpenses();
  }, [expense]);
  return (
    <Modal onClose={onClose} show={show}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl capitalize">{expense.title}</h2>
        <button
          className="btn btn-danger"
          onClick={() => {
            handledeleteExpense(expense.id);
          }}
        >
          Delete
        </button>
      </div>
      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>
        {expenses.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 mt-2"
            >
              <small>{dateFormatter(item.createdAt)}</small>
              <p>
                {currencyFormatter(item.amount)}{" "}
                <button
                  onClick={() => {
                    handleOnDelete(item);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

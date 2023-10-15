"use client";

import { useContext, useRef, useState } from "react";
import Modal from "../Modal";
import { financeContext } from "@/lib/store/finance-context";
import { v4 } from "uuid";
import { authContext } from "@/lib/store/auth-context";

export default function AddExpensesModal({ show, onClose }) {
  const { expenses, addExpenseItem, addExpenseCatagory } =
    useContext(financeContext);
  const { user } = useContext(authContext);

  const [selectedCatagory, setSelectedCatagory] = useState(null);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [showAddExp, setShowAddExp] = useState(false);
  // useref

  const titleRef = useRef();
  const colorRef = useRef();
  //   add function
  const addExpenseHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCatagory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: v4(),
        },
      ],
    };
    try {
      await addExpenseItem(selectedCatagory, newExpense);
      setExpenseAmount("");
      setSelectedCatagory(null);
      onClose(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   add catagory function
  const addCatHandle = async () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value;
    try {
      await addExpenseCatagory({ title, color, total: 0, uid: user.uid });
      setShowAddExp(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col input-group">
        <label>Enter your amount</label>
        <input
          className="px-4 py-2 rounded-xl bg-slate-600"
          type="number"
          min={0.01}
          step={0.01}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
          placeholder="Enter expense amount"
        />
      </div>

      {/* expense catagories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expense Catagory</h3>
            <button
              className="btn text-lime-400"
              onClick={() => {
                setShowAddExp(true);
              }}
            >
              + Add New Catagory
            </button>
          </div>

          {showAddExp && (
            <div className="flex items-center justify-between flex-wrap">
              <input
                ref={titleRef}
                type="text"
                className="px-4 py-2 rounded-xl bg-slate-600"
                placeholder="Enter title"
                required
              />
              <label>Pick a color</label>
              <input ref={colorRef} type="color" className="w-10 h-8" />
              <button
                className="btn btn-primary-outline"
                onClick={addCatHandle}
              >
                Create
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowAddExp(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCatagory(expense.id);
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-4 bg-slate-500  rounded-3xl"
                  style={{
                    boxShadow:
                      expense.id === selectedCatagory ? "1px 1px 4px " : "",
                  }}
                >
                  <div className="flex items-center  gap-2 mt-2">
                    <div
                      className="w-[25px] rounded-full h-[25px]"
                      style={{ backgroundColor: expense.color }}
                    ></div>
                    <h4>{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expenseAmount > 0 && selectedCatagory && (
        <div className="mt-6">
          <button
            className="btn btn-success w-full"
            onClick={addExpenseHandler}
          >
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}

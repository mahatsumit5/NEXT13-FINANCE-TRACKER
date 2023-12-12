"use-client";
import { createContext, useEffect, useState, useContext } from "react";
import { authContext } from "./auth-context";
import {
  addExpense,
  addNewCatagory,
  addNewIncome,
  deletExpense,
  deleteExpenseCat,
  deleteIncome,
  getAllIncome,
  getcatagories,
  updateCatagory,
} from "../axios/axios";

export const financeContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  addExpenseItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseCatagory: async () => {},
  deleteExpenseItem: async () => {},
  deleteExpense: async () => {},
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const { user } = useContext(authContext);
  const [expenses, setExpenses] = useState([]);

  async function getIncomeData() {
    const income = await getAllIncome(user.uid);
    setIncome(income.incomes);
  }
  async function getCatagories() {
    const { status, result } = await getcatagories(user.uid);
    setExpenses(result);
  }
  // addincome
  const addIncomeItem = async (newIncome) => {
    try {
      await addNewIncome(newIncome);
      getIncomeData();
    } catch (error) {
      throw new Error(error);
    }
  };
  const removeIncomeItem = async (id) => {
    await deleteIncome(id);
    getIncomeData();
  };
  const addExpenseItem = async (newExpense) => {
    await addExpense(newExpense);
    getCatagories();
  };
  const addExpenseCatagory = async (catagory) => {
    await addNewCatagory(catagory);
    getCatagories();
  };
  // delete expenseItem
  const deleteExpenseItem = async (expenseId, obj) => {
    try {
      const { status, result } = await deletExpense(expenseId);
      console.log(status);
      if (status === "success") {
        await updateCatagory(obj);
      }
      getCatagories();
    } catch (error) {
      console.log(error);
    }
  };
  // delete expenses
  const deleteExpense = async (id) => {
    await deleteExpenseCat(id);
    getCatagories();
  };

  const values = {
    income,
    addIncomeItem,
    removeIncomeItem,
    expenses,
    addExpenseItem,
    addExpenseCatagory,
    deleteExpenseItem,
    deleteExpense,
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getCatagories();
    getIncomeData();
  }, [user]);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}

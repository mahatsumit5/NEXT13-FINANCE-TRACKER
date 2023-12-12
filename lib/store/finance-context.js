"use-client";
import { createContext, useEffect, useState, useContext } from "react";

// firebase
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { authContext } from "./auth-context";
import {
  addExpense,
  addNewCatagory,
  addNewIncome,
  deleteIncome,
  getAllIncome,
  getcatagories,
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
  // delete expense
  const deleteExpenseItem = async (expenseId, updatedExpense) => {
    const docRef = doc(db, "expenses", expenseId);
    try {
      await updateDoc(docRef, {
        ...updatedExpense,
      });
      setExpenses((prevExpense) => {
        const oldexpenses = [...prevExpense];
        const position = oldexpenses.findIndex((ex) => ex.id === expenseId);

        oldexpenses[position].items = [...updatedExpense.items];
        return oldexpenses;
      });
    } catch (error) {
      console.log(error);
    }
  };
  // delete expenses
  const deleteExpense = async (id) => {
    const docRef = doc(db, "expenses", id);
    try {
      await deleteDoc(docRef);
      setExpenses((prevState) => {
        return prevState.filter((i) => i.id !== id);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
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

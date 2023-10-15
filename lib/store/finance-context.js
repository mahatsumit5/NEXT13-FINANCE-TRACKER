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

  // addincome
  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      //  update State

      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  const removeIncomeItem = async (id) => {
    const docRef = doc(db, "income", id);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== id);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const addExpenseItem = async (expenseCatagoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCatagoryId);
    try {
      await updateDoc(docRef, { ...newExpense });

      //  update State
      setExpenses((prevState) => {
        const updatedExpense = [...prevState];
        const foundIndex = updatedExpense.findIndex((expense) => {
          return expense.id === expenseCatagoryId;
        });
        updatedExpense[foundIndex] = { id: expenseCatagoryId, ...newExpense };
        return updatedExpense;
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  const addExpenseCatagory = async (catagory) => {
    const collectionRef = collection(db, "expenses");

    try {
      const docSnap = await addDoc(collectionRef, {
        ...catagory,
        items: [],
      });
      setExpenses((prevExpense) => {
        return [
          ...prevExpense,
          {
            id: docSnap.id,
            items: [],
            ...catagory,
          },
        ];
      });
    } catch (error) {
      throw error;
    }
  };
  // delete expense
  const deleteExpenseItem = async (expenseId, updatedExpense) => {
    console.log(expenseId);
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
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const q = query(collectionRef, where("uid", "==", user.uid));
      const docsSnap = await getDocs(q);
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };
    getIncomeData();

    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const q = query(collectionRef, where("uid", "==", user.uid));

      const docsSnap = await getDocs(q);
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setExpenses(data);
    };
    getExpensesData();
  }, [user]);
  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}

import axios from "axios";
const url = "/api/income";
const expenseUrl = "/api/catagory";
const expenseApi = "/api/expense";
export const addNewIncome = async (newIncome) => {
  try {
    const { data } = await axios.post(url, newIncome);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllIncome = async (uid) => {
  try {
    const { data } = await axios.get(`${url}?uid=${uid}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export async function deleteIncome(id) {
  try {
    const { data } = await axios.delete(`${url}?id=${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const addNewCatagory = async (obj) => {
  try {
    const { data } = await axios.post(expenseUrl, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCatagory = async (obj) => {
  try {
    const { data } = await axios.put(expenseUrl, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getcatagories = async (uid) => {
  try {
    const { data } = await axios.get(`${expenseUrl}?uid=${uid}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteExpenseCat = async (id) => {
  try {
    const { data } = await axios.delete(`${expenseUrl}?id=${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addExpense = async (obj) => {
  try {
    const { data } = await axios.post(expenseApi, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getExpenseByCat = async (id) => {
  try {
    const { data } = await axios.get(`${expenseApi}?id=${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deletExpense = async (id) => {
  try {
    const { data } = await axios.delete(`${expenseApi}?id=${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

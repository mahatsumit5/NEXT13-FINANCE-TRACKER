import axios from "axios";
const url = "/api/income";
const expenseUrl = "/api/catagory";
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
export const addNewCatagory = async (obj) => {
  try {
    const { data } = await axios.post(expenseUrl, obj);
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

import axios from "axios";
const BASE = "http://localhost:5000/api/categories";

export const getCategories = async () => {
  return (await axios.get(BASE)).data;
};

export const addCategory = async (d) => {
  return (await axios.post(BASE, d)).data;
};

import axios from "axios";

const BASE = "http://localhost:5000/api/categories";

// --------------------
// PUBLIC — Only approved categories for dropdown
// --------------------
export const getCategories = async () => {
  return (await axios.get(BASE)).data;
};

// --------------------
// PUBLIC — Add category (goes pending)
// --------------------
export const addCategory = async (data) => {
  return (await axios.post(BASE, data)).data;
};

// --------------------
// ADMIN — Get pending categories
// --------------------
export const getPendingCategories = async () => {
  return (await axios.get(`${BASE}/pending`)).data;
};

// --------------------
// ADMIN — Approve category
// --------------------
export const approveCategory = async (id) => {
  return (await axios.post(`${BASE}/approve/${id}`)).data;
};

// --------------------
// ADMIN — Reject category
// --------------------
export const rejectCategory = async (id) => {
  return (await axios.post(`${BASE}/reject/${id}`)).data;
};

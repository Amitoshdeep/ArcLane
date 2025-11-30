import { API } from "./client";

// --------------------
// PUBLIC — Approved categories
// --------------------
export const getCategories = async () => {
  return (await API.get("/categories")).data;
};

// --------------------
// PUBLIC — Add new category
// --------------------
export const addCategory = async (data) => {
  return (await API.post("/categories", data)).data;
};

// --------------------
// ADMIN — Pending categories
// --------------------
export const getPendingCategories = async () => {
  return (await API.get("/categories/pending")).data;
};

// --------------------
// ADMIN — Approve a category
// --------------------
export const approveCategory = async (id) => {
  return (await API.post(`/categories/approve/${id}`)).data;
};

// --------------------
// ADMIN — Reject a category
// --------------------
export const rejectCategory = async (id) => {
  return (await API.post(`/categories/reject/${id}`)).data;
};

import axios from "axios";

const BASE = "https://arclane-production.up.railway.app/api/categories";

// --------------------
// PUBLIC — Approved categories
// --------------------
export const getCategories = async () => {
  return (await axios.get(BASE)).data;
};

// --------------------
// PUBLIC — Add new category
// --------------------
export const addCategory = async (data) => {
  return (await axios.post(BASE, data)).data;
};

// --------------------
// ADMIN — Pending
// --------------------
export const getPendingCategories = async () => {
  return (
    await axios.get(`${BASE}/pending`, {
      withCredentials: true,
    })
  ).data;
};

// --------------------
// ADMIN — Approve
// --------------------
export const approveCategory = async (id) => {
  return (
    await axios.post(`${BASE}/approve/${id}`, {}, { withCredentials: true })
  ).data;
};

// --------------------
// ADMIN — Reject
// --------------------
export const rejectCategory = async (id) => {
  return (
    await axios.post(`${BASE}/reject/${id}`, {}, { withCredentials: true })
  ).data;
};

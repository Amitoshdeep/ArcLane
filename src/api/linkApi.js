// src/api/linkApi.js
import axios from "axios";

const BASE = "http://localhost:5000/api/links";

// Generic fetch with filters (used by Home + Admin)
export const getLinks = async ({ status, categoryId, search } = {}) => {
  const params = {};
  if (status) params.status = status;
  if (categoryId) params.categoryId = categoryId;
  if (search) params.search = search;

  const res = await axios.get(BASE, { params });
  return res.data;
};

// Create a new link (used by AddLink)
export const addLink = async (payload) => {
  const res = await axios.post(BASE, payload);
  return res.data;
};

// Approve / Reject (used by AdminDashboard)
export const approveLink = async (id) => {
  const res = await axios.patch(`${BASE}/${id}/approve`);
  return res.data;
};

export const rejectLink = async (id) => {
  const res = await axios.patch(`${BASE}/${id}/reject`);
  return res.data;
};

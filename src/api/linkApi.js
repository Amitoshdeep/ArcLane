import { API } from "./client";

// --------------------
// PUBLIC — Get approved links
// ADMIN — Pending/rejected if cookie valid
// --------------------
export const getLinks = async ({ status, categoryId, search } = {}) => {
  const params = {};
  if (status) params.status = status;
  if (categoryId) params.categoryId = categoryId;
  if (search) params.search = search;

  const res = await API.get("/links", { params });
  return res.data;
};

// --------------------
// PUBLIC — Add a link
// --------------------
export const addLink = async (payload) => {
  const res = await API.post("/links", payload);
  return res.data;
};

// --------------------
// ADMIN — Approve
// --------------------
export const approveLink = async (id) => {
  const res = await API.patch(`/links/${id}/approve`);
  return res.data;
};

// --------------------
// ADMIN — Reject
// --------------------
export const rejectLink = async (id) => {
  const res = await API.patch(`/links/${id}/reject`);
  return res.data;
};

import axios from "axios";

const BASE = "https://arclane-production.up.railway.app/api/links";

// --------------------
// PUBLIC — Get approved links
// ADMIN — Pending/rejected if cookie valid
// --------------------
export const getLinks = async ({ status, categoryId, search } = {}) => {
  const params = {};
  if (status) params.status = status;
  if (categoryId) params.categoryId = categoryId;
  if (search) params.search = search;

  const res = await axios.get(BASE, {
    params,
    withCredentials: true, // needed if admin fetches pending
  });

  return res.data;
};

// --------------------
// PUBLIC — Add a link
// --------------------
export const addLink = async (payload) => {
  const res = await axios.post(BASE, payload);
  return res.data;
};

// --------------------
// ADMIN — Approve/Reject
// --------------------
export const approveLink = async (id) => {
  const res = await axios.patch(
    `${BASE}/${id}/approve`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

export const rejectLink = async (id) => {
  const res = await axios.patch(
    `${BASE}/${id}/reject`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

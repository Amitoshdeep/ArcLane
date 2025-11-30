import { API } from "./client";

// --------------------
// ADMIN — Get pending links
// --------------------
export const getPendingLinks = async () => {
  const res = await API.get("/links", {
    params: { status: "pending" }
  });
  return res.data;
};

// --------------------
// ADMIN — Approve link
// --------------------
export const approveLink = async (id) => {
  const res = await API.patch(`/links/${id}/approve`);
  return res.data;
};

// --------------------
// ADMIN — Reject link
// --------------------
export const rejectLink = async (id) => {
  const res = await API.patch(`/links/${id}/reject`);
  return res.data;
};

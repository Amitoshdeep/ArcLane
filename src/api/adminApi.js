import axios from "axios";

const API = "http://localhost:5000/api/links";

export const getPendingLinks = async () => {
  const res = await axios.get(API + "?status=pending");
  return res.data;
};

export const approveLink = async (id) => {
  const res = await axios.patch(`${API}/${id}/approve`);
  return res.data;
};

export const rejectLink = async (id) => {
  const res = await axios.patch(`${API}/${id}/reject`);
  return res.data;
};

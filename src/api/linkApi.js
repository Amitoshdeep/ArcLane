import axios from "axios";
const BASE = "http://localhost:5000/api/links";

export const getLinks = async ({ status, categoryId, search }) => {
  const res = await axios.get(BASE, {
    params: { status, categoryId, search },
  });
  return res.data;
};

export const addLink = async (payload) => {
  return (await axios.post(BASE, payload)).data;
};

export const approveLink = async (id) => {
  return (await axios.patch(`${BASE}/${id}/approve`)).data;
};

export const rejectLink = async (id) => {
  return (await axios.patch(`${BASE}/${id}/reject`)).data;
};

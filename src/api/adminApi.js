import axios from "axios";

const API = "https://arclane-production.up.railway.app/api/links";

export const getPendingLinks = async () => {
  const res = await axios.get(API + "?status=pending", {
    withCredentials: true,
  });
  return res.data;
};

export const approveLink = async (id) => {
  const res = await axios.patch(`${API}/${id}/approve`, {}, {
    withCredentials: true,
  });
  return res.data;
};

export const rejectLink = async (id) => {
  const res = await axios.patch(`${API}/${id}/reject`, {}, {
    withCredentials: true,
  });
  return res.data;
};

import axios from "axios";

export const checkAdmin = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/admin/me`,
    { withCredentials: true }
  );

  return res.data.admin;
};

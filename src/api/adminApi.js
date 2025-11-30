// src/api/adminApi.js
import { API } from "./client";

// Always send cookies for admin
const cfg = { withCredentials: true };

// -------------- CATEGORIES --------------

// GET all categories (any status)
export const adminGetCategories = async () => {
  return (await API.get("/admin/categories", cfg)).data;
};

// UPDATE category
export const adminUpdateCategory = async (id, data) => {
  return (await API.put(`/admin/categories/${id}`, data, cfg)).data;
};

// DELETE category
export const adminDeleteCategory = async (id) => {
  return (await API.delete(`/admin/categories/${id}`, cfg)).data;
};

// APPROVE category
export const adminApproveCategory = async (id) => {
  return (await API.patch(`/admin/categories/${id}/approve`, {}, cfg)).data;
};

// REJECT category
export const adminRejectCategory = async (id) => {
  return (await API.patch(`/admin/categories/${id}/reject`, {}, cfg)).data;
};

// (optional) CREATE category later
export const adminCreateCategory = async (data) => {
  return (await API.post("/admin/categories", data, cfg)).data;
};

// -------------- LINKS --------------

// GET all links (any status)
export const adminGetLinks = async () => {
  return (await API.get("/admin/links", cfg)).data;
};

// UPDATE link
export const adminUpdateLink = async (id, data) => {
  return (await API.put(`/admin/links/${id}`, data, cfg)).data;
};

// DELETE link
export const adminDeleteLink = async (id) => {
  return (await API.delete(`/admin/links/${id}`, cfg)).data;
};

// APPROVE link
export const adminApproveLink = async (id) => {
  return (await API.patch(`/admin/links/${id}/approve`, {}, cfg)).data;
};

// REJECT link
export const adminRejectLink = async (id) => {
  return (await API.patch(`/admin/links/${id}/reject`, {}, cfg)).data;
};

// (optional) CREATE link later
export const adminCreateLink = async (data) => {
  return (await API.post("/admin/links", data, cfg)).data;
};

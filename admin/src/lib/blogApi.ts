import {
  getJSON,
  sendJSON,
  delJSON,
} from "./api";

/* ================= CATEGORIES ================= */

export function fetchCategories() {
  return getJSON<any[]>("/categories");
}

export function createCategory(name: string) {
  return sendJSON("/categories", { name });
}

export function deleteCategory(id: string) {
  return delJSON(`/categories/${id}`);
}

/* ================= BLOGS ================= */

export function fetchBlogs() {
  return getJSON<any[]>("/blogs");
}

export function fetchBlogById(id: string) {
  return getJSON<any>(`/blogs/by-id/${id}`);
}

export function createBlog(data: {
  title: string;
  content: string;
  category: string;
  status: "draft" | "published";
}) {
  return sendJSON("/blogs", data);
}

export function updateBlog(
  id: string,
  data: {
    title: string;
    content: string;
    category: string;
    status: "draft" | "published";
  }
) {
  return sendJSON(`/blogs/${id}`, data, "PUT");
}

export function deleteBlog(id: string) {
  return delJSON(`/blogs/${id}`);
}

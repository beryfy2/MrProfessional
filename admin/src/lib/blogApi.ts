import { getJSON, sendJSON, delJSON } from "./api";

type Category = {
  _id: string;
  name: string;
  slug?: string;
};

type Blog = {
  _id: string;
  title: string;
  content: string;
  category: Category | string;
  status: "draft" | "published";
  slug: string;
  createdAt?: string;
};

/* ================= CATEGORIES ================= */

export function fetchCategories() {
  return getJSON<Category[]>("/categories");
}

export function createCategory(name: string) {
  return sendJSON("/categories", { name });
}

export function deleteCategory(id: string) {
  return delJSON(`/categories/${id}`);
}

/* ================= BLOGS ================= */

export function fetchBlogs() {
  return getJSON<Blog[]>("/blogs");
}

export function fetchBlogById(id: string) {
  return getJSON<Blog>(`/blogs/by-id/${id}`);
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

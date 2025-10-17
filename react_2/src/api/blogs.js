import { createAsyncThunk } from "@reduxjs/toolkit";

const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async () => {
    const response = await fetch(`/api/blogs`);
    if (!response.ok) throw new Error(response.statusText);
    
    const blogs = await response.json();
    
    return blogs;
  },
);

const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (id) => {
    const response = await fetch(`/api/blogs/${id}`);
    if (!response.ok) throw new Error(response.statusText);
    
    const blog = await response.json();
    
    return blog;
  },
);

const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (blog) => {
    await fetch("/api/blogs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
  }
);

const sendComment = createAsyncThunk(
  "blog/sendComment",
  async (request) => {
    await fetch(`/api/blogs/${request.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({comment: request.text}),
    });
  }
)

export { getBlogs, getBlog, sendComment, addBlog };
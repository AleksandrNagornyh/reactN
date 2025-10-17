import { createSlice } from "@reduxjs/toolkit";
import { getBlogs, getBlog, sendComment, addBlog } from "../api/blogs";

const blogStore = createSlice({
  name: "blogStore",
  initialState: {
    blogs: [],
    blog: {},
    comments: [],
    isBlogAdded: false
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.blog = action.payload;
      state.comments = action.payload.comments;
    });
    builder.addCase(sendComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.meta.arg.text];
    });
    builder.addCase(addBlog.pending, (state) => {
      state.isBlogAdded = false;
    });
    builder.addCase(addBlog.fulfilled, (state) => {
      state.isBlogAdded = true;
    });
  },
});

export default blogStore.reducer;

import axiosInstance from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Iblogs {
  blogs: IBlog[];
  isLoading: boolean;
}

const initialState: Iblogs = {
  blogs: [],
  isLoading: false,
};

export const getAllBlogs = createAsyncThunk(
  "blog/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/blogs");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch "
      );
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/create",
  async (data: { title: string; content: string; image: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/blogs", data);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch "
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/blogs/delete/${id}`);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.isLoading = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.meta.arg);
      });
  },
});

export default blogSlice.reducer;

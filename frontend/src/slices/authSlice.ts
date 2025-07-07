/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteEmployeeAPI,
  deleteUserAPI,
  getAllEmployeeAPI,
  getAllUserAPI,
  loginAPI,
  loginEmployeeAPI,
  logoutAPI,
  meAPI,
  signUpAPI,
  signupEmployeeAPI,
} from "@/app/Api/authAPI";
import axiosInstance from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  users: User[];
  staff: User[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  mess: string;
}

const initialState: AuthState = {
  user: null,
  users: [],
  staff: [],
  isAuthenticated: false,
  isLoading: false,
  error: null,
  mess: "",
};

export const loginUser = createAsyncThunk(
  "auth/signin",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(loginAPI, credentials);
      const data = response.data;
      if (!data || !data._id) {
        throw new Error("Invalid API response");
      }
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.mess || "Login failed"
      );
    }
  }
);

export const loginStaff = createAsyncThunk(
  "auth/signin-staff",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(loginEmployeeAPI, credentials);
      const data = response.data;
      if (!data || !data._id) {
        throw new Error("Invalid API response");
      }
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    data: { name: string; email: string; password: string; phone: string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.post(signUpAPI, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.mess);
    }
  }
);

export const signUpStaff = createAsyncThunk(
  "auth/signUpstaff",
  async (
    data: { name: string; email: string; password: string; phone: string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.post(signupEmployeeAPI, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.mess);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post(logoutAPI);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(meAPI);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  }
);

export const getAllUser = createAsyncThunk(
  "auth/allUser",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(getAllUserAPI);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  }
);

export const getAllEmployee = createAsyncThunk(
  "auth/allEmployee",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(getAllEmployeeAPI);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.post(deleteUserAPI(id));
      return { id, message: res.data.message };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "auth/deleteEmployee",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.post(deleteEmployeeAPI(id));
      return { id, message: res.data.message };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete employee"
      );
    }
  }
);

const authsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // login staff
      .addCase(loginStaff.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginStaff.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginStaff.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // signup user
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // signup staff
    builder
      .addCase(signUpStaff.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
        state.isLoading = false;
      })
      .addCase(signUpStaff.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        localStorage.removeItem("user");
      })

      // fetch current user
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      // get all users
      .addCase(getAllUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
      })

      // get all employees
      .addCase(
        getAllEmployee.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.staff = action.payload;
          state.isLoading = false;
          state.isAuthenticated = true;
        }
      )

      // delete user
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<{ id: string; message: string }>) => {
          state.users = state.users.filter((u) => u._id !== action.payload.id);
          state.mess = action.payload.message;
          state.isLoading = false;
        }
      )

      // delete employee
      .addCase(
        deleteEmployee.fulfilled,
        (state, action: PayloadAction<{ id: string; message: string }>) => {
          state.staff = state.staff.filter((u) => u._id !== action.payload.id);
          state.mess = action.payload.message;
          state.isLoading = false;
        }
      );
  },
});

export const { setUser, clearUser } = authsSlice.actions;
export default authsSlice.reducer;

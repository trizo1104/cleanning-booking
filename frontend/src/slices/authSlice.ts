import {
  loginAPI,
  loginEmployeeAPI,
  logoutAPI,
  signUpAPI,
} from "@/app/Api/authAPI";
import axiosInstance from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return thunkAPI.rejectWithValue("No user found");
  }
);

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
  async (data: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(signUpAPI, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
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
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch user");
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
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    });

    // login-staff
    builder.addCase(loginStaff.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      loginStaff.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(
      loginStaff.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      }
    );
    //signup
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //logout
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    });

    builder.addCase(
      logoutUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      }
    );

    //loadUserFromStorage
    builder.addCase(
      loadUserFromStorage.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    );

    builder.addCase(loadUserFromStorage.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });

    //me
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });

    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setUser, clearUser } = authsSlice.actions;
export default authsSlice.reducer;

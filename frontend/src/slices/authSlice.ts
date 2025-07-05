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
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  mess: string;
}

const initialState: AuthState = {
  user: null,
  users: [],
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
      return res.data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "auth/deleteEmployee",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.post(deleteEmployeeAPI(id));
      return res.data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
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

    builder.addCase(signUpStaff.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUpStaff.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(
      signUpStaff.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    //logout
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("user");
    });

    builder.addCase(
      logoutUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      }
    );

    //get all user
    builder.addCase(getAllUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getAllUser.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(getAllUser.rejected, (state) => {
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    });

    //get all employee
    builder.addCase(getAllEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getAllEmployee.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(getAllEmployee.rejected, (state) => {
      state.user = null;
      state.isLoading = false;
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

    //delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      deleteUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.mess = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      deleteUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    //delete employee
    builder.addCase(deleteEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      deleteEmployee.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.mess = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      deleteEmployee.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { setUser, clearUser } = authsSlice.actions;
export default authsSlice.reducer;

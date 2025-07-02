import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import {
  addStaffNoteAPI,
  AssBookingsgAPI,
  getBookingsByDateAPi,
  updateBookingStatusAPI,
} from "@/app/Api/employee";

interface IEmployee {
  assBookings: IAssignBookings[];
  pendingBookings: IAssignBookings[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IEmployee = {
  assBookings: [],
  pendingBookings: [],
  isLoading: false,
  error: null,
};

export const getAssBookings = createAsyncThunk(
  "employee/getAssBookings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(AssBookingsgAPI);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getPendingBookings = createAsyncThunk(
  "employee/getPendingBookings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/booking/pending");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  "employee/updateBookingStatus",
  async (payload: { id: string; status: string }, thunkAPI) => {
    try {
      await axiosInstance.post(
        updateBookingStatusAPI(payload.id),
        payload.status
      );
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getBookingsByDate = createAsyncThunk(
  "employee/getBookingsByDate",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(getBookingsByDateAPi);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const addStaffNote = createAsyncThunk(
  "employee/addStaffNote",
  async (payload: { id: string; note: string }, thunkAPI) => {
    try {
      await axiosInstance.post(addStaffNoteAPI(payload.id), payload.note);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const acceptBooking = createAsyncThunk(
  "employee/acceptBooking",
  async (params: any, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `/booking/${params.bookingId}/assign`,
        {
          employeeId: params?.employeeId,
        }
      );

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //  Get Assigned Bookings
      .addCase(getAssBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAssBookings.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.assBookings = action.payload;
        }
      )
      .addCase(getAssBookings.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //  Update Booking Status
      .addCase(updateBookingStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state) => {
        state.isLoading = false;
        // Optional: update status in state.assBookings if needed
      })
      .addCase(
        updateBookingStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      //  Get Bookings by Date
      .addCase(getBookingsByDate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getBookingsByDate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.assBookings = action.payload;
        }
      )
      .addCase(
        getBookingsByDate.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      //  Add Staff Note
      .addCase(addStaffNote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addStaffNote.fulfilled, (state) => {
        state.isLoading = false;
        // Optional: update note in state if needed
      })
      .addCase(addStaffNote.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // get Pending
      .addCase(getPendingBookings.fulfilled, (state, action) => {
        state.pendingBookings = action.payload;
      })
      .addCase(acceptBooking.fulfilled, (state, action) => {
        state.pendingBookings = state.pendingBookings.filter((booking) => booking._id !== action.payload.booking._id)
      })
  },
});

export default EmployeeSlice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import {
  addStaffNoteAPI,
  AssBookingsgAPI,
  getBookingsByDateAPi,
  updateBookingStatusAPI,
} from "@/app/Api/employee";
import { CancelAssAPI } from "@/app/Api/booking";

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
    console.log("Updating booking status:", payload);
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
export const cancelAssignedBooking = createAsyncThunk(
  "employee/cancelAssignedBooking",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.post(CancelAssAPI(id));
      return { id, message: res.data.message };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to cancel booking"
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
  reducers: {
    // Action để clear state khi cần
    clearEmployeeState: (state) => {
      state.assBookings = [];
      state.pendingBookings = [];
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // ✅ Get Assigned Bookings
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

      // ✅ Get Pending Bookings
      .addCase(getPendingBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getPendingBookings.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.pendingBookings = action.payload;
        }
      )
      .addCase(
        getPendingBookings.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      // ✅ Accept Booking → remove from pending, add to assigned
      .addCase(acceptBooking.fulfilled, (state, action: PayloadAction<any>) => {
        const updatedBooking = action.payload.booking;
        state.pendingBookings = state.pendingBookings.filter(
          (booking) => booking._id !== updatedBooking._id
        );
        state.assBookings.push(updatedBooking);
      })

      // ✅ Update Booking Status (e.g. mark done)
      .addCase(updateBookingStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action: any) => {
        state.isLoading = false;
        const { id, status } = action.meta.arg;

        const index = state.assBookings.findIndex((b) => b._id === id);
        if (index !== -1) {
          state.assBookings[index].status = status;
        }
      })
      .addCase(
        updateBookingStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      // ✅ Add Staff Note
      .addCase(addStaffNote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addStaffNote.fulfilled, (state, action: any) => {
        state.isLoading = false;
        const { id, note } = action.meta.arg;

        const index = state.assBookings.findIndex((b) => b._id === id);
        if (index !== -1) {
          state.assBookings[index].note = note;
        }
      })
      .addCase(addStaffNote.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ✅ Get bookings by date → override assBookings
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

      // ✅ Cancel Assigned Booking
      .addCase(cancelAssignedBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelAssignedBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.meta.arg;

        // Remove the cancelled booking from assBookings
        state.assBookings = state.assBookings.filter((b) => b._id !== id);

        // Note: Component should dispatch getAssBookings() after this action
        // to reload fresh data from server
      })
      .addCase(
        cancelAssignedBooking.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearEmployeeState } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import {
  createBookingAPI,
  deleteReviewAPI,
  getAllReviewAdmin,
  getReviewAPI,
  reviewBookingAPI,
} from "@/app/Api/booking";

interface IbookingState {
  bookings: IBooking[];
  mess: string;
  review: IGetReview[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IbookingState = {
  bookings: [],
  mess: "",
  review: [],
  isLoading: false,
  error: null,
};

export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/booking/all");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (data : any, thunkAPI) => {
    try {
      const res = await axiosInstance.post(createBookingAPI, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const reviewBooking = createAsyncThunk(
  "booking/reviewBooking",
  async (payload: { id: string; data: IReivew }, thunkAPI) => {
    try {
      await axiosInstance.post(reviewBookingAPI(payload.id), payload.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getAllReview = createAsyncThunk(
  "booking/getReview",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(getReviewAPI(id));
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getAllReviewForAdmin = createAsyncThunk(
  "booking/getReviewAdmin",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(getAllReviewAdmin);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "booking/deleteReview",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.post(deleteReviewAPI(id));
      return res.data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const assignStaff = createAsyncThunk(
  "booking/assignStaff",
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

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(createBooking.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(reviewBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reviewBooking.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.mess = action.payload;
      })
      .addCase(reviewBooking.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getAllReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAllReview.fulfilled,
        (state, action: PayloadAction<IGetReview[]>) => {
          state.isLoading = false;
          state.review = action.payload;
        }
      )
      .addCase(getAllReview.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getAllReviewForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAllReviewForAdmin.fulfilled,
        (state, action: PayloadAction<IGetReview[]>) => {
          state.isLoading = false;
          state.review = action.payload;
        }
      )
      .addCase(
        getAllReviewForAdmin.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.mess = action.payload;
      })

      .addCase(deleteReview.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // AssignStaff
      .addCase(assignStaff.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action.payload.booking);

        const targetBooking = state.bookings.find(
          (booking) => booking._id === action.payload.booking._id
        );

        if (targetBooking) {
          targetBooking.status = "assigned";
        }
      })

      .addCase(
        getAllBookings.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log(action.payload);
          state.bookings = action.payload;
        }
      );
  },
});

export default bookingSlice.reducer;

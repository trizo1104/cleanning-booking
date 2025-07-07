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
  getBookings: IGetBooking[];
  mess: string;
  review: IGetReview[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IbookingState = {
  bookings: [],
  getBookings: [],
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

export const getMyBookings = createAsyncThunk(
  "booking/getMyBookings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/booking/my-bookings");
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

  async (data: IBookingPayload, thunkAPI) => {

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

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (bookingId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/booking/cancel/${bookingId}`);
      return response.data.booking;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Lỗi hủy booking"
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

        // Xoá review khỏi danh sách
        state.review = state.review.filter((r) => r._id !== action.payload);
      })

      .addCase(deleteReview.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(assignStaff.fulfilled, (state, action: PayloadAction<any>) => {
        const updated = action.payload.booking;

        const index = state.bookings.findIndex((b) => b._id === updated._id);
        if (index !== -1) {
          state.bookings[index] = {
            ...state.bookings[index],
            ...updated,
          };
        } else {
          state.bookings.push(updated);
        }
      })

      .addCase(
        getAllBookings.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.bookings = action.payload;
        }
      )

      .addCase(getMyBookings.fulfilled, (state, action: PayloadAction<any>) => {
        state.getBookings = action.payload;
      })

      // Cancel booking
      .addCase(
        cancelBooking.fulfilled,
        (state, action: PayloadAction<IGetBooking>) => {
          const updatedBooking = action.payload;
          const index = state.getBookings.findIndex(
            (b) => b._id === updatedBooking._id
          );

          if (index !== -1) {
            state.getBookings[index] = updatedBooking;
          }
        }
      )

      .addCase(cancelBooking.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import {
  createBookingAPI,
  getReviewAPI,
  reviewBookingAPI,
} from "@/app/Api/booking";

interface IbookingState {
  booking: IBooking[];
  mess: string;
  review: IGetReview[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IbookingState = {
  booking: [],
  mess: "",
  review: [],
  isLoading: false,
  error: null,
};

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (data: IBooking, thunkAPI) => {
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
      });
  },
});

export default bookingSlice.reducer;

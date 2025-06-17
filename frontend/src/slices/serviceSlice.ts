import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import { getAllServiceAPI, getDetailServiceAPI } from "@/app/Api/serviceAPI";

interface ServicesState {
  services: Service[];
  service: Service | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  service: null,
  isLoading: false,
  error: null,
};

export const getAllService = createAsyncThunk(
  "service/getAllService",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(getAllServiceAPI);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.mess || "Get service failled"
      );
    }
  }
);

export const getDetailService = createAsyncThunk(
  "service/getDetailService",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(getDetailServiceAPI(id));
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.mess || "Get service failed"
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getService
    builder
      .addCase(getAllService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        getAllService.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.services = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getAllService.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //getDetailService
    builder
      .addCase(getDetailService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        getDetailService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.service = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        getDetailService.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default serviceSlice.reducer;

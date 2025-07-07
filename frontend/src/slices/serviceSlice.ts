/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import {
  addNewserviceAPi,
  deleteServiceAPI,
  getAllServiceAPI,
  getDetailServiceAPI,
  udapteServiceAPI,
} from "@/app/Api/serviceAPI";

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

export const addNewService = createAsyncThunk(
  "service/addNewService",
  async (serviceData: ServiceFormData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(addNewserviceAPi, serviceData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.mess || "Add service failed"
      );
    }
  }
);

export const UpdateService = createAsyncThunk(
  "service/updateService",
  async (
    data: {
      serviceData: ServiceFormData;
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.post(
        udapteServiceAPI(data.id),
        data.serviceData
      );
      return res.data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Get service failed"
      );
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosInstance.post(deleteServiceAPI(id));
      return res.data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Get service failed"
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
        }
      )
      .addCase(getAllService.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get Detail
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
        }
      )
      .addCase(
        getDetailService.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );

    // Add New
    builder
      .addCase(addNewService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addNewService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.services.push(action.payload);
          state.isLoading = false;
        }
      )
      .addCase(addNewService.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update
    builder
      .addCase(UpdateService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        UpdateService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          const updated = action.payload;
          const index = state.services.findIndex((s) => s._id === updated._id);
          if (index !== -1) state.services[index] = updated;
          state.isLoading = false;
        }
      )
      .addCase(UpdateService.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteService.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.services = state.services.filter(
            (s) => s._id !== action.payload.id
          );
          state.isLoading = false;
        }
      )
      .addCase(deleteService.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;

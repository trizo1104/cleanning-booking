import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import { getAllProduct, getAllProductService } from "@/app/Api/productAPI";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk(
  "product/getAllProduct",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(getAllProduct);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductsService = createAsyncThunk(
  "product/getProductService",
  async (serviceId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(getAllProductService(serviceId));
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        fetchAllProducts.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(fetchProductsService.pending, (state) => {
        state.error = null;
      })
      .addCase(
        fetchProductsService.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
        }
      )
      .addCase(
        fetchProductsService.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default productSlice.reducer;

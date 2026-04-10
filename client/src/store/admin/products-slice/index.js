import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

const API_URL = import.meta.env.VITE_API_URL;

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = axios.post(`${API_URL}/api/admin/products/add`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result?.data;
  },
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (formData) => {
    const result = axios.get(`${API_URL}/api/admin/products/get`, formData);

    return result?.data;
  },
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = axios.put(
      `${API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return result?.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = axios.delete(
      `${API_URL}/api/admin/products/delete/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return result?.data;
  },
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;

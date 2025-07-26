import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, filters = {} }, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("limit", 12);

      if (filters.brand) params.set("brand", filters.brand);
      if (filters.price) params.set("rentalPrice", filters.price);
      if (filters.mileageFrom) params.set("minMileage", filters.mileageFrom);
      if (filters.mileageTo) params.set("maxMileage", filters.mileageTo);

      const response = await axios.get(
        `https://car-rental-api.goit.global/cars?${params.toString()}`
      );

      return {
        cars: response.data.cars || response.data,
        page,
        totalPages: response.data.totalPages || 3,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    favorites: [],
    filters: {},
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
      state.items = [];
      state.page = 1;
    },
    resetCars(state) {
      state.items = [];
      state.page = 1;
    },
    addToFavorites(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.page === 1) {
          state.items = action.payload.cars;
        } else {
          state.items = [...state.items, ...action.payload.cars];
        }
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default carsSlice.reducer;

export const { addToFavorites, removeFromFavorites, setFilters, resetCars } =
  carsSlice.actions;

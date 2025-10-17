import { createSlice } from "@reduxjs/toolkit";
import { getServices, addService } from "../api/services";

const servicesStore = createSlice({
  name: "servicesStore",
  initialState: {
    services: [],
    isServiceAdded: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services = action.payload;
    });
    builder.addCase(addService.pending, (state) => {
      state.isServiceAdded = false;
    });
    builder.addCase(addService.fulfilled, (state) => {
      state.isServiceAdded = true;
    });
  },
});

export default servicesStore.reducer;

import { createSlice } from "@reduxjs/toolkit";
import sendClient from "../api/clients";

const clientStore = createSlice({
  name: "clienStore",
  initialState: {
    isClientAdded: false,
  },
  extraReducers: (builder) => {
    builder.addCase(sendClient.pending, (state) => {
      state.isClientAdded = false;
    });
    builder.addCase(sendClient.fulfilled, (state) => {
      state.isClientAdded = true;
    });
  },
});

export default clientStore.reducer;

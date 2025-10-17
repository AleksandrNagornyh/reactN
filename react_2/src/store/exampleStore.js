import { createSlice } from "@reduxjs/toolkit";
import { getExamples, addExample } from "../api/examples";

const exampleStore = createSlice({
  name: "exampleStore",
  initialState: {
    examples: [],
    isExampleAdded: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getExamples.fulfilled, (state, action) => {
      state.examples = action.payload;
    });
    builder.addCase(addExample.pending, (state) => {
      state.isExampleAdded = false;
    });
    builder.addCase(addExample.fulfilled, (state) => {
      state.isExampleAdded = true;
    });
  },
});

export default exampleStore.reducer;

import { createSlice } from "@reduxjs/toolkit";
import subscribe from "../api/subscribers";

const subscriberStore = createSlice({
  name: "clienStore",
  initialState: {
    isSubscriberAdded: false,
  },
  extraReducers: (builder) => {
    builder.addCase(subscribe.pending, (state) => {
      state.isSubscriberAdded = false;
    });
    builder.addCase(subscribe.fulfilled, (state) => {
      state.isSubscriberAdded = true;
    });
  },
});

export default subscriberStore.reducer;

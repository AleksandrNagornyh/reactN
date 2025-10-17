import { createAsyncThunk } from "@reduxjs/toolkit";

const subscribe = createAsyncThunk(
  "subscribers/subscribe",
  async (subscriber) => {
    await fetch("/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: subscriber}),
    });
  }
);

export default subscribe;
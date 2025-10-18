import { createAsyncThunk } from "@reduxjs/toolkit";

const sendClient = createAsyncThunk(
  "clients/sendClient",
  async (client) => {
    await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });
  }
);

export default sendClient;
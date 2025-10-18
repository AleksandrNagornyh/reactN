import { createAsyncThunk } from "@reduxjs/toolkit";

const getServices = createAsyncThunk(
  "services/getServices",
  async () => {
    const response = await fetch(`/api/services`);
    if (!response.ok) throw new Error(response.statusText);
    const services = await response.json();
    return services;
  },
);

const addService = createAsyncThunk(
  "services/addService",
  async (service) => {
    const response =  await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
    });
    if (!response.ok) throw new Error(response.statusText);
  }
);

export { addService, getServices }
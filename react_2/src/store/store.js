import { configureStore } from "@reduxjs/toolkit";
import servicesStore from "./servicesStore";
import exampleStore from "./exampleStore";
import blogStore from "./blogStore";
import clientStore from "./clientStore";
import subscriberStore from "./subscriberStore";

const store = configureStore({
  reducer: {
    services: servicesStore,
    examples: exampleStore,
    blogs: blogStore,
    clients: clientStore,
    subscribers: subscriberStore
  }
});

export default store;
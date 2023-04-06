import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import authReducer from "redux/slices/auth";
import interviewReducer from "redux/slices/interview";

const baseURL = "https://interviewtime-be-production-bebc.up.railway.app";
// const baseURL = "http://localhost:8009";

export const authAPI = axios.create({
  baseURL: baseURL + "/auth/",
});

export const interviewAPI = axios.create({
  baseURL: baseURL + "/interview/",
  headers: {
    Authorization: `Bearer ${
      typeof window !== "undefined" ? localStorage.getItem("token") : false
    }`,
    "Content-Type": "application/json",
    Host: "interviewtime-be-production-bebc.up.railway.app",
    // Host: "localhost:8009",
    Accept: "*/*",
    Connection: "keep-alive",
    "Accept-Encoding": "gzip, deflate, br",
  },
  timeout: 10_000,
});

export const feedbackAPI = axios.create({
  baseURL: baseURL + "/feedback/",
  headers: {
    Authorization: `Bearer ${
      typeof window !== "undefined" ? localStorage.getItem("token") : false
    }`,
  },
});

const makeStore = () =>
  configureStore({
    reducer: { auth: authReducer, interview: interviewReducer },
  });

type AppStore = ReturnType<typeof makeStore>;

const wrapper = createWrapper<AppStore>(makeStore);
export default wrapper;

import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import userReducer from "redux/slices/user";
import authReducer from "redux/slices/auth";
import feedbackReducer from "redux/slices/feedback";
import interviewReducer from "redux/slices/interview";

type route = {
  host: string;
  http: string;
  fullUrl: string;
};

const production: route = {
  host: "interviewtime-be-production-bebc.up.railway.app",
  http: "https://",
  fullUrl: "https://interviewtime-be-production-bebc.up.railway.app",
};

const development: route = {
  host: "localhost:8009",
  http: "http://",
  fullUrl: "http://localhost:8009",
};

//When Switching enviroments change this variable.
const currentRoute = production;
// process.env.NODE_ENV === "development" ? development : production;

const headers = {
  Authorization: `Bearer ${
    typeof window !== "undefined" && localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")!).token
      : ""
  }`,
  "Content-Type": "application/json",
  // Host: currentRoute.host,
  Accept: "*/*",
  // Connection: "keep-alive",
  // "Accept-Encoding": "gzip, deflate, br",
};

export const authAPI = axios.create({
  baseURL: currentRoute.fullUrl + "/auth/",
});

export const interviewAPI = axios.create({
  baseURL: currentRoute.fullUrl + "/interview/",
  headers: headers,
  timeout: 10_000,
  withCredentials: true,
});

export const feedbackAPI = axios.create({
  baseURL: currentRoute.fullUrl + "/feedback/",
  headers: headers,
  timeout: 10_000,
  withCredentials: true,
});

export const userAPI = axios.create({
  baseURL: currentRoute.fullUrl + "/user/",
  headers: headers,
  timeout: 10_000,
  withCredentials: true,
});

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      interview: interviewReducer,
      user: userReducer,
      feedback: feedbackReducer,
    },
  });

type AppStore = ReturnType<typeof makeStore>;

const wrapper = createWrapper<AppStore>(makeStore);
export default wrapper;

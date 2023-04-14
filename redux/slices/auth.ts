import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useSelector, useDispatch } from "react-redux";

import { authAPI } from "redux/index";

type TauthState = {
  token: string;
  isAuthenticated: boolean;
  isLoadingData: boolean;
};

const initialState: TauthState = {
  token: "",
  isAuthenticated: false,
  isLoadingData: false,
};

type AuthState = typeof initialState;

export const useAuthState = () => {
  return useSelector<any>((state) => state.auth) as AuthState;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoadingData = false;
    },
    logout(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
    setOnLoading(state) {
      state.isLoadingData = true;
    },
    setOffLoading(state) {
      state.isLoadingData = false;
    },
    loadInitialAuthState(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

const actions = authSlice.actions;

type Dispath = ReturnType<typeof useDispatch>;

function login(values: { email: string; password: string }) {
  return async (dispatch: Dispath) => {
    try {
      const res = await authAPI.post(
        "login/",
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );

      const token = res.data.token;
      const isAuthenticated = true;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token,
          isAuthenticated,
          isLoadingData: false,
        })
      );

      dispatch(
        actions.login({
          token,
          redirect_to: "/calendar",
        })
      );
    } catch (e) {
      throw e;
    }
  };
}

export function logout() {
  return async (dispatch: Dispath) => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_authenticated");

    dispatch(actions.logout());
  };
}

export function signup(values: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}) {
  return async (dispatch: Dispath) => {
    try {
      const res = await authAPI.post("signup/", {
        ...values,
        timeZone: "Africa/Cairo",
      });
    } catch (e) {
      throw e;
    }
  };
}

export const authActions = {
  login,
  logout,
  signup,
  setOnLoadingScreen: actions.setOnLoading,
  setOffLoadingScreen: actions.setOffLoading,
  loadInitialAuthState: actions.loadInitialAuthState,
};

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useSelector, useDispatch } from "react-redux";

import { authAPI } from "redux/index";

const initialState = {
  email: "",
  tokens: { access: "", refresh: "" },
  redirect_to: "",
  is_authenticated: false,
  is_loading_auth_data: true,
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
      state.redirect_to = action.payload.redirect_to;
      state.tokens = action.payload.tokens;
      state.is_authenticated = true;
    },
    logout(state) {
      state.redirect_to = "";
      state.tokens = {
        access: "",
        refresh: "",
      };
      state.is_authenticated = false;
    },
    loadInitialAuthState(state, action) {
      state.redirect_to = "";
      state.tokens = action.payload.tokens;
      state.is_authenticated = action.payload.is_authenticated;
      state.is_loading_auth_data = false;
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

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("is_authenticated", JSON.stringify(true));

      dispatch(actions.login({ token, redirect_to: "/calendar" }));
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

export const authActions = {
  login,
  logout,
  loadInitialAuthState: actions.loadInitialAuthState,
};

export default authSlice.reducer;

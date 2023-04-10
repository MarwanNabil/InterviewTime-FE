import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useSelector, useDispatch } from "react-redux";

import { authAPI } from "redux/index";

type TauthState = {
  token: {
    access: string;
    refresh: string;
  };
  isAuthenticated: boolean;
  isLoadingAuthData: boolean;
};

const initialState: TauthState = {
  token: {
    access: "",
    refresh: "",
  },
  isAuthenticated: false,
  isLoadingAuthData: true,
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
    },
    logout(state) {
      state.token = {
        access: "",
        refresh: "",
      };
      state.isAuthenticated = false;
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

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));

      dispatch(
        actions.login({
          token: { access: token, refresh: "" },
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

export const authActions = {
  login,
  logout,
  loadInitialAuthState: actions.loadInitialAuthState,
};

export default authSlice.reducer;

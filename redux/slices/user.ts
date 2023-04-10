import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useSelector, useDispatch } from "react-redux";

import { userAPI } from "redux/index";

//Hooks
import useLocalStorage from "@helpers/hooks/use-local-storage";

type TuserState = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  timeZone: string;
};

const initialState: TuserState = {
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  timeZone: "",
};

type userState = typeof initialState;

export const useUserState = () => {
  return useSelector<any>((state) => state.user) as userState;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    load(state, action) {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.timeZone = action.payload.timeZone;
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

const actions = userSlice.actions;

type Dispath = ReturnType<typeof useDispatch>;

function loadIntial() {
  return async (dispatch: Dispath) => {
    try {
      const res = await userAPI.get("");

      let data = res.data;
      data.email = data._id;

      dispatch(actions.load(data));
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (e) {
      throw e;
    }
  };
}

export const userActions = {
  loadIntial,
  load: actions.load,
};

export default userSlice.reducer;

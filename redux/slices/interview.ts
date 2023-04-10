import useLocalStorage from "@helpers/hooks/use-local-storage";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useSelector, useDispatch } from "react-redux";

import { interviewAPI } from "redux/index";

//Helpers
import { IInterviewData } from "@helpers/Interview/index";

interface IinterviewState {
  interviewsLoadedDate: String;
  interviewsCounts: Number;
  interviews: IInterviewData[];
}

const initialState: IinterviewState = {
  interviewsLoadedDate: "",
  interviewsCounts: 0,
  interviews: [],
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    load(state, action) {
      state.interviewsCounts += action.payload.interviewsCount;
      state.interviews = [...state.interviews, action.payload.interviews];
      state.interviewsLoadedDate = action.payload.interviewsLoadedDate;
    },
    post(state, action) {},
    delete(state, action) {},
  },
});

const actions = interviewSlice.actions;

type Dispath = ReturnType<typeof useDispatch>;

function list() {
  return async (dispatch: Dispath) => {
    try {
      const res = await interviewAPI.get("");
      const data = res.data;
      const currentDate = new Date();

      dispatch(actions.load(data));

      localStorage.setItem(
        "interviewsCount",
        JSON.stringify(data.interviewsCount)
      );
      localStorage.setItem("interviews", JSON.stringify(data.interviews));
      localStorage.setItem(
        "interviewsLoadedDate",
        JSON.stringify(currentDate.getTime())
      );
    } catch (err) {
      throw err;
    }
  };
}

function scheduleInterview(values: { startDate: Date; interviewType: Number }) {
  return async (dispatch: Dispath) => {
    try {
      const res = await interviewAPI.post("", {
        start: values.startDate.toISOString(),
        interviewType: values.interviewType,
      });
      const data = res.data;
    } catch (err) {
      throw err;
    }
  };
}

export const interviewActions = {
  list,
  load: actions.load,
  post: scheduleInterview,
};

export default interviewSlice.reducer;

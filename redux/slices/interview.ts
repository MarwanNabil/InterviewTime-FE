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
  worldInterviewsDate: String;
  worldInterviewsCounts: Number;
  worldInterviews: IInterviewData[];
}

const initialState: IinterviewState = {
  interviewsLoadedDate: "",
  interviewsCounts: 0,
  interviews: [],
  worldInterviewsDate: "",
  worldInterviewsCounts: 0,
  worldInterviews: [],
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    load(state, action) {
      state.interviewsCounts += action.payload.interviewsCount;
      state.interviews = [action.payload.interviews];
      state.interviewsLoadedDate = new Date().toISOString();
    },
    loadTodayWorldInterviews(state, action) {
      state.worldInterviewsDate = new Date().toISOString();
      state.worldInterviewsCounts = action.payload.worldInterviewsCounts;
      state.worldInterviews = [action.payload.worldInterviews];
    },
  },
});

const actions = interviewSlice.actions;

type Dispath = ReturnType<typeof useDispatch>;

function list() {
  return async (dispatch: Dispath) => {
    try {
      const res = await interviewAPI.get("");
      const data = res.data;
      const loadedDate = new Date().getTime();

      const finalObj = { ...data, interviewsLoadedDate: loadedDate };

      dispatch(actions.load(finalObj));

      localStorage.setItem("interview", JSON.stringify(finalObj));
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

function requestTodayWorldInterviews() {
  return async (dispatch: Dispath) => {
    try {
      const res = await interviewAPI.get("today");
      const data = res.data;

      dispatch(actions.loadTodayWorldInterviews(data));

      localStorage.setItem(
        "worldInterviews",
        JSON.stringify({ worldInterviewsDate: new Date(), ...data })
      );
    } catch (err) {
      throw err;
    }
  };
}

function deleteInterview(values: { interviewId: string }) {
  return async (dispatch: Dispath) => {
    try {
      const res = await interviewAPI.delete("", {
        data: {
          interviewId: values.interviewId.toString(),
        },
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
  requestTodayWorldInterviews,
  deleteInterview,
};

export default interviewSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useSelector, useDispatch } from "react-redux";

import { interviewAPI } from "redux/index";

const initialState = {
  interviewsCounts: Number,
  interviews: Array<{
    id: string;
    startTime: Date;
    eventId: string;
    interviewType: number;
    interviewStatus: number;
    hangoutLink: string;
    attendees: Array<{ email: string; role: number }>;
  }>,
};

type InterviewState = typeof initialState;

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    list(state, action) {
      state.interviewsCounts = action.payload.interviewsCount;
      state.interviews = action.payload.interviews;
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
      const res = await interviewAPI.get("", { withCredentials: true });
      const data = res.data;

      dispatch(actions.list(data));
    } catch (err) {
      throw err;
    }
  };
}

export const interviewActions = {
  list,
};

export default interviewSlice.reducer;

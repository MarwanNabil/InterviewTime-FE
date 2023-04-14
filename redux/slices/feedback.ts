import { HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

//Helpers
import { ReactionE, feedbackStatusE, interviewTypeE } from "@helpers/Interview";

//EndPoints
import { feedbackAPI } from "redux/index";

type TfeedbackState = {
  feedbacksCount: number;
  feedbacks: Array<{
    _id: string;
    interviewId: string;
    title: string;
    details: string;
    overallScore: ReactionE;
    status: feedbackStatusE;
    interviewType: interviewTypeE;
    startTime: string;
    //Technically in the front end you will not make use of targetUsername
    targetUsername: string;
  }>;
};

const initialState: TfeedbackState = {
  feedbacksCount: 0,
  feedbacks: [],
};

type FeedbackState = typeof initialState;

export const useFeedbackState = () => {
  return useSelector<any>((state) => state.feedback) as FeedbackState;
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    load(state, action) {
      state.feedbacksCount = action.payload.feedbacksCount;
      state.feedbacks = action.payload.feedbacks;
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

const actions = feedbackSlice.actions;

type Dispath = ReturnType<typeof useDispatch>;

function requestMyFeedbacks() {
  return async (dispatch: Dispath) => {
    try {
      const res = await feedbackAPI.get("");

      const data: TfeedbackState = res.data;

      localStorage.setItem("feedback", JSON.stringify(data));

      dispatch(actions.load(data));
    } catch (e) {
      throw e;
    }
  };
}

function postFeedback(values: {
  interviewId: string;
  title: string;
  details: string;
  overallScore: ReactionE;
}) {
  return async (dispatch: Dispath) => {
    try {
      const res = await feedbackAPI.post("", {
        interviewId: values.interviewId,
        title: values.title,
        details: values.details,
        overallScore: values.overallScore,
      });
    } catch (e) {
      throw e;
    }
  };
}

function postStatusFeedback(values: {
  feedbackId: string;
  status: feedbackStatusE;
}) {
  return async (dispatch: Dispath) => {
    try {
      const res = await feedbackAPI.post("/status", {
        feedbackId: values.feedbackId,
        status: values.status,
      });
    } catch (e) {
      throw e;
    }
  };
}

export const feedbackActions = {
  requestMyFeedbacks,
  postFeedback,
  postStatusFeedback,
  loadInStoreFeedbacks: actions.load,
};

export default feedbackSlice.reducer;

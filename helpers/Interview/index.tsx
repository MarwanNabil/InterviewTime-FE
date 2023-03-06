import { ReactionE, getReactionComponent } from "./Feedback/FeedbackRating";

export interface InterviewTypeI {
    code: string;
    name: string;
}

const NA: InterviewTypeI = { name: "None", code: "NA" };
const DB: InterviewTypeI = { name: "Database Design", code: "DB" };
const OOD: InterviewTypeI = { name: "Low Level System Design", code: "OOD" };
const PS: InterviewTypeI = { name: "Problem Solving", code: "PS" };
const HR: InterviewTypeI = { name: "Behavioral", code: "HR" };
const Architecture: InterviewTypeI = {
    name: "High Level System Design",
    code: "Architecture",
};


const InterviewTypesArray: Array<InterviewTypeI> = [];
InterviewTypesArray.push(NA);
InterviewTypesArray.push(DB);
InterviewTypesArray.push(OOD);
InterviewTypesArray.push(PS);
InterviewTypesArray.push(HR);
InterviewTypesArray.push(Architecture);

export interface InterviewFeedbackI {
    id: string;
    date: Date;
    interviewType: InterviewTypeI;
    feedbackTitle: string;
    detailedFeedback: string;
    overallRating: ReactionE;
}


interface InterviewTimeI {
    id: string;
    time: string;
    status: "success" | "error";
}

const dummyInterviewsTimes: Array<InterviewTimeI> = [
    {
        id: "0",
        time: "09:00 AM",
        status: "success",
    },
    {
        id: "1",
        time: "10:00 AM",
        status: "error",
    },
    {
        id: "0",
        time: "11:00 AM",
        status: "error",
    },
    {
        id: "0",
        time: "12:00 AM",
        status: "success",
    },
    {
        id: "0",
        time: "12:00 AM",
        status: "success",
    },
    {
        id: "0",
        time: "12:00 AM",
        status: "success",
    },
    {
        id: "0",
        time: "12:00 AM",
        status: "success",
    },
    {
        id: "0",
        time: "12:00 AM",
        status: "success",
    },
    {
        id: "0",
        time: "12:00 AM",
        status: "success",
    },
    {
        id: "0",
        time: "12:00 AM",
        status: "success",
    },
    {
        id: "0",
        time: "12:00 AM",
        status: "success",
    },
];

export {
    NA, DB, OOD, PS, HR, Architecture, InterviewTypesArray, ReactionE, getReactionComponent, dummyInterviewsTimes,
};
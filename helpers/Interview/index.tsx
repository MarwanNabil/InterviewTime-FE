import { ReactionE, getReactionComponent } from "./Feedback/FeedbackRating";

export enum interviewTypeE {
    NA,
    DB,
    OOD,
    PS,
    HR,
    Architecture,
}

export enum interviewStatusE {
    waiting,
    removed,
    completed,
}

export interface IInterviewUI {
    code: string;
    name: string;
    color: {
        solid: string,
        weak: string
    }
}

export interface IInterviewData {
    eventId: String;
    hangoutLink: String;
    interviewStatus: interviewStatusE;
    interviewType: interviewTypeE;
    startTime: String;
    timeZone: String;
    attendees: [{ email: String, role: Number }]
}

const NA: IInterviewUI = {
    name: "None", code: "NA", color: {
        solid: '#9C9C9C',
        weak: '#C3C3C3'
    }
};

const DB: IInterviewUI = {
    name: "Database Design", code: "DB", color: {
        solid: '#0064FF',
        weak: '#C6DCFF'
    }
};

const OOD: IInterviewUI = {
    name: "Low Level System Design", code: "OOD", color: {
        solid: '#5100FE',
        weak: '#DFCFFF'
    }
};

const PS: IInterviewUI = {
    name: "Problem Solving", code: "PS", color: {
        solid: '#00A616',
        weak: '#ACFFB7'
    }
};

const HR: IInterviewUI = {
    name: "Behavioral", code: "HR", color: {
        solid: '#C700C4',
        weak: '#FFD3FE'
    }
};

const Architecture: IInterviewUI = {
    name: "High Level System Design",
    code: "Architecture",
    color: {
        solid: '#FF0000',
        weak: '#FFD4D4'
    }
};


const interviewUIArray: Array<IInterviewUI> = [];
interviewUIArray.push(NA);
interviewUIArray.push(DB);
interviewUIArray.push(OOD);
interviewUIArray.push(PS);
interviewUIArray.push(HR);
interviewUIArray.push(Architecture);

export interface InterviewFeedbackI {
    id: string;
    date: Date;
    interviewType: IInterviewUI;
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
        time: "09:00AM",
        status: "error",
    },
    {
        id: "1",
        time: "11:00AM",
        status: "error",
    },
    {
        id: "0",
        time: "01:00PM",
        status: "error",
    },
    {
        id: "0",
        time: "03:00PM",
        status: "success",
    },
    {
        id: "0",
        time: "05:00PM",
        status: "success",
    },
    {
        id: "0",
        time: "07:00PM",
        status: "success",
    },
    {
        id: "0",
        time: "09:00PM",
        status: "success",
    },
    {
        id: "0",
        time: "11:00PM",
        status: "success",
    },

];

export {
    NA, DB, OOD, PS, HR, Architecture, interviewUIArray, ReactionE, getReactionComponent, dummyInterviewsTimes,
};
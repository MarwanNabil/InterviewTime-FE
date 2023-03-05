interface InterviewTypesI {
  id: string;
  name: string;
}

const InterviewsTypesData: Array<InterviewTypesI> = [
  { id: "0", name: "None" },
  { id: "1", name: "Problem Solving (PS)" },
  { id: "2", name: "Low Level System Design (OOD)" },
  { id: "3", name: "Database Design (DB)" },
  { id: "4", name: "High Level System Design (Architecture)" },
  { id: "5", name: "Behavioral (HR)" },
];

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

export { InterviewsTypesData, dummyInterviewsTimes };

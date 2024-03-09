import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import UserDashboard from "./pages/UserDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import Classes from "./components/dashboard/Classes";
import Profile from "./components/dashboard/Profile";
import FlashCards from "./components/dashboard/FlashCards";
import SetSchedule from "./components/dashboard/SetSchedule";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoScreen from "./components/videoscreen/VideoScreen";

export const GlobalContext = createContext();
const userInitialValue = {
  fullName: "Rishikesh Bhakare",
  email: "",
  accountType: "Student",
  profilePicture: "",
  languages: [],
};

const router = createBrowserRouter([
  {
    path: "/userdashboard",
    element: <UserDashboard />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "flashcards",
        element: <FlashCards />,
      },
    ],
  },
  {
    path: "/tutordashboard",
    element: <TutorDashboard />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "setschedule",
        element: <SetSchedule />,
      },
    ],
  },
  {
    path: "/tutorlive/:id",
    element: <VideoScreen isStudent={false} />,
  },
  {
    path: "/studentlive/:id",
    element: <VideoScreen isStudent={true} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

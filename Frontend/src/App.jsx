import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserDashboard from "./pages/UserDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import Classes from "./components/dashboard/Classes";
import Profile from "./components/dashboard/Profile";
import FlashCards from "./components/dashboard/FlashCards";
import SetSchedule from "./components/dashboard/SetSchedule";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

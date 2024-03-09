import React, { Children, createContext, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import Classes from "./components/dashboard/Classes";
import Profile from "./components/dashboard/Profile";
import FlashCards from "./components/dashboard/FlashCards";
import SetSchedule from "./components/dashboard/SetSchedule";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TutorProfile from "./components/tutorProfile/TutorProfile";
import VideoScreen from "./components/videoscreen/VideoScreen";

export const GlobalContext = createContext();
const userInitialValue = {
  fullName: "",
  email: "",
  accountType: "",
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
  const [user, setUser] = useState(userInitialValue);
  return (
    <GlobalContext.Provider value={{ user }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userdashboard" element={<UserDashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="classes" element={<Classes />} />
            <Route path="flashcards" element={<FlashCards />} />
          </Route>
          <Route path="/tutordashboard" element={<TutorDashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="classes" element={<Classes />} />
            <Route path="setschedule" element={<SetSchedule />} />
          </Route>
          <Route path="/setschedule" element={<SetSchedule />} />
          <Route path="/tutorProfile" element={<TutorProfile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;

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

export const GlobalContext = createContext();
const userInitialValue = {
  fullName: "",
  email: "",
  accountType: "",
  profilePicture: "",
  languages: [],
};

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

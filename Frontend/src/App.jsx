import React, { Children, createContext, useEffect, useState } from "react";
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
import { Toaster } from "@/components/ui/toaster";

export const GlobalContext = createContext();
const userInitialValue = {
  fullName: "",
  email: "",
  accountType: "",
  profilePicture: "",
  languages: [],
};

const languages = [
  { value: "hindi", label: "Hindi" },
  { value: "bengali", label: "Bengali" },
  { value: "telugu", label: "Telugu" },
  { value: "marathi", label: "Marathi" },
  { value: "tamil", label: "Tamil" },
  { value: "urdu", label: "Urdu" },
  { value: "gujarati", label: "Gujarati" },
  { value: "kannada", label: "Kannada" },
  { value: "odia", label: "Odia" },
  { value: "punjabi", label: "Punjabi" },
  { value: "english", label: "English" },
];

function App() {
  const [user, setUser] = useState(userInitialValue);

  useEffect(() => {
    
  }, []);

  return (
    <GlobalContext.Provider value={{ user, languages, setUser }}>
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
        <Toaster />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;

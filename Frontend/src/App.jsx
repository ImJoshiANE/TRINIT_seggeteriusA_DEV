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
import HomePage from "./pages/HomePage";
import TutorProfile from "./components/tutorProfile/TutorProfile";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import VideoScreen from "./components/videoscreen/VideoScreen";

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

const isTutor = () => {
  userInitialValue.FlashCardsaccountType === "tutor";
};

function App() {
  const [user, setUser] = useState(userInitialValue);
  const { toast } = useToast();

  const checkLogin = async () => {
    try {
      const res = await axios.get(`api/users/isloggedIn`, {
        withCredentials: true,
      });

      if (res.data?.status === "success") {
        console.log(res);
        setUser({
          fullName: res.data.data.fullName,
          email: res.data.data.email,
          accountType: res.data.data.accountType,
          profilePicture: res.data.data.profilePicture,
          languages: res.data.data.languages,
        });
      } else if (res.data?.status === "error") {
        toast({
          description: "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message || error.response.data.error;
      toast({
        description: msg,
      });
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, languages, setUser }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={isTutor() ? <TutorDashboard /> : <UserDashboard />}
          >
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="classes" element={<Classes />} />
            <Route
              path="flashcards"
              element={isTutor() ? <SetSchedule /> : <FlashCards />}
            />
          </Route>
          {/* <Route path="/tutordashboard" element={<TutorDashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="classes" element={<Classes />} />
            <Route path="setschedule" element={<SetSchedule />} />
          </Route> */}
          {/* <Route path="/setschedule" element={<SetSchedule />} /> */}
          <Route path="/tutorProfile" element={<TutorProfile />} />
          <Route
            path="/tutorlive/:id"
            element={<VideoScreen isStudent={false} />}
          />
          <Route
            path="/studentlive/:id"
            element={<VideoScreen isStudent={true} />}
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
      {/* <Footer /> */}
    </GlobalContext.Provider>
  );
}

export default App;

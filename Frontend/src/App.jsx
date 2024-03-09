import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

export const GlobalContext = createContext();
const userInitialValue = {
  fullName: "Rishikesh Bhakare",
  email: "",
  accountType: "Student",
  profilePicture: "",
  languages: [],
}

function App() {
}

export default App;

import TutorList from "@/components/tutorList/TutorList";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TutorListContext = createContext();

const tutorListInitialValue = [
  {
    fullName: "Rishikesh Bhakare",
    profilePicture: "https://github.com/shadcn.png",
    bio: "Learn language at ease",
    expertise: [
      { language: "English", experience: 5 },
      { language: "Hindi", experience: 5 },
      { language: "Marathi", experience: 5 },
    ],
    pricing: [
      { level: "Beginner", price: 100 },
      { level: "Intermediate", price: 150 },
      { level: "Advanced", price: 200 },
    ],
  },
  {
    fullName: "Rishikesh Bhakare",
    profilePicture: "https://github.com/shadcn.png",
    bio: "Learn language at ease",
    expertise: [
      { language: "English", experience: 5 },
      { language: "Hindi", experience: 5 },
      { language: "Marathi", experience: 5 },
    ],
    pricing: [
      { level: "Beginner", price: 100 },
      { level: "Intermediate", price: 150 },
      { level: "Advanced", price: 200 },
    ],
  },
  {
    fullName: "Rishikesh Bhakare",
    profilePicture: "https://github.com/shadcn.png",
    bio: "Learn language at ease",
    expertise: [
      { language: "English", experience: 5 },
      { language: "Hindi", experience: 5 },
      { language: "Marathi", experience: 5 },
    ],
    pricing: [
      { level: "Beginner", price: 100 },
      { level: "Intermediate", price: 150 },
      { level: "Advanced", price: 200 },
    ],
  },
  {
    fullName: "Rishikesh Bhakare",
    profilePicture: "https://github.com/shadcn.png",
    bio: "Learn language at ease",
    expertise: [
      { language: "English", experience: 5 },
      { language: "Hindi", experience: 5 },
      { language: "Marathi", experience: 5 },
    ],
    pricing: [
      { level: "Beginner", price: 100 },
      { level: "Intermediate", price: 150 },
      { level: "Advanced", price: 200 },
    ],
  },
  {
    fullName: "Rishikesh Bhakare",
    profilePicture: "https://github.com/shadcn.png",
    bio: "Learn language at ease",
    expertise: [
      { language: "English", experience: 5 },
      { language: "Hindi", experience: 5 },
      { language: "Marathi", experience: 5 },
    ],
    pricing: [
      { level: "Beginner", price: 100 },
      { level: "Intermediate", price: 150 },
      { level: "Advanced", price: 200 },
    ],
  },
  {
    fullName: "Rishikesh Bhakare",
    profilePicture: "https://github.com/shadcn.png",
    bio: "Learn language at ease",
    expertise: [
      { language: "English", experience: 5 },
      { language: "Hindi", experience: 5 },
      { language: "Marathi", experience: 5 },
    ],
    pricing: [
      { level: "Beginner", price: 100 },
      { level: "Intermediate", price: 150 },
      { level: "Advanced", price: 200 },
    ],
  },
  {
    fullName: "Rishikesh Bhakare",
    profilePicture: "https://github.com/shadcn.png",
    bio: "Learn language at ease",
    expertise: [
      { language: "English", experience: 5 },
      { language: "Hindi", experience: 5 },
      { language: "Marathi", experience: 5 },
    ],
    pricing: [
      { level: "Beginner", price: 100 },
      { level: "Intermediate", price: 150 },
      { level: "Advanced", price: 200 },
    ],
  },
  {
    fullName: "Rishikesh Bhakare",
    profilePicture: "https://github.com/shadcn.png",
    bio: "Learn language at ease",
    expertise: [
      { language: "English", experience: 5 },
      { language: "Hindi", experience: 5 },
      { language: "Marathi", experience: 5 },
    ],
    pricing: [
      { level: "Beginner", price: 100 },
      { level: "Intermediate", price: 150 },
      { level: "Advanced", price: 200 },
    ],
  },
];

const HomePage = () => {
  const [tutorList, setTutorList] = useState();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await axios.get(`/api/tutors`, { withCredentials: true });
        // console.log(res.data.data.tutors);
        setTutorList(res.data.data.tutors);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDetails();
  }, []);

  return (
    <TutorListContext.Provider value={{ tutorList, setTutorList }}>
      <TutorList />
    </TutorListContext.Provider>
  );
};

export default HomePage;

import TutorList from '@/components/tutorList/TutorList'
import React, { createContext, useState } from 'react'

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
  },{
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
},{
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
}
];

const HomePage = () => {
  const [tutorList, setTutorList] = useState(tutorListInitialValue);

  return (
    <TutorListContext.Provider value={{tutorList, setTutorList}}>
      <TutorList />
    </TutorListContext.Provider>
  )
}

export default HomePage
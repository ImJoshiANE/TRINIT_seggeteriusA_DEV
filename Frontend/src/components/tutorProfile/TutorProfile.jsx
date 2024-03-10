import React, {createContext, useState} from 'react'
import SubscriptionPlanTutor from '../subscriptionPlanTutor/SubscriptionPlanTutor'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Separator } from '@radix-ui/react-select';


const tutorDataInitialVal = {
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
};

const subscriptionPlanListInitialVal = [
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-1",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-02",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-08",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-09",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
  {
    tutor: "TUTOR_ID_10",
    name: "Active Plan 6",
    description: "Active plan description 6",
    duration: [1, 3, 6],
    minSessionsPerMonth: 10,
    availableFrom: "2024-03-10",
    availableUntil: "2024-06-01",
    language: "English",
    timeSlots: [
      { daysOfWeek: [0, 1, 2], startTime: "14:00", duration: 30 },
      { daysOfWeek: [1, 2], startTime: "19:30", duration: 45 },
    ],
    isAvailable: false,
  },
];

export const TutorContext = createContext(); 

const TutorProfile = () => {
  const [tutorData, setTutorData] = useState(tutorDataInitialVal);
  const [subscriptionPlanList, setSubscriptionPlanList] =
    useState(subscriptionPlanListInitialVal);
  const avgPrice =
    tutorData.pricing.reduce((acc, it) => acc + it.price, 0) /
    tutorData.pricing.length;

  return (
    <TutorContext.Provider
      value={{
        tutorData,
        setTutorData,
        subscriptionPlanList,
        setSubscriptionPlanList,
      }}
    >
      <div className="flex items-center flex-col mt-4">
        <div className="w-full flex flex-col items-center justify-center w-200 my-10">
          <div className="text-3xl mb-10">Tutor profile</div>
          <div>
            <div className="flex content-between">
              <div className="flex justify-between items-center gap-2">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={tutorData.profilePicture} />
                  <AvatarFallback>
                    {tutorData.fullName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg">{tutorData.fullName}</div>
                  <div>{tutorData.bio}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <div className="flex flex-col items-start gap-1 mt-5 ">
                {tutorData.expertise.map((it, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 my-1"
                  >
                    <p>{it.language}</p>
                    <Badge variant="outline">{it.experience}+ years</Badge>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center mt-5 gap-2 items-start">
                {tutorData.pricing.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center gap-2"
                  >
                    <p>{item.level}</p>
                    <Badge className="text-sm">₹{item.price}/hour</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SubscriptionPlanTutor />
      </div>
    </TutorContext.Provider>
  );
}

export default TutorProfile
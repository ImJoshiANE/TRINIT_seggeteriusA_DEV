import React, {useState} from "react";
import Heading2 from "../Heading2";
import OneFlashCard from "./OneFlashCard";
import FlashCard from "../flashCard/FlashCard";
import { Card } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "react-select/animated";
const flashcards = [
  { front: "What is the capital of Japan?", back: "Tokyo" },
  { front: "Who wrote 'To Kill a Mockingbird'?", back: "Harper Lee" },
  { front: "What is the chemical symbol for gold?", back: "Au" },
  { front: "What is the largest mammal in the world?", back: "Blue Whale" },
  { front: "In which year did the Titanic sink?", back: "1912" },
  { front: "What is the square root of 64?", back: "8" },
  { front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci" },
  { front: "Which planet is known as the Red Planet?", back: "Mars" },
  { front: "What is the currency of Brazil?", back: "Brazilian Real" },
  { front: "Who discovered penicillin?", back: "Alexander Fleming" },
];

const FlashCards = () => {
  const [flashs, setFlashs] = useState(flashcards);
  const [isOpen, setIsOpen] = useState(false);
  const [question , setQuestion] = useState("");
  const [answer , setAnswer] = useState("");

  const addFlash = () => {
    console.log("shsh")
    setFlashs([...flashs, { front: question, back: answer }]);
    setIsOpen(false);
  }

  return (
    <>
      <Heading2 heading={"FlashCards"} className="mb-14" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {flashs.map((data, i) => (
          <FlashCard
            key={i}
            frontContent={data.front}
            backContent={data.back}
          />
        ))}
        <Card className="h-60 w-60 p-5 flex items-center justify-center text-lg">
          <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger className="flex items-center justify-center text-6xl" onClick={() => setIsOpen(true)}>
              +
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Flash Card</DialogTitle>
              </DialogHeader>
              <input
                className="border-1 border-black p-2 bg-gray-200 rounded-md"
                placeholder="Enter your question"
                onChange={(e) => setQuestion(e.target.value)}
              />
              <input
                className="border-1 p-4 flex items-center justify-center bg-gray-200 rounded-md"
                placeholder="Enter your answer"
                onChange={(e) => setAnswer(e.target.value)}
              />  
              <div className="bg-black text-white w-24 h-10 flex items-center justify-center rounded-md text-lg p-2 hover:cursor-pointer" onClick={() => question && answer && addFlash()}>Create</div>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </>
  );
};

export default FlashCards;

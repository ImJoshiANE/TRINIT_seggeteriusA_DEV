import React from "react";
import Heading2 from "../Heading2";
import { OneFlashCard } from "./OneFlashCard";

const FlashCards = () => {
  const cardsData = [
    {
      front: "This is Front",
      back: {
        title: "This is title for the back",
        description:
          "This is description for the back of the card it should be longer so it can look good.",
      },
    },
    {
      front: "This is Front",
      back: {
        title: "This is title for the back",
        description:
          "This is description for the back of the card it should be longer so it can look good.",
      },
    },
    {
      front: "This is Front",
      back: {
        title: "This is title for the back",
        description:
          "This is description for the back of the card it should be longer so it can look good.",
      },
    },
    {
      front: "This is Front",
      back: {
        title: "This is title for the back",
        description:
          "This is description for the back of the card it should be longer so it can look good.",
      },
    },
  ];
  return (
    <>
    <Heading2 heading={"FlashCards"} className="mb-14"  />
      {/* {cardsData.map((data) => {
        <OneFlashCard front={data.front} back={data.back} />
      }
      )} */}
      <div className="flex items-center justify-center w-[100%]">
        <OneFlashCard />
      </div>
    </>
  );
};

export default FlashCards;

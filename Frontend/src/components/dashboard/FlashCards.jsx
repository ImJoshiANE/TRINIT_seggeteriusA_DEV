import React from "react";
import Heading2 from "../Heading2";
import OneFlashCard from "./OneFlashCard";

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
      <Heading2 heading={"FlashCards"} className="mb-14" />
      <div className=" flex justify-center items-center ">
        {cardsData.map(({data}) => {
          return <OneFlashCard data={data} className="mx-4"/>
        })}
      </div>
    </>
  );
};

export default FlashCards;

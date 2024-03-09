import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ user }) => {
  const [isUser, setIsuser] = useState(user);
  const location = useLocation();

  const isActive = (path) => {
    const pathName = "/dashboard/" + path;
    return location.pathname == pathName;
  };

  return (
    <div className="text-white fixed">
      <h1 className="font-semibold text-2xl mb-10">AppName</h1>
      <nav className="flex flex-col justify-start">
        {/* Later replace with Link */}
        <Link
          to={"classes"}
          className={
            (isActive("classes") ? "underline" : "") + " inline-block text-lg"
          }
        >
          Classes
        </Link>
        <Link
          to={"profile"}
          className={
            (isActive("profile") ? "underline" : "") +
            " inline-block text-lg my-5"
          }
        >
          Profile
        </Link>

        {isUser ? (
          <Link
            to={"flashcards"}
            className={
              (isActive("flashcards") ? "underline" : "") +
              " inline-block text-lg"
            }
          >
            FlashCards
          </Link>
        ) : (
          <Link
            to={"setschedule"}
            className={
              (isActive("setschedule") ? "underline" : "") +
              " inline-block text-lg"
            }
          >
            SetSchedule
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

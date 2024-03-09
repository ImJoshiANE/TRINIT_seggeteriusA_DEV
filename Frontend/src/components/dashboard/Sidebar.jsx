import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="text-white fixed">
      <h1 className="font-semibold text-2xl mb-10">AppName</h1>
      <nav className="flex flex-col justify-start">
        {/* Later replace with Link */}
        <div className="inline-block text-lg">Classes</div>
        <div className="inline-block text-lg my-5">Profile</div>
        <div className="inline-block text-lg">FlashCards</div>
      </nav>
    </div>
  );
};

export default Sidebar;

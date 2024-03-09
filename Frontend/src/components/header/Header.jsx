import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useContext } from "react";
import { GlobalContext } from "../../App";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);
  return (
    <div className="flex justify-between items-center gap-2 px-4 bg-black h-16">
      <div
        className="text-white text-3xl hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        LinguaConnect
      </div>
      <div>
        <Avatar className="hover:cursor-pointer flex">
          {user.email ? (
            <div onClick={() => navigate("/userdashboard")}>
              <AvatarImage src={user.profilePicture} />
              <div className="h-10 w-10 bg-slate-400 flex items-center justify-center rounded-full">
                <AvatarFallback>
                  {user.fullName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </div>
            </div>
          ) : (
            <Login />
          )}
        </Avatar>
      </div>
    </div>
  );
};

export default Header;

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useContext } from "react";
import {GlobalContext} from "../../App";
 
const Header = () => {
  const {user} = useContext(GlobalContext);
  return (
    <div className="flex justify-between items-center gap-2 px-4 bg-black h-16">
      <div className="text-white text-3xl">LinguaConnect</div>
      <div>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage src={user.profilePicture} />
          <div className="h-10 w-10 bg-slate-400 flex items-center justify-center rounded-full">
            <AvatarFallback>
              {user.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </div>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;

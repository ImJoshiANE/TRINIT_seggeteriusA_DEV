import React, { useState } from "react";
import Heading2 from "../Heading2";
import Info from "./Info";
import { ClassesTable } from "./ClassesTable";

const Classes = ({ user }) => {
  const [isUser, setIsuser] = useState(user);

  return (
    <div className="bg-destructive-foreground">
      <ClassesTable type={"Upcoming Classes"} user={isUser} />
      <ClassesTable type={"Completed Classes"} user={isUser} />
    </div>
  );
};

export default Classes;

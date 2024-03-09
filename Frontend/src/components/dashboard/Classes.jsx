import React from "react";
import Heading2 from "../Heading2";
import Info from "./Info";
import { ClassesTable } from "./ClassesTable";

const Classes = () => {

  return (
    <div className="bg-destructive-foreground">
        <ClassesTable type={"Upcoming Classes"}/>
        <ClassesTable type={"Completed Classes"}/>
    </div>
  );
};

export default Classes;

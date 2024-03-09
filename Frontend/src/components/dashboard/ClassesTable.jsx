import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AvatarDemo } from "./AvatarDemo";
import Heading2 from "../Heading2";


// Take props later instead of the dummy array

export function ClassesTable({type}) {
  const upcomingSessions = [
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
  ];

  const completedSessions = [
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
    {
      tutor: "Micheal Arock",
      tutorImg: "https://i.pravatar.cc/150?img=65",
      sTime: "5:30, 6 Jan 2024",
      duration: "45 min",
    },
  ];

  const target = type === "Upcoming Classes" ? upcomingSessions : completedSessions;

  return (
    <>
    <Heading2 heading={type}/>
    <div>
    <Table>
      <TableCaption>. . . . . . . . . . . . . . . .</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Tutor-Image</TableHead>
          <TableHead>Tutor Name</TableHead>
          <TableHead>Start Timing</TableHead>
          <TableHead className="text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {upcomingSessions.map((session) => (
          <TableRow>
            <TableCell><AvatarDemo picPath={session.tutorImg}/></TableCell>
            <TableCell>{session.tutor}</TableCell>
            <TableCell>{session.sTime}</TableCell>
            <TableCell className="text-right">{session.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </>
  );
}

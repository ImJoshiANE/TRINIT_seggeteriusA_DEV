import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const TutorCard = ({ tutor, i }) => {
  const navigate = useNavigate();
  const avgPrice = Math.floor(
    (tutor.pricing[0]["beginner"] +
      tutor.pricing[0]["intermediate"] +
      tutor.pricing[0]["advance"]) /
      3
  );
  // console.log(tutor);
  return (
    <Card className="h-50 w-60">
      <CardHeader className="flex content-between">
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="text-lg">{tutor?.user?.fullName}</CardTitle>
          <Avatar>
            <AvatarImage src={`https://i.pravatar.cc/150${i}`} />
            <AvatarFallback>
              {tutor?.user?.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardDescription>{tutor.bio}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-1">
          {!!tutor?.expertise && tutor.expertise.map((it, i) => (
            <div key={i} className="flex items-center justify-between gap-1">
              <Badge>{it.language}</Badge>
              <Badge variant="outline">{it.experience}+ years</Badge>
            </div>
          ))}
        </div>
        <div></div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm">₹{avgPrice}/hour</p>
        <Button
          variant="outline"
          onClick={() => {
            console.log("hi");
            navigate("/tutorProfile");
          }}
        >
          Check
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TutorCard;

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button';
import {useNavigate} from "react-router-dom";

const TutorCard = ({tutor}) => {
  const navigate = useNavigate();
  const avgPrice = tutor.pricing.reduce((acc, it) => acc + it.price, 0) / tutor.pricing.length;
  return (
    <Card className="h-50 w-60">
      <CardHeader className="flex content-between">
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="text-lg">{tutor.fullName}</CardTitle>
          <Avatar>
            <AvatarImage src={tutor.profilePicture} />
            <AvatarFallback>
              {tutor.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardDescription>{tutor.bio}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-1">
          {tutor.expertise.map((it) => (
            <div className="flex items-center justify-between gap-1">
              <Badge>{it.language}</Badge>
              <Badge variant="outline">{it.experience}+ years</Badge>
            </div>
          ))}
        </div>
        <div></div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm">₹{avgPrice}/hour</p>
        <Button variant="outline" onClick={() => {console.log("hi");
        navigate("/tutorProfile");
        }}>Check</Button>
      </CardFooter>
    </Card>
  );
}

export default TutorCard
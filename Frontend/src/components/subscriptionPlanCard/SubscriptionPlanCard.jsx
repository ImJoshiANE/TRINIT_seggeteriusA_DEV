import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TutorContext } from "../tutorProfile/TutorProfile";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { isUpcomingOrNot } from "@/utils/isUpcoming";

const DaysComponent = ({ selectedDays }) => {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const renderDays = () => {
    return daysOfWeek.map((day, index) => {
      return selectedDays.includes(index) ? (
        <p key={index} className="underline">
          {daysOfWeek[index]}
        </p>
      ) : (
        <p key={index}>{day}</p>
      );
    });
  };

  return <div className="flex gap-1">{renderDays()}</div>;
};

const SubscriptionPlanCard = ({ subscriptionPlanData, upcoming }) => {
  const { toast } = useToast();
  const { tutorData, setTutorData } = useContext(TutorContext);
  const [price, setPrice] = useState(0);
  const [planIdx, setPlanIdx] = useState(-1);
  const [monthIdx, setMonthIdx] = useState(-1);
  const [levelIdx, setLevelIdx] = useState(-1);
  const isUpcoming = isUpcomingOrNot(subscriptionPlanData.availableFrom);

  const handleSubscribe = (upcoming) => {
    if (upcoming) {
      toast({ description: "You can't subscribe to upcoming plans" });
      return;
    }

    if (planIdx === -1 || monthIdx === -1 || levelIdx === -1) {
      toast({ description: "Please select all the fields" });
      return;
    }

    const selectedPlan = subscriptionPlanData.timeSlots[planIdx];
    const selectedLevel = tutorData.pricing[levelIdx].level;
    const selectedMonth = subscriptionPlanData.duration[monthIdx];
    const selectedPrice = price;
  };

  useEffect(() => {
    if (planIdx !== -1 && monthIdx !== -1 && levelIdx !== -1) {
      const priceForLevel = tutorData.pricing[levelIdx].price;
      const calcPrice =
        (subscriptionPlanData.timeSlots[planIdx].duration / 60) *
        subscriptionPlanData.duration[monthIdx] *
        priceForLevel *
        subscriptionPlanData.minSessionsPerMonth;
      setPrice(Math.round(calcPrice));
    }
  }, [planIdx, monthIdx, levelIdx]);

  return (
    <Card className="h-[410px] w-60">
      <CardHeader>
        <CardTitle>{subscriptionPlanData.name}</CardTitle>
        <CardDescription>{subscriptionPlanData.description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[245px] flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p>Sessions/month</p>
          <Badge>{subscriptionPlanData.minSessionsPerMonth}+</Badge>
        </div>
        <div className="flex items-center justify-between">
          <p>{isUpcoming ? "Starting date" : "Closing date"}</p>
          <Badge>
            {isUpcoming
              ? subscriptionPlanData.availableFrom
              : subscriptionPlanData.availableUntil}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <p>Language</p>
          <Badge>{subscriptionPlanData.language}</Badge>
        </div>
        <div className="flex gap-2">
          <Select onValueChange={(value) => setLevelIdx(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>

            <SelectContent>
              {tutorData.pricing.map((it, i) => (
                <SelectItem key={i} value={i}>
                  {it.level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setMonthIdx(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Months" />
            </SelectTrigger>

            <SelectContent>
              {subscriptionPlanData.duration.map((dur, i) => (
                <SelectItem key={i} value={i}>
                  {dur}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Select onValueChange={(value) => setPlanIdx(Number(value))}>
          <SelectTrigger className="h-20">
            <SelectValue placeholder="Choose your plan" />
          </SelectTrigger>

          <SelectContent>
            {subscriptionPlanData.timeSlots.map((timeSlot, i) => (
              <SelectItem
                key={i}
                value={i}
                className="flex items-center justify-center w-full"
              >
                <div className="flex gap-1 flex-col items-center justify-center">
                  <div className="flex gap-2">
                    <p>{timeSlot.startTime}</p>
                    <Separator className="h-6" orientation="vertical" />
                    <p>{timeSlot.duration} Mins </p>
                  </div>
                  <Separator />
                  <DaysComponent selectedDays={timeSlot.daysOfWeek} />
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <p>Price</p>
          <p>₹{price}</p>
        </div>

        <Button disabled={upcoming} onClick={() => handleSubscribe(upcoming)}>
          Subscribe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlanCard;

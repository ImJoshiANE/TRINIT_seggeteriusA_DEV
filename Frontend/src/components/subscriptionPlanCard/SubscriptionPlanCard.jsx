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
import { useToast } from "../ui/use-toast";
import axios from "axios";

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

function formattedDate(dateString) {
  const dateObject = new Date(dateString);

  console.log(dateObject);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${dateObject.getUTCDate()} ${
    months[dateObject.getUTCMonth()]
  } ${dateObject.getUTCFullYear() % 100}`;

  return formattedDate;
}

const checkoutHandler = async (amount) => {
  const {
    data: { key },
  } = await axios.get("/api/payment/getkey");

  const {
    data: { order },
  } = await axios.post("/api/payment/checkout", {
    amount,
  });

  const options = {
    key,
    amount: order.amount,
    currency: "INR",
    name: "Saggetrius A*",
    description: "Payment module",
    image: "",
    order_id: order.id,
    callback_url: "/api/payment/paymentverification",
    prefill: {},
    notes: {
      address: "Razorpay Corporate Office",
      mobile: "9999999999",
    },
    theme: {
      color: "#121212",
    },
  };
  const razor = new window.Razorpay(options);
  razor.open();
};

const SubscriptionPlanCard = ({ subscriptionPlanData, upcoming }) => {
  const { toast } = useToast();
  const { tutorData, setTutorData } = useContext(TutorContext);
  const [price, setPrice] = useState(100);
  const [sessionDurIdx, setSessionDurIdx] = useState(0);
  const [sessionStartIdx, setSessionStartIdx] = useState(-1);
  const [monthIdx, setMonthIdx] = useState(-1);
  const [levelIdx, setLevelIdx] = useState(-1);
  const isUpcoming = isUpcomingOrNot(subscriptionPlanData.regOpenFrom);

  const handleSubscribe = (upcoming, price) => {
    if (upcoming) {
      toast({ description: "You can't subscribe to upcoming plans" });
      return;
    }

    // if (sessionStartIdx === -1 || monthIdx === -1 || levelIdx === -1) {
    //   toast({ description: "Please select all the fields" });
    //   return;
    // }

    checkoutHandler(price);
  };

  useEffect(() => {
    if (sessionStartIdx !== -1 && monthIdx !== -1 && levelIdx !== -1) {
      const levels = {
        0: "beginner",
        1: "intermediate",
        2: "advance",
      };

      const priceForLevel = tutorData.pricing[levels[levelIdx]];
      const calcPrice =
        (subscriptionPlanData.sessionDuration / 60) *
        subscriptionPlanData.validity[monthIdx] *
        priceForLevel *
        subscriptionPlanData.minSessionsPerMonth;
      setPrice(Math.round(calcPrice));
    }
  }, [monthIdx, levelIdx, tutorData.pricing, subscriptionPlanData]);

  console.log(subscriptionPlanData.regOpenTill);

  return (
    <Card className="h-[460px] w-80">
      <CardHeader>
        <CardTitle>{subscriptionPlanData.title}</CardTitle>
        <CardDescription>{subscriptionPlanData.description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[245px] flex flex-col justify-between">
        {/* <div className="flex items-center justify-between">
          <p>Sessions/month</p>
          <Badge>{subscriptionPlanData.minSessionsPerMonth}+</Badge>
        </div> */}
        <div className="flex items-center justify-between">
          <p>{isUpcoming ? "Registeration Start" : "Registration End"}</p>
          <Badge className="ml-5">
            {isUpcoming
              ? formattedDate(subscriptionPlanData.regOpenFrom)
              : formattedDate(subscriptionPlanData.regOpenTill)}
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
              {subscriptionPlanData.validity.map((val, i) => (
                <SelectItem key={i} value={i}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <Select onValueChange={(value) => setPlanIdx(Number(value))}>
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
        </Select> */}

        <div className="flex gap-2">
          <Select onValueChange={(value) => setSessionDurIdx(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Duration" />
            </SelectTrigger>

            <SelectContent>
              {subscriptionPlanData.sessionDuration.map((dur, i) => (
                <SelectItem key={i} value={i}>
                  {dur}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSessionStartIdx(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Starts At" />
            </SelectTrigger>

            <SelectContent>
              {subscriptionPlanData.sessionStartAt.map((at, i) => (
                <SelectItem key={i} value={i}>
                  {at}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DaysComponent selectedDays={subscriptionPlanData.daysOfWeek} />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <p>Price</p>
          <p>₹{price}</p>
        </div>

        <Button
          disabled={upcoming}
          onClick={() => handleSubscribe(upcoming, price)}
        >
          Subscribe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlanCard;

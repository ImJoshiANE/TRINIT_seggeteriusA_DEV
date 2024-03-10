import React, { useContext } from "react";
import SubscriptionPlanCard from "../subscriptionPlanCard/SubscriptionPlanCard";
import { TutorContext } from "../tutorProfile/TutorProfile";

const SubscriptionListComponent = ({ subscriptionList, upcoming }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-10 place-items-center lg:w-[780px] xl:w-[1000px] my-10">
        {subscriptionList.map((subscriptionPlan, i) => (
          <SubscriptionPlanCard
            subscriptionPlanData={subscriptionPlan}
            upcoming={upcoming}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

const listByTypeUpOrCurr = (subscriptionPlanList, type) => {
  return subscriptionPlanList.filter((subscriptionPlan) => {
    const availFromString = subscriptionPlan.regOpenFrom;
    const availFromDate = new Date(availFromString).getTime();
    const currentDate = new Date().getTime();

    if (type == "upcoming" && availFromDate > currentDate) {
      return subscriptionPlan;
    }
    if (type == "current" && availFromDate <= currentDate) {
      return subscriptionPlan;
    }
  });
};

const SubscriptionPlanTutor = () => {
  const { subscriptionPlanList, setSubscriptionPlanList } =
    useContext(TutorContext);

  const currentList = listByTypeUpOrCurr(subscriptionPlanList, "current");
  const upcomingList = listByTypeUpOrCurr(subscriptionPlanList, "upcoming");

  return (
    <div className="w-full flex flex-col items-center justify-center my-5">
      <div>
        <div className="text-2xl">Current plans</div>
      </div>
      <SubscriptionListComponent
        subscriptionList={currentList}
        upcoming={false}
      />
      <div>
        <div className="text-2xl">Upcoming plans</div>
      </div>
      <SubscriptionListComponent
        subscriptionList={upcomingList}
        upcoming={true}
      />
    </div>
  );
};

export default SubscriptionPlanTutor;

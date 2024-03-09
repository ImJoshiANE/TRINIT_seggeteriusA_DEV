import React from "react";

const Heading2 = ({ heading, className }) => {
  return (
    <h2 className={`${className} text-center scroll-m-20 border-b text-3xl font-semibold tracking-tight pt-5 pb-5`}>
      {heading}
    </h2>
  );
};

export default Heading2;

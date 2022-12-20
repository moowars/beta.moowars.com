import React from "react";

type Props = {};

const Failure = (props: Props) => {
  return (
    <div className="mt-12 text-sm leading-5 tracking-tighter text-center md:mt-0 font-lexend-exa">
      <h1 className="font-bold">Purchase Failed:</h1>{" "}
      <p className="mb-4">Something has gone wrong. Please try again.</p>
    </div>
  );
};

export default Failure;

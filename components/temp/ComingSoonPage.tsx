import React from "react";

type Props = {};

const ComingSoonPage = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col flex-grow justify-center items-center">
      <h1 className="font-cinder text-7xl">Coming Soon!</h1>
      <p className="font-lexend-exa text-lg tracking-tighter mt-3">
        Check back later for updates.
      </p>
    </div>
  );
};

export default ComingSoonPage;

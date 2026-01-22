import React, { Suspense } from "react";
import LevelSelectorContent from "./level-selector-content";

const LevelSelector = () => {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center text-2xl font-bold dark:text-white">
        Loading...
      </div>
    }>
      <LevelSelectorContent />
    </Suspense>
  );
};

export default LevelSelector;

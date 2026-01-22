import React, { Suspense } from "react";
import GameContent from "./game-content";

const Game = () => {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center text-2xl font-bold dark:text-white">
        Loading...
      </div>
    }>
      <GameContent />
    </Suspense>
  );
};

export default Game;

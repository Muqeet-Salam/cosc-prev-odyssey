"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  convertDotsToUnderscores,
  getIndianEpochTimeFromWorldTimeAPI,
  levelScore,
} from "@/lib/utils";
import { staticData } from "@/lib/staticdata";

// Set 1 - The Odyssey
import Level1 from "@/components/levels/L1";
import Level2 from "@/components/levels/L2";
import Level3 from "@/components/levels/L3";
import Level4 from "@/components/levels/L4";
import Level5 from "@/components/levels/L5";
import Level6 from "@/components/levels/L6";
import Level7 from "@/components/levels/L7";
import Level8 from "@/components/levels/L8";
import Level9 from "@/components/levels/L9";
import Level10 from "@/components/levels/L10";
import Level11 from "@/components/levels/L11";
import Level12 from "@/components/levels/L12";
import Level13 from "@/components/levels/L13";
import Level14 from "@/components/levels/L14";
import Level15 from "@/components/levels/L15";

// Set 2 - The Challenge
import Level1Set2 from "@/components/levels2/L1";
import Level2Set2 from "@/components/levels2/L2";
import Level3Set2 from "@/components/levels2/L3";
import Level4Set2 from "@/components/levels2/L4";
import Level5Set2 from "@/components/levels2/L5";
import Level6Set2 from "@/components/levels2/L6";
import Level7Set2 from "@/components/levels2/L7";
import Level8Set2 from "@/components/levels2/L8";
import Level9Set2 from "@/components/levels2/L9";
import Level10Set2 from "@/components/levels2/L10";
import Level11Set2 from "@/components/levels2/L11";
import Level12Set2 from "@/components/levels2/L12";
import Level13Set2 from "@/components/levels2/L13";
import Level14Set2 from "@/components/levels2/L14";
import Level15Set2 from "@/components/levels2/L15";
import Level16Set2 from "@/components/levels2/L16";

const levels1 = [
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
  Level7,
  Level8,
  Level9,
  Level10,
  Level11,
  Level12,
  Level13,
  Level14,
  Level15,
];

const levels2 = [
  Level1Set2,
  Level2Set2,
  Level3Set2,
  Level4Set2,
  Level5Set2,
  Level6Set2,
  Level7Set2,
  Level8Set2,
  Level9Set2,
  Level10Set2,
  Level11Set2,
  Level12Set2,
  Level13Set2,
  Level14Set2,
  Level15Set2,
  Level16Set2,
];

const Game = () => {
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [userDet, setUserDet] = useState({ CL: 1, CS: 0, S: 0 });
  const router = useRouter();
  const searchParams = useSearchParams();
  const set = searchParams.get("set") || "1";
  const levelParam = searchParams.get("level");
  const userId = "guest-player";

  const isSet2 = set === "2";
  const maxLevels = isSet2 ? 16 : 15;
  const currentLevelNum = levelParam ? parseInt(levelParam) : (userDet?.CL || 1);

  const getUserId = () => {
    return userId;
  };

  const handleLevelComplete = async () => {
    setTransitioning(true);
    const userId = getUserId();
    if (userId) {
      await setScore(userId);
      setTimeout(() => {
        setTransitioning(false);
      }, 2000);
    }
  };

  const setScore = async (userId) => {
    if (!userId) return;
    setLoading(true);
    try {
      const updatedScore = await levelScore(
        userDet?.CL || 0,
        userDet?.CS || 0,
        userDet?.S || 0
      );
      setUserDet({ CL: (userDet?.CL || 0) + 1, CS: 0, S: updatedScore });
    } catch (error) {
      console.error("Error setting score:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize state with current level from query param
    if (levelParam) {
      setUserDet({ CL: parseInt(levelParam), CS: 0, S: 0 });
    }
  }, [levelParam]);

  if (currentLevelNum > maxLevels) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white dark:bg-[#2D1B4B] rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-800 dark:text-[#F9DC34]">Well played</h2>
          <p className="text-purple-600 dark:text-purple-300">Come back soon for more levels!</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const levelsArray = isSet2 ? levels2 : levels1;
  const CurrentLevel = levelsArray[currentLevelNum - 1];

  return (
    <div className="w-screen">
      {transitioning ? (
        <div className="h-screen flex items-center justify-center text-2xl font-bold dark:text-white">
          Loading next level...
        </div>
      ) : CurrentLevel ? (
        <CurrentLevel onComplete={handleLevelComplete} />
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500">Level not found</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;

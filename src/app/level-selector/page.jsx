"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const LevelSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const set = searchParams.get("set") || "1";
  const [selectedLevel, setSelectedLevel] = useState(1);

  const maxLevelsSet1 = 15;
  const maxLevelsSet2 = 16;
  const maxLevels = set === "1" ? maxLevelsSet1 : maxLevelsSet2;
  const setName = set === "1" ? "The Odyssey" : "The Challenge";

  const levels = Array.from({ length: maxLevels }, (_, i) => i + 1);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#2D1B4B] to-[#1A0F2E] overflow-hidden relative p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,25 C20,10 50,40 80,5 L100,25 L100,100 L0,100 Z"
              fill="rgba(237, 139, 255, 0.4)"
            />
            <path
              d="M0,50 C30,35 70,65 100,40 L100,100 L0,100 Z"
              fill="rgba(138, 43, 226, 0.3)"
            />
          </svg>
        </div>
      </div>

      <div className="z-10 w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href="/">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back
            </Button>
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-[#F9DC34] mb-2">{setName}</h1>
            <p className="text-purple-200">Select a level to play</p>
          </div>
          <div className="w-24"></div>
        </motion.div>

        {/* Level Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-md bg-white/5 rounded-xl p-8 shadow-lg border border-purple-300/20 mb-6"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-6">
            {levels.map((level) => (
              <motion.button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`relative p-4 rounded-lg font-bold text-lg transition-all transform hover:scale-110 ${
                  selectedLevel === level
                    ? "bg-gradient-to-r from-[#F9DC34] to-[#F5A623] text-purple-900 shadow-lg scale-110"
                    : "bg-purple-800/50 text-[#F9DC34] hover:bg-purple-700/70 border border-purple-500/30"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {level}
              </motion.button>
            ))}
          </div>

          {/* Selected Level Info */}
          <motion.div
            key={selectedLevel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-purple-900/40 rounded-lg p-6 mb-6 border border-purple-500/30"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-[#F9DC34] mb-2">
                Level {selectedLevel}
              </h2>
              <p className="text-purple-200">
                {set === "1" ? "The Odyssey" : "The Challenge"} - Level {selectedLevel} of {maxLevels}
              </p>
            </div>

            {/* Play Button */}
            <Link
              href={`/game?set=${set}&level=${selectedLevel}`}
              className="w-full flex justify-center"
            >
              <Button
                className="w-full py-4 text-xl font-bold bg-gradient-to-r from-[#F9DC34] to-[#F5A623] hover:from-[#FFE55C] hover:to-[#FFBD4A] text-purple-900 rounded-lg shadow-lg transform transition-transform hover:scale-105"
              >
                Play Level {selectedLevel}
              </Button>
            </Link>
          </motion.div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() =>
                setSelectedLevel(Math.max(1, selectedLevel - 1))
              }
              disabled={selectedLevel === 1}
              className="py-2 px-4 bg-purple-700/50 hover:bg-purple-600/70 disabled:opacity-50 disabled:cursor-not-allowed text-purple-200 rounded-lg font-semibold transition-all"
            >
              ← Previous Level
            </button>
            <button
              onClick={() =>
                setSelectedLevel(Math.min(maxLevels, selectedLevel + 1))
              }
              disabled={selectedLevel === maxLevels}
              className="py-2 px-4 bg-purple-700/50 hover:bg-purple-600/70 disabled:opacity-50 disabled:cursor-not-allowed text-purple-200 rounded-lg font-semibold transition-all"
            >
              Next Level →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LevelSelector;

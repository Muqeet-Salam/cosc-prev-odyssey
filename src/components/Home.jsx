"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { staticData } from "@/lib/staticdata";
import { motion } from "framer-motion";

const Home = () => {
  const [userDet, setUserDet] = useState({ CL: 1, CS: 0, S: 0 });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Initialize with default user data (no Firebase)
    setUserDet({ CL: 1, CS: 0, S: 0 });
    setLoading(false);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#2D1B4B] to-[#1A0F2E] overflow-hidden relative">

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
      
      <div className="z-10 w-full max-w-md px-6 py-12 flex flex-col items-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Image
            src="/DarkVertical.png"
            alt="logo"
            width={300}
            height={300}
            className="drop-shadow-lg"
          />
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <div className="w-12 h-12 rounded-full border-4 border-t-[#F9DC34] border-purple-700 animate-spin"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex flex-col items-center"
          >
            <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 shadow-lg border border-purple-300/20 w-full">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#F9DC34] mb-2">Select Game Set</h2>
                <p className="text-purple-200">Choose a challenge set to begin</p>
              </div>
              
              <div className="space-y-4">
                <Link href="/level-selector?set=1" className="w-full flex justify-center">
                  <Button 
                    className="w-full py-6 text-xl font-bold bg-gradient-to-r from-[#F9DC34] to-[#F5A623] hover:from-[#FFE55C] hover:to-[#FFBD4A] text-purple-900 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                  >
                    Odyssey 2025
                  </Button>
                </Link>
                
                <Link href="/level-selector?set=2" className="w-full flex justify-center">
                  <Button 
                    className="w-full py-6 text-xl font-bold bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] hover:from-[#C77DFF] hover:to-[#A76DFF] text-white rounded-lg shadow-lg transform transition-transform hover:scale-105"
                  >
                    Odyssey 2024
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-purple-300/20">
                <p className="text-center text-purple-300 text-sm">
                  Test your skills in different game sets with unique challenges
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
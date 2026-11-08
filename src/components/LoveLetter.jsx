"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail } from "lucide-react";

export default function LoveLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section id="letter" className="overflow-hidden px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Heart className="mx-auto mb-5 fill-rose-400 text-rose-400" />
        <p className="text-sm tracking-[0.3em] text-rose-400 uppercase">Something From My Heart</p>
        <h2 className="font-romantic mt-4 text-4xl font-bold md:text-5xl">A Letter For You</h2>
        <p className="mt-4 text-[#927b83]">There&apos;s something I have been wanting to tell you...</p>

        <div className="relative mx-auto mt-16 flex min-h-[360px] max-w-xl items-center justify-center">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.button
                key="closed"
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setOpened(true)}
                className="group flex w-full flex-col items-center"
              >
                <div className="relative flex h-56 w-full max-w-sm items-center justify-center rounded-2xl border border-rose-200 bg-[#f8dce2] shadow-xl transition duration-500 group-hover:-translate-y-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-0 w-0 border-x-[120px] border-t-[70px] border-x-transparent border-t-rose-300/80 sm:border-x-[190px] sm:border-t-[110px]" />
                  </div>
                  <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                    <Heart className="fill-rose-400 text-rose-400" />
                  </div>
                  <Mail className="absolute bottom-5 right-5 text-rose-400" size={25} />
                </div>
                <p className="mt-8 text-rose-500">Click to open your letter ♡</p>
              </motion.button>
            ) : (
              <motion.div
                key="opened"
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative w-full rounded-3xl border border-rose-200 bg-[#fffdf9] p-8 text-left shadow-2xl md:p-12"
              >
                <Heart className="absolute right-6 top-6 fill-rose-200 text-rose-300" />
                <p className="font-romantic text-xl italic text-rose-400">My Dearest Love,</p>
                <h3 className="font-romantic mt-6 text-3xl font-bold">You make my world beautiful.</h3>
                <div className="mt-6 space-y-4 text-sm leading-8 text-[#927b83]">
                  <p>I don&apos;t know if words will ever be enough to explain how much you mean to me.</p>
                  <p>You are the smile behind my happiest moments, the peace in my busy days, and the person I want beside me through every chapter of life.</p>
                  <p>I don&apos;t promise that every day will be perfect. But I promise that every day, I will find another reason to appreciate you.</p>
                  <p>Thank you for being you. Thank you for being part of my story.</p>
                </div>
                <div className="mt-8">
                  <p className="font-romantic text-2xl italic text-rose-500">Forever yours,</p>
                  <p className="mt-2 text-sm text-rose-400">With all my love ❤️</p>
                </div>
                <button type="button" onClick={() => setOpened(false)} className="mt-8 text-xs text-rose-400 underline">Close the letter</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Sparkles } from "lucide-react";

const reasons = [
  "Your smile makes even my ordinary days special. ❤️",
  "You make everything feel a little more beautiful. 🌸",
  "I love the little things that make you who you are. 🦋",
  "You are my favorite notification. 💌",
  "If I could choose again, I would still choose you. ❤️",
  "You make my heart feel at home. 🏡",
  "My favorite place is wherever you are. ✨",
];

export default function Surprise() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const revealSurprise = () => {
    const options = reasons.filter((reason) => reason !== message);
    const nextMessage = options[Math.floor(Math.random() * options.length)];
    setMessage(nextMessage);
    setCount((value) => value + 1);
  };

  return (
    <section
      id="surprise"
      className="relative overflow-hidden bg-[#f8dce2] px-6 py-28 text-center"
    >
      <Sparkles className="absolute left-10 top-10 text-rose-300" size={45} />
      <Heart className="absolute bottom-10 right-10 text-rose-300" size={45} />
      <div className="relative z-10 mx-auto max-w-2xl">
        <Gift className="mx-auto mb-6 text-rose-500" size={42} />
        <p className="text-sm tracking-[0.3em] text-rose-500 uppercase">
          A Little Surprise
        </p>
        <h2 className="font-romantic mt-5 text-4xl font-bold md:text-5xl">
          A Thousand Reasons
        </h2>
        <p className="mt-5 text-[#927b83]">
          There are so many reasons why you are special. Here is one for you
          today.
        </p>

        <div className="mx-auto mt-10 flex min-h-36 max-w-lg items-center justify-center rounded-3xl border border-white bg-white/70 p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {message ? (
              <motion.p
                key={count}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="font-romantic text-2xl italic text-rose-500"
              >
                {message}
              </motion.p>
            ) : (
              <p className="font-romantic text-xl italic text-rose-300">
                Your surprise is waiting... ❤️
              </p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={revealSurprise}
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-rose-500 px-8 py-4 text-white shadow-lg shadow-rose-200 transition hover:-translate-y-1 hover:bg-rose-600"
        >
          <Gift size={19} /> Reveal My Surprise
        </button>
      </div>
    </section>
  );
}

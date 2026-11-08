"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { memories } from "@/data/memories";

export default function LoveTimeline() {
  return (
    <section id="story" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <Heart className="mx-auto mb-5 fill-rose-400 text-rose-400" />
          <p className="text-sm tracking-[0.3em] text-rose-400 uppercase">Our Journey</p>
          <h2 className="font-romantic mt-4 text-4xl font-bold md:text-5xl">Every Chapter Matters</h2>
          <p className="mt-4 text-[#927b83]">A few little moments from our beautiful story.</p>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-5 w-px bg-rose-200 md:left-1/2 md:-translate-x-1/2" />
          {memories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative mb-12 pl-14 md:w-1/2 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"}`}
            >
              <div className={`absolute top-5 left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#fff8f7] bg-rose-400 text-xs ${index % 2 === 0 ? "md:left-auto md:right-[-14px]" : "md:left-[-14px]"}`}>
                ♥
              </div>
              <div className="rounded-3xl border border-rose-100 bg-white/90 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="text-sm text-rose-400">{item.date}</span>
                <div className="my-3 text-3xl">{item.emoji}</div>
                <h3 className="font-romantic text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#927b83]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

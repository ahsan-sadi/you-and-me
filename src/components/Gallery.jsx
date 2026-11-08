"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/data/memories";

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  // Match the birthday popup: Escape closes the viewer, and the page behind
  // it should not scroll while it is open.
  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const changeImage = (direction) => {
    setSelected((current) => {
      const index = galleryImages.findIndex((image) => image.id === current.id);
      const next = (index + direction + galleryImages.length) % galleryImages.length;
      return galleryImages[next];
    });
  };

  return (
    <section id="gallery" className="bg-rose-50/70 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <Heart className="mx-auto mb-5 fill-rose-400 text-rose-400" />
          <p className="text-sm tracking-[0.3em] text-rose-400 uppercase">Our Little Universe</p>
          <h2 className="font-romantic mt-4 text-4xl font-bold md:text-5xl">Captured Forever</h2>
          <p className="mt-4 text-[#927b83]">Every picture tells a little story.</p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {galleryImages.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelected(image)}
              className={`group rounded-2xl bg-white p-3 text-left shadow-md transition hover:-translate-y-2 hover:shadow-xl ${index % 2 === 0 ? "-rotate-2" : "rotate-2"}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-rose-100">
                <Image src={image.src} alt={image.caption} fill sizes="(max-width: 768px) 45vw, 25vw" className="object-cover transition duration-500 group-hover:scale-110" />
              </div>
              <p className="mt-3 text-center font-romantic text-lg italic">{image.caption} ♡</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button type="button" onClick={() => setSelected(null)} className="absolute right-6 top-6 rounded-full bg-white/20 p-3 text-white" aria-label="Close gallery">
              <X />
            </button>
            <button type="button" onClick={(event) => { event.stopPropagation(); changeImage(-1); }} className="absolute left-3 rounded-full bg-white/20 p-3 text-white md:left-10" aria-label="Previous image">
              <ChevronLeft />
            </button>
            <motion.div key={selected.id} initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()} className="relative h-[75dvh] w-full max-w-2xl">
              <Image src={selected.src} alt={selected.caption} fill sizes="90vw" className="rounded-2xl object-contain" />
              <p className="absolute -bottom-9 w-full text-center text-white">{selected.caption} ❤️</p>
            </motion.div>
            <button type="button" onClick={(event) => { event.stopPropagation(); changeImage(1); }} className="absolute right-3 rounded-full bg-white/20 p-3 text-white md:right-10" aria-label="Next image">
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

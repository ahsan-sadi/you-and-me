"use client";

import { useRef, useState, useEffect } from "react";
import { Music2, Pause, Play } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      setError(false);
      await audio.play();
      setPlaying(true);
    } catch {
      setError(true);
      setPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setPlaying(false);
    const handleError = () => {
      setPlaying(false);
      setError(true);
    };
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/music/our_music.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-rose-200 bg-white px-5 py-4 text-rose-500 shadow-xl transition hover:scale-105"
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
        <Music2 size={18} className={playing ? "animate-bounce" : ""} />
        <span className="text-xs font-medium">
          {error
            ? "Add your song"
            : playing
              ? "Playing our song"
              : "Play our song"}
        </span>
      </button>
    </>
  );
}

import { Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#49343b] px-6 py-12 text-center text-white">
      <Heart className="mx-auto mb-4 fill-rose-400 text-rose-400" />
      <h2 className="font-romantic text-3xl">Forever & Always</h2>
      <p className="mt-4 text-sm text-rose-100/70">Made with love, just for you.</p>
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-rose-200">
        <Sparkles size={14} /> A little piece of my heart, on the internet. <Sparkles size={14} />
      </div>
      <p className="mt-8 text-xs text-rose-100/50">© {new Date().getFullYear()} Forever Us. All love reserved.</p>
    </footer>
  );
}

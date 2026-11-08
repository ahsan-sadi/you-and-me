"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { isAuthed, subscribeToAuth } from "@/lib/auth";
import BirthdayNote from "./BirthdayNote";

// Access is never granted during SSR, so the server snapshot is always false.
// useSyncExternalStore then re-reads the in-memory flag on the client without
// triggering React Compiler's setState-in-effect rule.
const serverSnapshot = () => false;

// Client-side gate: renders the home content only after the secret gate
// has been passed; otherwise redirects to /welcome.
export default function Gate({ children }) {
  const router = useRouter();
  const allowed = useSyncExternalStore(subscribeToAuth, isAuthed, serverSnapshot);

  useEffect(() => {
    if (!allowed) router.replace("/welcome");
  }, [allowed, router]);

  if (!allowed) {
    // Never render home content before the check resolves.
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fff8f7]">
        <Heart className="heart-pulse fill-rose-400 text-rose-400" size={44} />
      </div>
    );
  }

  return (
    <>
      {children}
      <BirthdayNote />
    </>
  );
}

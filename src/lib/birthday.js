import { birthday } from "@/data/siteConfig";

// True while the current local date is inside the birthday window
// (default: Nov 8 through Nov 9). `forceShow` in siteConfig overrides it.
// Call this from effects/event handlers, never during render
// (react-hooks/purity forbids `new Date()` in render).
export function isBirthdayWindow(now = new Date()) {
  if (birthday.forceShow) return true;
  const { month, startDay, endDay } = birthday.window;
  return (
    now.getMonth() + 1 === month &&
    now.getDate() >= startDay &&
    now.getDate() <= endDay
  );
}

import { useEffect, useState } from "react";

export function useTimeAgo(date: string | Date): string {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    function getTimeAgo(input: string | Date): string {
      // If input is already a time ago string, e.g. "2 minutes ago", return as is
      if (typeof input === "string" && input.match(/ago$/)) {
        return input;
      }

      const now = new Date();
      const past = new Date(input);
      const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1)
        return `${interval} year${interval > 1 ? "s" : ""} ago`;

      interval = Math.floor(seconds / 2592000);
      if (interval >= 1)
        return `${interval} month${interval > 1 ? "s" : ""} ago`;

      interval = Math.floor(seconds / 86400);
      if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

      interval = Math.floor(seconds / 3600);
      if (interval >= 1)
        return `${interval} hour${interval > 1 ? "s" : ""} ago`;

      interval = Math.floor(seconds / 60);
      if (interval >= 1)
        return `${interval} minute${interval > 1 ? "s" : ""} ago`;

      return "just now";
    }

    setTimeAgo(getTimeAgo(date));

    // Optional: update every minute to keep live
    const intervalId = setInterval(() => {
      setTimeAgo(getTimeAgo(date));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [date]);

  return timeAgo;
}

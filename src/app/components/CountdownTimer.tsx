"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div className="countdown-container">
        <div className="countdown-title">LOADING COUNTDOWN...</div>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <div className="countdown-wrapper">
        <div className="countdown-item">
          <span className="countdown-num">{String(timeLeft.days).padStart(2, "0")}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-divider">:</div>
        <div className="countdown-item">
          <span className="countdown-num">{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-divider">:</div>
        <div className="countdown-item">
          <span className="countdown-num">{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-divider">:</div>
        <div className="countdown-item">
          <span className="countdown-num">{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
}

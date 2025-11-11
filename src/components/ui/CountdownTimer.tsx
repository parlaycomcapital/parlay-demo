'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 69, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 69);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-3">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
      ].map((unit, i) => (
        <div key={i} className="text-center">
          <motion.div
            key={unit.value}
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold text-white/90 font-poppins tracking-tight"
          >
            {String(unit.value).padStart(2, '0')}
          </motion.div>
          <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}

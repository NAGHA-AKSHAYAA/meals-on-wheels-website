// src/components/Home.js
import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [days, setDays] = useState(0);
  const [souls, setSouls] = useState(0);

  useEffect(() => {
    // Calculate days from Dec 16, 2024 to today
    const startDate = new Date("2024-12-16");
    const today = new Date();
    const timeDiff = today - startDate;
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert ms to days
    const totalSouls = totalDays * 150;

    // Animate days count
    let i = 0;
    const dayInterval = setInterval(() => {
      if (i <= totalDays) {
        setDays(i);
        i++;
      } else {
        clearInterval(dayInterval);
      }
    }, 20); // adjust speed if needed

    // Animate souls count
    let j = 0;
    const soulStep = Math.ceil(totalSouls / totalDays); // 150
    const soulInterval = setInterval(() => {
      if (j <= totalSouls) {
        setSouls(j);
        j += soulStep;
      } else {
        clearInterval(soulInterval);
      }
    }, 20);

    return () => {
      clearInterval(dayInterval);
      clearInterval(soulInterval);
    };
  }, []);

  return (
    <div className="home-container" id="home">
      <div className="background"></div>
      <div className="overlay">
        <h2 className="heading">
          <span>{days.toLocaleString()}</span> days of feeding.
        </h2>
        <h2 className="heading">
          <span>{souls.toLocaleString()}</span> hungry souls nourished.
        </h2>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import "./App.css";

function App() {
  const cars = [
    {
      letter: "A",
      emoji: "🚚",
      consumption: 3,
    },
    {
      letter: "B",
      emoji: "🚗",
      consumption: 3.5,
    },
    {
      letter: "C",
      emoji: "🏎",
      consumption: 4,
    },
  ];
  const slope = 1.009;

  const [selectedConsuption, setSelectedConsuption] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speedA, setSpeedA] = useState(0);
  const [speedB, setSpeedB] = useState(0);
  const [calculete, setCalculate] = useState(false);

  const calculateDuration = (speed: number) => {
    const duration = distance / speed;
    const helperDate = new Date(0, 0);
    helperDate.setSeconds(+duration * 60 * 60);
    if (duration < 1) {
      return `${helperDate.toLocaleTimeString([], {
        minute: "2-digit",
      })}min`;
    } else {
      return `${helperDate.toLocaleTimeString([], {
        hour: "numeric",
      })}h ${helperDate.toLocaleTimeString([], {
        minute: "2-digit",
      })}min`;
    }
  };

  const calculateConsuption = (speed: number) => {
    return (selectedConsuption * Math.pow(slope, distance) * speed) / 100;
  };

  const calculateDurationDifference = (speed1: number, speed2: number) => {
    const difference = Math.abs(distance / speed2 - distance / speed1);
    const helperDate = new Date(0, 0);
    helperDate.setSeconds(+difference * 60 * 60);
    if (difference < 1) {
      return `${helperDate.toLocaleTimeString([], {
        minute: "2-digit",
      })}min`;
    } else {
      return `${helperDate.toLocaleTimeString([], {
        hour: "numeric",
      })}h ${helperDate.toLocaleTimeString([], {
        minute: "2-digit",
      })}min`;
    }
  };

  const calculateConsuptionDifference = (speed1: number, speed2: number) => {
    const difference = Math.abs(
      (selectedConsuption * Math.pow(slope, distance) * speed1) / 100 -
        (selectedConsuption * Math.pow(slope, distance) * speed2) / 100
    );
    return difference;
  };

  return (
    <div>
      <h1>Kulutuslaskuri</h1>
      <h2>Valitse autosi</h2>
      {cars.map((car) => {
        return (
          <div>
            <p>
              {car.emoji} Auto {car.letter} (Kulutus {car.consumption}l / 100km)
            </p>
            <input
              type="radio"
              value={car.consumption}
              onChange={() => setSelectedConsuption(car.consumption)}
            />
          </div>
        );
      })}
      <h2>Anna ajettava matka</h2>
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />
      <p>Anna ensimmäinen ajettava nopeus</p>
      <input
        type="number"
        value={speedA}
        onChange={(e) => setSpeedA(Number(e.target.value))}
      />
      <p>Anna toinen ajettava nopeus</p>
      <input
        type="number"
        value={speedB}
        onChange={(e) => setSpeedB(Number(e.target.value))}
      />
      <br />
      <button onClick={() => setCalculate(true)}>calculate</button>
      {calculete ? (
        <div>
          <p>
            Matka ensimmäisellä nopeudella kestää {calculateDuration(speedA)} ja
            kulutus on {calculateConsuption(speedA)}l.
          </p>
          <p>
            Matka toisella nopeudella kestää {calculateDuration(speedB)} ja
            kulutus on {calculateConsuption(speedB)}l.
          </p>
          <div>
            <p>
              Ensimmäinen nopeus on{" "}
              {calculateDurationDifference(speedA, speedB)}{" "}
              {speedA < speedB ? "hitaampi" : "nopeampi"} kuin toinen nopeus.
            </p>
            <p>
              Ensimmäinen nopeus kuluttaa{" "}
              {calculateConsuptionDifference(speedA, speedB)}l{" "}
              {speedA < speedB ? "vähemmän" : "enemmän"} bensaa kuin toinen
              nopeus.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;

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
    return distance / speed;
  };

  const calculateConsuption = (speed: number) => {
    return (selectedConsuption * Math.pow(slope, distance) * speed) / 100;
  };

  const calculateDurationDifference = (speed1: number, speed2: number) => {
    return distance / speed2 - distance / speed1;
  };

  const calculateConsuptionDifference = (speed1: number, speed2: number) => {
    return (
      (selectedConsuption * Math.pow(slope, distance) * speed1) / 100 -
      (selectedConsuption * Math.pow(slope, distance) * speed2) / 100
    );
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
            Matka ensimmäisellä nopeudella kestää {calculateDuration(speedA)}h
            ja kulutus on {calculateConsuption(speedA)}.
          </p>
          <p>
            Matka toisella nopeudella kestää {calculateDuration(speedB)}h ja
            kulutus on {calculateConsuption(speedB)}.
          </p>
          {speedA < speedB ? (
            <div>
              <p>
                Ensimmäinen nopeus on{" "}
                {calculateDurationDifference(speedB, speedA)}h hitaampi kuin
                toinen nopeus.
              </p>
              <p>
                Ensimmäinen nopeus kuluttaa{" "}
                {calculateConsuptionDifference(speedB, speedA)} vähemmän bensaa
                kuin toinen nopeus.
              </p>
            </div>
          ) : (
            <div>
              <p>
                Ensimmäinen nopeus on{" "}
                {calculateDurationDifference(speedA, speedB)}h nopeampi kuin
                toinen nopeus.
              </p>
              <p>
                Ensimmäinen nopeus kuluttaa{" "}
                {calculateConsuptionDifference(speedA, speedB)} enemmän bensaa
                kuin toinen nopeus.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default App;

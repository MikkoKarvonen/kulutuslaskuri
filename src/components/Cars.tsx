import React from "react";

const drawCar = (car: Cars, carEmoji: string, index: number) => {
  let duration = `5s`;
  if (car.speed) {
    duration = `${5 * car.speed}s`;
  }

  let carContainer = "carContainer";
  if (index === 0) {
    carContainer = `${carContainer} carContainerFirst`;
  }

  setTimeout(() => {
    Array.from(document.getElementsByClassName("carEmojiContainer")).map(
      (element) => {
        return element.classList.add("complete");
      }
    );
  }, 100);

  return (
    <div className={carContainer}>
      <span>🚦</span>
      <div className={car.class}>
        <div
          className="carEmojiContainer"
          style={{ transitionDuration: duration }}
        >
          <div className="carEmoji">{carEmoji}</div>
        </div>
      </div>
      <span>🏁</span>
      {}
    </div>
  );
};

interface Cars {
  class: string;
  speed?: number;
}

const drawCars = (speedA: number, speedB: number, carEmoji: string) => {
  const cars: Cars[] = [
    {
      class: "car1",
    },
    {
      class: "car2",
    },
  ];

  if (speedA > speedB) {
    cars[0].speed = 1;
    cars[1].speed = speedA / speedB;
  } else {
    cars[1].speed = 1;
    cars[0].speed = speedB / speedA;
  }

  return (
    <div className="track">
      {cars.map((car, index) => {
        return (
          <React.Fragment key={`car_${index}`}>
            {drawCar(car, carEmoji, index)}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default drawCars;

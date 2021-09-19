import { InputNumber, Radio, Space, Typography } from "antd";
import React from "react";
import Calculators from "./Calculators";
const { Text, Title } = Typography;

const slope = 1.009;

type OnChangeFunction = (e: any) => void;
type CarsType = {
  letter: string;
  emoji: string;
  consumption: number;
}[];
type SetterType = React.Dispatch<React.SetStateAction<number>>;

const renderCarSelector = (
  onChange: OnChangeFunction,
  selectedConsuption: number,
  cars: CarsType
) => {
  return (
    <React.Fragment>
      <Title level={2}>Valitse autosi</Title>
      <Radio.Group onChange={onChange} value={selectedConsuption}>
        <Space direction="vertical">
          {cars.map((car) => {
            return (
              <Radio value={car.consumption}>
                <p>
                  {car.emoji} Auto {car.letter} (Kulutus {car.consumption}l /
                  100km)
                </p>
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </React.Fragment>
  );
};

const renderDistanceSelector = (
  distance: number,
  setDistance: SetterType,
  minimum: number,
  maxDistance: number
) => {
  return (
    <React.Fragment>
      <div>
        <Space>
          <Title level={2}>Anna ajettava matka</Title>
          <Text type="secondary">1 - 5000</Text>
        </Space>
      </div>
      <div>
        <InputNumber
          defaultValue={distance}
          onChange={setDistance}
          min={minimum}
          max={maxDistance}
        />
        km
      </div>
    </React.Fragment>
  );
};

const renderSpeedSelector = (
  route: string,
  speed: number,
  setSpeed: SetterType,
  minimum: number,
  maxSpeed: number
) => {
  return (
    <React.Fragment>
      <div>
        <Space>
          <Title level={2}>Anna {route} ajettava nopeus</Title>
          <Text type="secondary">1 - 250</Text>
        </Space>
      </div>
      <div>
        <InputNumber
          defaultValue={speed}
          onChange={setSpeed}
          min={minimum}
          max={maxSpeed}
        />
        km/h
      </div>
    </React.Fragment>
  );
};

const renderSpeedSummary = (
  route: string,
  selectedConsuption: number,
  distance: number,
  speed: number
) => {
  return (
    <Text>
      Matka {route} nopeudella kestää{" "}
      <Text strong>{Calculators.calculateDuration(distance, speed)}</Text>
      ja kulutus on{" "}
      <Text strong>
        {Calculators.calculateConsuption(
          selectedConsuption,
          slope,
          distance,
          speed
        )}
        l
      </Text>
      .
    </Text>
  );
};

const renderDifference = (
  selectedConsuption: number,
  distance: number,
  speedA: number,
  speedB: number
) => {
  return (
    <React.Fragment>
      <Text>
        Ensimmäinen nopeus on{" "}
        <Text strong>
          {Calculators.calculateDurationDifference(distance, speedA, speedB)}{" "}
        </Text>
        {speedA < speedB ? "hitaampi" : "nopeampi"} kuin toinen nopeus.
      </Text>
      <Text>
        Ensimmäinen nopeus kuluttaa{" "}
        <Text strong>
          {Calculators.calculateConsuptionDifference(
            selectedConsuption,
            slope,
            distance,
            speedA,
            speedB
          )}
          l{" "}
        </Text>
        {speedA < speedB ? "vähemmän" : "enemmän"} bensaa kuin toinen nopeus.
      </Text>
    </React.Fragment>
  );
};

const functions = {
  renderCarSelector,
  renderDistanceSelector,
  renderSpeedSelector,
  renderSpeedSummary,
  renderDifference,
};

export default functions;

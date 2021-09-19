import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Button, Divider, Layout, Space, Typography } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
import LayoutParts from "./components/LayoutParts";
import drawCars from "./components/Cars";
const { Content } = Layout;
const { Text, Title } = Typography;

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
  const minimum = 1;
  const maxDistance = 5000;
  const maxSpeed = 250;

  const [selectedConsuption, setSelectedConsuption] = useState(
    cars[0].consumption
  );
  const [distance, setDistance] = useState(minimum);
  const [speedA, setSpeedA] = useState(minimum);
  const [speedB, setSpeedB] = useState(minimum);
  const [calculete, setCalculate] = useState(false);

  useEffect(() => {
    setCalculate(false);
  }, [selectedConsuption, distance, speedA, speedB]);

  const onChange = (e: any) => {
    setSelectedConsuption(e.target.value);
  };

  const speedValues = [
    {
      route: "ensimmäinen",
      summary: "ensimmäisellä",
      speed: speedA,
      setSpeed: setSpeedA,
    },
    {
      route: "toinen",
      summary: "toisella",
      speed: speedB,
      setSpeed: setSpeedB,
    },
  ];

  const carEmoji =
    (cars &&
      cars.find((car) => car.consumption === selectedConsuption)?.emoji) ||
    "🚓";

  return (
    <Layout className="layout">
      <Content className="content">
        <Title>Kulutuslaskuri</Title>
        <Divider />
        {LayoutParts.renderCarSelector(onChange, selectedConsuption, cars)}
        {LayoutParts.renderDistanceSelector(
          distance,
          setDistance,
          minimum,
          maxDistance
        )}
        {speedValues.map((speed, index) => {
          return (
            <React.Fragment key={`speed_${index}`}>
              {LayoutParts.renderSpeedSelector(
                speed.route,
                speed.speed,
                speed.setSpeed,
                minimum,
                maxSpeed
              )}
            </React.Fragment>
          );
        })}
        <Divider />
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          onClick={() => setCalculate(!calculete)}
          size={"large"}
          shape="round"
        >
          {!calculete ? "Laske" : "Piilota"}
        </Button>
        {calculete && (
          <div>
            <Divider />
            {drawCars(speedA, speedB, carEmoji)}
            <Space direction="vertical">
              {speedValues.map((speed, index) => {
                return (
                  <React.Fragment key={`summary_${index}`}>
                    {LayoutParts.renderSpeedSummary(
                      speed.summary,
                      selectedConsuption,
                      distance,
                      speed.speed
                    )}
                  </React.Fragment>
                );
              })}
              {speedA !== speedB ? (
                LayoutParts.renderDifference(
                  selectedConsuption,
                  distance,
                  speedA,
                  speedB
                )
              ) : (
                <Text>Nopeudet ovat samat.</Text>
              )}
            </Space>
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default App;

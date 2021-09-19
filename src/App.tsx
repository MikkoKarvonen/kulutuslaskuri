import { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Button, Divider, Layout, Space, Typography } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
import LayoutParts from "./components/LayoutParts";
const { Content } = Layout;
const { Title } = Typography;

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

  const [selectedConsuption, setSelectedConsuption] = useState(0);
  const [distance, setDistance] = useState(minimum);
  const [speedA, setSpeedA] = useState(minimum);
  const [speedB, setSpeedB] = useState(minimum);
  const [calculete, setCalculate] = useState(false);

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
        {speedValues.map((speed) => {
          return LayoutParts.renderSpeedSelector(
            speed.route,
            speed.speed,
            speed.setSpeed,
            minimum,
            maxSpeed
          );
        })}
        <Divider />
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          onClick={() => setCalculate(true)}
          size={"large"}
          shape="round"
        >
          Laske
        </Button>
        {calculete ? (
          <div>
            <Space direction="vertical">
              {speedValues.map((speed) => {
                return LayoutParts.renderSpeedSummary(
                  speed.summary,
                  selectedConsuption,
                  distance,
                  speed.speed
                );
              })}
              {LayoutParts.renderDifference(
                selectedConsuption,
                distance,
                speedA,
                speedB
              )}
            </Space>
          </div>
        ) : null}
      </Content>
    </Layout>
  );
}

export default App;

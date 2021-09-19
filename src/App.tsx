import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
  Button,
  Divider,
  InputNumber,
  Layout,
  Radio,
  Space,
  Typography,
} from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
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
  const slope = 1.009;
  const minimum = 1;
  const maxDistance = 5000;
  const maxSpeed = 250;

  const [selectedConsuption, setSelectedConsuption] = useState(0);
  const [distance, setDistance] = useState(minimum);
  const [speedA, setSpeedA] = useState(minimum);
  const [speedB, setSpeedB] = useState(minimum);
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
    const consuption =
      (selectedConsuption * Math.pow(slope, distance) * speed) / 100;
    return Math.round(consuption * 10) / 10;
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
    return Math.round(difference * 10) / 10;
  };

  const onChange = (e: any) => {
    setSelectedConsuption(e.target.value);
  };

  return (
    <Layout className="layout">
      <Content className="content">
        <Title>Kulutuslaskuri</Title>
        <Divider />
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
        <div>
          <Space>
            <Title level={2}>Anna ensimmäinen ajettava nopeus</Title>
            <Text type="secondary">1 - 250</Text>
          </Space>
        </div>
        <div>
          <InputNumber
            defaultValue={speedA}
            onChange={setSpeedA}
            min={minimum}
            max={maxSpeed}
          />
          km/h
        </div>
        <div>
          <Space>
            <Title level={2}>Anna toinen ajettava nopeus</Title>
            <Text type="secondary">1 - 250</Text>
          </Space>
        </div>
        <div>
          <InputNumber
            defaultValue={speedB}
            onChange={setSpeedB}
            min={minimum}
            max={maxSpeed}
          />
          km/h
        </div>
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
              <Text>
                Matka ensimmäisellä nopeudella kestää{" "}
                <Text strong>{calculateDuration(speedA)}</Text>
                ja kulutus on <Text strong>{calculateConsuption(speedA)}l</Text>
                .
              </Text>
              <Text>
                Matka toisella nopeudella kestää{" "}
                <Text strong>{calculateDuration(speedB)}</Text> ja kulutus on{" "}
                <Text strong>{calculateConsuption(speedB)}l</Text>.
              </Text>
              <Text>
                Ensimmäinen nopeus on{" "}
                <Text strong>
                  {calculateDurationDifference(speedA, speedB)}{" "}
                </Text>
                {speedA < speedB ? "hitaampi" : "nopeampi"} kuin toinen nopeus.
              </Text>
              <Text>
                Ensimmäinen nopeus kuluttaa{" "}
                <Text strong>
                  {calculateConsuptionDifference(speedA, speedB)}l{" "}
                </Text>
                {speedA < speedB ? "vähemmän" : "enemmän"} bensaa kuin toinen
                nopeus.
              </Text>
            </Space>
          </div>
        ) : null}
      </Content>
    </Layout>
  );
}

export default App;

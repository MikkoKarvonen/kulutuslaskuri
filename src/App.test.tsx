import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fireEvent } from "@testing-library/react";

test("returns values with defaults", () => {
  render(<App />);
  userEvent.click(screen.getByText("Laske"));
  const element = screen.getByText("Nopeudet ovat samat.");
  expect(element).toBeInTheDocument();
});

test("button hides results", () => {
  render(<App />);
  userEvent.click(screen.getByText("Laske"));
  const elementHide = screen.getByText("Piilota");
  expect(elementHide).toBeInTheDocument();
  userEvent.click(screen.getByText("Piilota"));
  const elementCalculate = screen.getByText("Laske");
  expect(elementCalculate).toBeInTheDocument();
});

test("distance input can be changed", () => {
  render(<App />);
  const distanceInput = screen.getByTestId("distance");
  fireEvent.change(distanceInput, { target: { value: "100" } });
  const distanceInputAfter = screen.getByTestId("distance");
  expect(distanceInputAfter).toHaveValue("100");
});

test("distance input can't be lower than 1", () => {
  render(<App />);
  const distanceInput = screen.getByTestId("distance");
  fireEvent.change(distanceInput, { target: { value: "-100" } });
  fireEvent.focusOut(distanceInput);
  const distanceInputAfter = screen.getByTestId("distance");
  expect(distanceInputAfter).toHaveValue("1");
});

test("distance input can't be higher than 5000'", () => {
  render(<App />);
  const distanceInput = screen.getByTestId("distance");
  fireEvent.change(distanceInput, { target: { value: "9000" } });
  fireEvent.focusOut(distanceInput);
  const distanceInputAfter = screen.getByTestId("distance");
  expect(distanceInputAfter).toHaveValue("5000");
});

test("speed inputs can be changed", () => {
  render(<App />);
  const [speedInputA, speedInputB] = screen.getAllByTestId("speed");
  fireEvent.change(speedInputA, { target: { value: "100" } });
  fireEvent.change(speedInputB, { target: { value: "150" } });
  const [speedInputAAfter, speedInputBAfter] = screen.getAllByTestId("speed");
  expect(speedInputAAfter).toHaveValue("100");
  expect(speedInputBAfter).toHaveValue("150");
});

test("speed inputs can't be lower than 1 or higher than 250", () => {
  render(<App />);
  const [speedInputA, speedInputB] = screen.getAllByTestId("speed");
  fireEvent.change(speedInputA, { target: { value: "-100" } });
  fireEvent.change(speedInputB, { target: { value: "500" } });
  fireEvent.focusOut(speedInputA);
  fireEvent.focusOut(speedInputB);
  const [speedInputAAfter, speedInputBAfter] = screen.getAllByTestId("speed");
  expect(speedInputAAfter).toHaveValue("1");
  expect(speedInputBAfter).toHaveValue("250");
});

test("values are calculated according to inputs", () => {
  render(<App />);
  const distanceInput = screen.getByTestId("distance");
  const [speedInputA, speedInputB] = screen.getAllByTestId("speed");
  fireEvent.change(distanceInput, { target: { value: "100" } });
  fireEvent.change(speedInputA, { target: { value: "1" } });
  fireEvent.change(speedInputB, { target: { value: "100" } });
  userEvent.click(screen.getByText("Laske"));
  const hasTextSpeed1 = (node: Element) =>
    node.textContent === "100h ja kulutus on 3l." || node.textContent
      ? node.textContent.match("100h ja kulutus on 3l.")
      : null;
  const hasTextSpeed2 = (node: Element) =>
    node.textContent === "1h ja kulutus on 7.3l." || node.textContent
      ? node.textContent.match("1h ja kulutus on 7.3l.")
      : null;
  const hasTextCompare1 = (node: Element) =>
    node.textContent === "3h 0min hitaampi" || node.textContent
      ? node.textContent.match("3h 0min hitaampi")
      : null;
  const hasTextCompare2 = (node: Element) =>
    node.textContent === "4.3l vähemmän" || node.textContent
      ? node.textContent.match("4.3l vähemmän")
      : null;
});

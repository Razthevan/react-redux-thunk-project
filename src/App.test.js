import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./components/Campaigns", () => () => <p>Campaigns</p>);
jest.mock("./components/Header", () => () => <p>Header</p>);

describe("App.js - basic behaviour", () => {
  it("Renders the Campaigns and Header components", () => {
    const { getByText } = render(<App />);
    const campaigns = getByText("Campaigns");
    const header = getByText("Header");

    expect(campaigns).toBeInTheDocument();
    expect(header).toBeInTheDocument();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import Campaign from "./Campaign";
import theme from "../theme/theme";

describe("Campaign", () => {
  it("Renders all the information related to a campaign", () => {
    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <Campaign campaign={campaign} />
      </ThemeProvider>
    );
    expect(getByText(campaign.title)).toBeInTheDocument();
    expect(getByText(campaign.reward)).toBeInTheDocument();
    campaign.channels.forEach((channel) =>
      expect(getByAltText(channel.channel.name)).toBeInTheDocument()
    );
  });
});

const campaign = {
  id: 1076,
  title: "UGG handschoenen - kerstactie Van den Assem",
  image:
    "http://ilfb-api.test.are.builders/images/11101/df71145ea9b9342c706ca41a936088dd",
  brand: {
    id: 1300,
    name: "Van den Assem",
    image:
      "http://ilfb-api.test.are.builders/images/11098/509e74b4d33768ea38f577b316bb09c5",
  },
  reward:
    "Een paar UGG handschoenen (t.w.v €149,95) en een kerstbal van Vondels, speciaal gemaakt voor Van den Assem.",
  channels: [
    {
      id: 3691,
      reach: "10000_20000",
      channel: {
        id: 2,
        name: "Instagram",
        slug: "instagram",
      },
    },
  ],
};

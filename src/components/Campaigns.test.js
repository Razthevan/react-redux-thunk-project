import React from "react";
import { ThemeProvider } from "styled-components";
import { render, fireEvent, act } from "@testing-library/react";

import { Campaigns } from "./Campaigns";
import theme from "../components/theme/theme";

jest.mock("react-select", () => ({ options, value, onChange }) => {
  function handleChange(event) {
    const option = options.find(
      (option) => option.value === event.currentTarget.value
    );
    onChange(option);
  }

  return (
    <select data-testid="select" value={value} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

const fetchCampaigns = jest.fn();
// TODO: investigate why act complains about returning true and remove the console.error suppression
jest.spyOn(console, "error").mockImplementation(() => {});

describe("Campaigns behaviour", () => {
  const instagramCampaignTitle = "UGG handschoenen - kerstactie Van den Assem";
  const googleAnalyticsCampaignTitle = "In-store blogger event in Antwerpen";

  it("Shows the loading message when campaigns are being fetched", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Campaigns isFetching={true} fetchCampaigns={fetchCampaigns} />
      </ThemeProvider>
    );
    const loadingText = getByText("Loading campaigns");
    expect(loadingText).toBeInTheDocument();
    expect(fetchCampaigns).toHaveBeenCalledTimes(1);
  });

  it("Shows the error message when an error has occurred", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Campaigns
          isFetching={false}
          fetchCampaigns={fetchCampaigns}
          error={"That's disappointing"}
        />
      </ThemeProvider>
    );
    const loadingText = getByText(
      "No campaigns available at this moment. Please try again later"
    );
    expect(loadingText).toBeInTheDocument();
  });

  it("Renders the correct number of campaigns in relationship with the applied filters", () => {
    const { getByText, queryByTestId, queryByText } = render(
      <ThemeProvider theme={theme}>
        <Campaigns
          error={null}
          isFetching={false}
          campaigns={campaigns}
          fetchCampaigns={fetchCampaigns}
        />
      </ThemeProvider>
    );

    //   Renders two campaigns
    campaigns.forEach((campaign) =>
      expect(getByText(campaign.title)).toBeInTheDocument()
    );

    //   Select only instagram campaigns
    act(() =>
      fireEvent.change(queryByTestId("select"), {
        target: { value: "instagram" },
      })
    );

    // Only instagram campaigns are visible
    expect(getByText(instagramCampaignTitle)).toBeInTheDocument();
    expect(queryByText(googleAnalyticsCampaignTitle)).not.toBeInTheDocument();

    act(() =>
      fireEvent.change(queryByTestId("select"), {
        target: { value: "all" },
      })
    );

    // All campaigns are visible
    campaigns.forEach((campaign) =>
      expect(getByText(campaign.title)).toBeInTheDocument()
    );
  });
});

const campaigns = [
  {
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
  },
  {
    id: 1077,
    title: "In-store blogger event in Antwerpen",
    image:
      "http://ilfb-api.test.are.builders/images/11120/47f7d24b7eea6ce340d9534de3966489",
    brand: {
      id: 639,
      name: "The Body Shop",
      image:
        "http://ilfb-api.test.are.builders/images/790/edf1a2334f1c48fa63aedb76cffa47a1",
    },
    reward: "Je ontvangt een leuke goodie bag na afloop van het event",
    channels: [
      {
        id: 3704,
        reach: "5000_10000",
        channel: {
          id: 5,
          name: "Google Analytics (Blog)",
          slug: "google-analytics",
        },
      },
    ],
  },
];

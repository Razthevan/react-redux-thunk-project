import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import { connect } from "react-redux";
import styled, { withTheme } from "styled-components";

import Campaign from "./campaigns/Campaign";
import fetchCampaigns from "../redux/actions";

const ALL_CAMPAIGNS = "all";

const propTypes = {
  theme: PropTypes.object,
  campaigns: PropTypes.array,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchCampaigns: PropTypes.func.isRequired,
};

export const Campaigns = ({
  error,
  theme,
  isFetching,
  fetchCampaigns,
  campaigns = [],
}) => {
  const [campaignsFilter, setCampaignsFilter] = useState(ALL_CAMPAIGNS);
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const campaignsToRender = useMemo(() => {
    if (!campaigns.length) {
      return [];
    }
    if (campaignsFilter === ALL_CAMPAIGNS) {
      return campaigns;
    } else {
      return campaigns.filter((campaign) =>
        campaign.channels.find(
          (channel) => channel.channel.slug === campaignsFilter
        )
      );
    }
  }, [campaigns, campaignsFilter]);

  if (isFetching) {
    return (
      <CampaignsContainer>
        <Heading>Loading campaigns</Heading>
      </CampaignsContainer>
    );
  }
  if (error) {
    return (
      <CampaignsContainer>
        <Heading>
          No campaigns available at this moment. Please try again later
        </Heading>
      </CampaignsContainer>
    );
  }

  const availableCampaignsChannelOptions = generateSelectOptions(campaigns);
  const onSelectOptionChange = (option) => setCampaignsFilter(option.value);

  return (
    <CampaignsContainer>
      <CampaignsInfo>
        <Heading>Marketplace</Heading>
        <Select
          width="300px"
          appTheme={theme}
          styles={selectStyles}
          defaultValue={{
            value: ALL_CAMPAIGNS,
            label: "All campaigns",
          }}
          onChange={onSelectOptionChange}
          options={availableCampaignsChannelOptions}
          components={{ IndicatorSeparator: () => null }}
          menuPortalTarget={document.querySelector("body")}
        />
      </CampaignsInfo>

      <CampaignsWrapper>
        {campaignsToRender.map((campaign, i) => (
          <Campaign key={campaign.id + Math.random()} campaign={campaign} />
        ))}
      </CampaignsWrapper>
    </CampaignsContainer>
  );
};

const CampaignsContainer = styled.div`
  width: 80%;
  margin: auto;
`;

const Heading = styled.h1`
  padding: 40px 0;
  size: ${(props) => props.theme.fontSizes.h1};
`;

const CampaignsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 40px;
  }
`;

const CampaignsWrapper = styled.div`
  display: grid;
  grid-gap: 40px;
  margin-bottom: 40px;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "200px",
    borderRadius: "6px",
    border: `1px solid ${(state) =>
      state.isOpen
        ? state.selectProps.appTheme.colors.lightGrey
        : state.selectProps.appTheme.colors.influentialsBlue} `,
  }),
  valueContainer: (provided) => ({
    ...provided,
    fontSize: "14px",
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const generateSelectOptions = (campaigns = []) => {
  if (!campaigns.length) {
    return {};
  }
  const options = [];
  campaigns.map((campaign) =>
    campaign.channels.map((channel) => {
      const isChannelMapped = options.find(
        (option) => option.value === channel.channel.slug
      );
      if (isChannelMapped) {
        // If a channel has already been added as an option, don't push it again
        return null;
      }
      return options.push({
        value: channel.channel.slug,
        label: channel.channel.name,
      });
    })
  );
  options.push({
    value: ALL_CAMPAIGNS,
    label: "All campaigns",
  });

  return options.reverse();
};

const mapStateToProps = (state) => {
  const { campaigns, isFetching, error } = state;
  return { campaigns, isFetching, error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampaigns: () => dispatch(fetchCampaigns()),
  };
};

Campaigns.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Campaigns));

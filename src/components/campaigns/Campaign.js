import React from "react";
import numbro from "numbro";
import PropTypes from "prop-types";
import styled from "styled-components";

import instagramLogo from "./campaign/instagram.svg";
import googleAnalyticsLogo from "./campaign/googleAnalytics.svg";

const INSTAGRAM_ID = 2;
const GOOGLE_ANALYTICS_ID = 5;

const campaignChannelLogo = {
  [INSTAGRAM_ID]: instagramLogo,
  [GOOGLE_ANALYTICS_ID]: googleAnalyticsLogo,
};

const campaignChannelMetric = {
  [INSTAGRAM_ID]: "followers",
  [GOOGLE_ANALYTICS_ID]: "visitors",
};

const propTypes = { campaign: PropTypes.object };

const Campaign = ({ campaign = {} }) => (
  <Card>
    <CampaignImageSection>
      <CampaignMainImage src={campaign.image} alt={""} />
    </CampaignImageSection>
    <CampaignDetailsSection>
      <div>
        <CampaignTitle>{campaign.title}</CampaignTitle>
        <CampaignReward>{campaign.reward}</CampaignReward>
      </div>
      <CampaignBrandImage
        src={campaign.brand.image}
        alt={campaign.brand.name}
      />
    </CampaignDetailsSection>
    <CampaignPlatformsSection>
      {campaign.channels.map((channel) => {
        return (
          <CampaignChannelsSection key={channel.id}>
            <ChannelImage
              src={campaignChannelLogo[channel.channel.id]}
              alt={channel.channel.name}
            />
            <ChannelText>
              <span>From </span>
              <span>
                {channel.reach
                  .split("_")
                  .map((range) =>
                    numbro(range).format({
                      average: true,
                      mantissa: 0,
                    })
                  )
                  .join(" to ")}
              </span>
              <span> {campaignChannelMetric[channel.channel.id]}</span>
            </ChannelText>
          </CampaignChannelsSection>
        );
      })}
    </CampaignPlatformsSection>
  </Card>
);

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0px 2px 16px 0 rgba(0, 0, 0, 0.08);
`;

const CampaignImageSection = styled.div`
  width: 100%;
  height: 300px;
`;

const CampaignMainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CampaignDetailsSection = styled.div`
  height: 100%;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const CampaignTitle = styled.p`
  margin: 5px 0;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSizes.campaignTitle};
`;

const CampaignReward = styled.p`
  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.fontSizes.campaignReward};
`;

const CampaignBrandImage = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border-radius: 50%;
`;

const CampaignPlatformsSection = styled.div`
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const CampaignChannelsSection = styled.div`
  display: flex;
  align-items: center;
`;

const ChannelImage = styled.img`
  margin-right: 5px;
`;

const ChannelText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.socialMediaNumbers};
`;

Campaign.propTypes = propTypes;

export default Campaign;

import "isomorphic-fetch";

export const FETCH_CAMPAIGNS_PENDING = "FETCH_CAMPAIGNS_PENDING";
export const FETCH_CAMPAIGNS_SUCCESS = "FETCH_CAMPAIGNS_SUCCESS";
export const FETCH_CAMPAIGNS_ERROR = "FETCH_CAMPAIGNS_ERROR";

const API_URL =
  "https://9370fa24-a918-4d84-8c0e-de3d38971a35.mock.pstmn.io/api/v2/influencers/campaigns";

const fetchCampaignsPending = () => {
  return {
    type: FETCH_CAMPAIGNS_PENDING,
  };
};
const fetchCampaignsSuccess = (campaigns) => {
  return {
    type: FETCH_CAMPAIGNS_SUCCESS,
    campaigns,
  };
};

const fetchCampaignsError = (error) => {
  return { type: FETCH_CAMPAIGNS_ERROR, error };
};

const fetchCampaigns = () => {
  return (dispatch) => {
    dispatch(fetchCampaignsPending());
    return fetch(API_URL)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        return dispatch(fetchCampaignsSuccess(res.data.campaigns));
      })
      .catch((error) => {
        return dispatch(fetchCampaignsError(error));
      });
  };
};

export default fetchCampaigns;

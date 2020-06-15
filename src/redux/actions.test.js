import expect from "expect";
import thunk from "redux-thunk";
import fetchMock from "jest-fetch-mock";
import configureMockStore from "redux-mock-store";

import fetchCampaigns, {
  FETCH_CAMPAIGNS_ERROR,
  FETCH_CAMPAIGNS_PENDING,
  FETCH_CAMPAIGNS_SUCCESS,
} from "./actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Fetching campaigns", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("Dispatches FETCH_CAMPAIGNS_SUCCESS upon successful campaigns fetching ", () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ data: { campaigns: [{ title: "do something" }] } })
    );
    const expectedActions = [
      { type: FETCH_CAMPAIGNS_PENDING },
      {
        type: FETCH_CAMPAIGNS_SUCCESS,
        campaigns: [{ title: "do something" }],
      },
    ];
    const store = mockStore({ campaigns: [] });

    return store.dispatch(fetchCampaigns()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Handles API errors by dispatching the FETCH_CAMPAIGN_ERROR action", () => {
    fetchMock.mockReject(() => Promise.reject("API is down"));
    const expectedActions = [
      { type: FETCH_CAMPAIGNS_PENDING },
      {
        type: FETCH_CAMPAIGNS_ERROR,
        error: "API is down",
      },
    ];
    const store = mockStore({ campaigns: [] });

    return store.dispatch(fetchCampaigns()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

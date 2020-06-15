import rootReducer, { initialState } from "./rootReducer";
import {
  FETCH_CAMPAIGNS_ERROR,
  FETCH_CAMPAIGNS_PENDING,
  FETCH_CAMPAIGNS_SUCCESS,
} from "./actions";

describe("Root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({
      isFetching: false,
      campaigns: [],
      error: null,
    });
  });

  it("should handle FETCH_CAMPAIGNS_PENDING", () => {
    expect(
      rootReducer(initialState, {
        type: FETCH_CAMPAIGNS_PENDING,
      })
    ).toEqual({ ...initialState, isFetching: true });
  });
  it("should handle FETCH_CAMPAIGNS_SUCCESS", () => {
    const campaigns = ["Campaigns"];
    expect(
      rootReducer(initialState, {
        type: FETCH_CAMPAIGNS_SUCCESS,
        campaigns: campaigns,
      })
    ).toEqual({ ...initialState, isFetching: false, campaigns: campaigns });
  });
  it("should handle FETCH_CAMPAIGNS_ERROR", () => {
    const error = "Something not desirable :)";
    expect(
      rootReducer(initialState, {
        type: FETCH_CAMPAIGNS_ERROR,
        error: error,
      })
    ).toEqual({ ...initialState, isFetching: false, error: error });
  });
});

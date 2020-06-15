import {
  FETCH_CAMPAIGNS_PENDING,
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_CAMPAIGNS_ERROR,
} from "./actions";

export const initialState = {
  isFetching: false,
  campaigns: [],
  error: null,
};

const campaignsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAMPAIGNS_PENDING:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        campaigns: action.campaigns,
      };
    case FETCH_CAMPAIGNS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default campaignsReducer;

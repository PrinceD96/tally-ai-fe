import axiosWithYelpAuth from "../utils/axiosWithYelpAuth";

export const FETCH_BUSINESS_START = "FETCH_BUSINESS_START";
export const FETCH_BUSINESS_SUCCESS = "FETCH_BUSINESS_SUCCESS";
export const FETCH_BUSINESS_FAILURE = "FETCH_BUSINESS_FAILURE";
export const POST_BUSINESS_START = "POST_BUSINESS_START";
export const POST_BUSINESS_SUCCESS = "POST_BUSINESS_SUCCESS";
export const POST_BUSINESS_FAILURE = "POST_BUSINESS_FAILURE";

export const fetchBusiness = ({ name, location }) => {
  const yelpSearchEndpoint = `https://api.yelp.com/v3/businesses/search?term=${name}&location=${location}`;
  return dispatch => {
    dispatch({ type: FETCH_BUSINESS_START });
    axiosWithYelpAuth
      .get(yelpSearchEndpoint)
      .then(res => {
        dispatch({
          type: FETCH_BUSINESS_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_BUSINESS_FAILURE,
          payload: err
        });
      });
  };
};

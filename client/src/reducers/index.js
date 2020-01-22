import {
  // Yelp Business Search
  FETCH_BUSINESS_START,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  // Select business from results
  ADD_BUSINESS,
  // Data for TopBottomWords
  FETCH_TOP_AND_BOTTOM_START,
  FETCH_TOP_AND_BOTTOM_SUCCESS,
  FETCH_TOP_AND_BOTTOM_FAILURE,
  // Registration
  FETCH_ADDNEWUSER_SUCCESS,
  // Login
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  // Edit Account
  FETCH_EDITACCOUNT_START,
  FETCH_EDITACCOUNT_SUCCESS,
  FETCH_EDITACCOUNT_FAILURE,
  // Data for PhraseRank
  FETCH_WORDS_OVER_TIME_START,
  FETCH_WORDS_OVER_TIME_SUCCESS,
  FETCH_WORDS_OVER_TIME_FAILURE,
  // Data for ReviewFrequency
  FETCH_REVIEWS_OVER_TIME_START,
  FETCH_REVIEWS_OVER_TIME_SUCCESS,
  FETCH_REVIEWS_OVER_TIME_FAILURE,
  // Data for RatingOverTime
  FETCH_RATING_OVER_TIME_START,
  FETCH_RATING_OVER_TIME_SUCCESS,
  FETCH_RATING_OVER_TIME_FAILURE,

  SET_ACTIVE_WIDGETS,
  SET_FAVORITES_START,
  SET_FAVORITES_SUCCESS,
  SET_FAVORITES_FAILURE
} from "../actions/index.js";

import dummyWordsOverTime from "../dummyData/dummyWordsOverTime";
import dummyReviewsOverTime from "../dummyData/dummyReviewsOverTime";

import { widgets } from "../components/WidgetSystem/WidgetRegistry"

const initialState = {
  loggedInUser: {
    userID: null
  },
  //past favorites should be added to state when they log in. when the user favorites/unfavorites, send to backend and update state with list of favorites returned from backend.
  favorites: {
    isSetting: false,
    error: null,
    favorites: [{
      // for DS API calls
      businessId: "19878f9d6s77237-asd",
      // for side bar
      businessName: "Example Business",
      businessImg: "https://assets.entrepreneur.com/franchise/282553-cover-image-1564755271.jpeg?width=800",
      // for top-of-page info cards
      reviewCount: 0,
      averageRating: 0,
      changeInRating: ""
    },
    {
      // for DS API calls
      businessId: "19878f9d6s77237-asd",
      // for side bar
      businessName: "VERAMEAT",
      businessImg: "https://www.shopkeep.com/wp-content/uploads/2016/07/retail-store_retail-business-plan-e1468443541681.jpg",
      // for top-of-page info cards
      reviewCount: 0,
      averageRating: 0,
      changeInRating: ""
    },    {
      // for DS API calls
      businessId: "19878f9d6s77237-asd",
      // for side bar
      businessName: "Bicycles",
      businessImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTshfmpFtjour-4iJgDPY7uZ0Ki3Kua13zPonqqdiSAu27YFsW48Q&s",
      // for top-of-page info cards
      reviewCount: 0,
      averageRating: 0,
      changeInRating: ""
    }]//array of businesses
  },

  searchResults: {
    isFetching: false,
    error: null,
    data: null
  },
  // Business information from the Yelp API
  businessInfo: {
    // for DS API calls
    businessId: null,
    // for side bar
    businessName: null,
    businessImg: null,
    // for top-of-page info cards
    reviewCount: 0,
    averageRating: 0,
    changeInRating: ""
  },

  //Defaults to [widgets[0].name, widgets[1].name]. Later we can load some saved dashboard widgets from the db (should still have a default value here so they don't start out with an empty dashboard)
  //Array order really matters with activeWidgets, since it determines in which order they'll render. When the user drags an element to a new position on the screen, we need to translate that position to array position
  activeWidgets: [widgets[0].name, widgets[1].name],

  // Data for populating the visuals
  widgetData: {
    // TopBottomWords
    keyWords: {
      isFetching: false,
      error: null,
      data: {
        positive: [{ term: "apple" }, { term: "banana" }],
        negative: [{ term: "orange" }, { term: "kiwi" }]
      }
    },
    // PhraseRank
    wordsOverTime: {
      isFetching: false,
      error: null,
      data: null
    },
    // ReviewFrequency
    reviewsOverTime: {
      isFetching: false,
      error: null,
      data: null
    },
    // RatingOverTime
    ratingOverTime: {
      isFetching: false,
      error: null,
      data: null
    }
  }
};

function reducer(state = initialState, action) {
  console.log(
    "Reducer working, current action: ",
    action.type,
    " Payload: ",
    action.payload
  );

  switch (action.type) {
    // Yelp Business Search
    case FETCH_BUSINESS_START:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          isFetching: true,
          error: null
        }
      };
    case FETCH_BUSINESS_SUCCESS:
      console.log("FETCH SUCCESS! Payload:", action.payload);
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          isFetching: false,
          // data: action.payload
          data: action.payload.data.businesses,
          error: null
        }
      };
    case FETCH_BUSINESS_FAILURE:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          isFetching: false,
          error: action.payload
        }
      };

    // Select business
    case ADD_BUSINESS:
      return {
        ...state,
        businessInfo: { ...action.payload }
      };
    case SET_ACTIVE_WIDGETS:
      return {
        ...state,
        activeWidgets: action.payload
      };
    case SET_FAVORITES_START:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isSetting: true,
          error: null
        }
      };
    case SET_FAVORITES_SUCCESS:
      console.log("REDUCER SETTING FAVS", action.payload);
      return {
        ...state,
        favorites: {
          favorites: action.payload,
          isSetting: false,
          error: null
        }
      };
    case SET_FAVORITES_FAILURE:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isSetting: false,
          error: action.payload
        }
      };
    // TopBottomWords
    case FETCH_TOP_AND_BOTTOM_START:
      console.log("Fetch top and bottom words start..");
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          keyWords: { ...state.widgetData.keyWords, isFetching: true, error: null }
        }
      };
    case FETCH_TOP_AND_BOTTOM_SUCCESS:
      console.log(
        "Successfully fetched top and bottom ten words:\n",
        action.payload
      );
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          keyWords: {
            isFetching: false,
            data: action.payload,
            error: null
          }
        }
      };
    case FETCH_TOP_AND_BOTTOM_FAILURE:
      console.log("Fetch top and bottom failure:\n", action.payload);
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          keyWords: {
            ...state.widgetData.keyWords,
            isFetching: false,
            error: action.payload
          }
        }
      };

    // Registration
    case FETCH_ADDNEWUSER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: ""
      };

    // Login
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        loggedUser: action.payload
      }
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    
    // Edit Account
    case FETCH_EDITACCOUNT_START:
      return {
        ...state,
        isFetching: true,
        error: ""
      }
    case FETCH_EDITACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        loggedUserInfo: action.payload
      }
    case FETCH_EDITACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    // PhraseRank
    case FETCH_WORDS_OVER_TIME_START:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          wordsOverTime: {
            ...state.widgetData.wordsOverTime,
            isFetching: true,
            error: null
          }
        }
      };
    case FETCH_WORDS_OVER_TIME_SUCCESS:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,

          wordsOverTime: {
            ...state.widgetData.wordsOverTime,
            isFetching: false,
            data: action.payload.data,
            error: null
          }
        }
      };
    case FETCH_WORDS_OVER_TIME_FAILURE:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,

          wordsOverTime: {
            ...state.widgetData.wordsOverTime,
            isFetching: false,
            error: action.payload
          }
        }
      };

    // ReviewFrequency
    case FETCH_REVIEWS_OVER_TIME_START:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          reviewsOverTime: {
            ...state.widgetData.reviewsOverTime,
            isFetching: true,

            error: null
          },
        }
      };
    case FETCH_REVIEWS_OVER_TIME_SUCCESS:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          reviewsOverTime: {
            ...state.widgetData.reviewsOverTime,
            isFetching: false,
            data: action.payload.data
          },
        }
      };
    case FETCH_REVIEWS_OVER_TIME_FAILURE:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          reviewsOverTime: {
            ...state.widgetData.reviewsOverTime,
            isFetching: true,
            data: null,
            error: action.payload
          },
        }
      };

    // RatingOverTime
    case FETCH_RATING_OVER_TIME_START:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          ratingOverTime: {
            ...state.widgetData.ratingOverTime,
            isFetching: true,
            error: null
          }
        }
      };
    case FETCH_RATING_OVER_TIME_SUCCESS:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,

          ratingOverTime: {
            ...state.widgetData.ratingOverTime,
            isFetching: false,
            data: action.payload.star_data,
            error: null
          }
        }
      };
    case FETCH_RATING_OVER_TIME_FAILURE:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,

          ratingOverTime: {
            ...state.widgetData.ratingOverTime,
            isFetching: false,
            error: action.payload
          }
        }
      };


    // Unknown action type (default)
    default:
      console.log(`\nUnknown action type:\n${action.type}`);
      return {
        ...state
      };
  }
}

export default reducer;

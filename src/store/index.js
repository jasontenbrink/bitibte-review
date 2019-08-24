import { init } from "@rematch/core";
import apis from "../apis/mockApis";
import logger from "redux-logger";

const store = init({
  models: {
    reviews: {
      state: [],
      reducers: {
        setReviews(state, payload) {
          return payload;
        }
      },
      effects: dispatch => ({
        async getReviewsAndSetSelected(payload, rootState) {
          // api call for getting reviews
          const reviews = await apis.getReviews();
          dispatch.reviews.setReviews(reviews);
          dispatch.selectedReview.setSelectedReview(reviews[0].uuid);
        },
        async postReview(payload, rootState) {
          const response = await apis.postReview(payload);
        }
      })
    },
    selectedReview: {
      state: null,
      reducers: {
        setSelectedReview(state, payload) {
          return payload;
        }
      }
    },
    questions: {
      state: [],
      reducers: {
        setQuestions(state, payload) {
          return payload;
        }
      },
      effects: dispatch => ({
        async getQuestions(payload, rootState) {
          const questions = await apis.getQuestions();
          console.log(payload, rootState);
          dispatch.questions.setQuestions(questions);
        }
      })
    },
    user: {
      state: {
        loggedIn: false,
        username: "",
        firstName: "",
        lastName: "",
        userUuid: "",
        email: ""
      },
      // state: {
      //   loggedIn: true,
      //   username: "bison",
      //   firstName: "Jason",
      //   lastName: "Tenbrink",
      //   userUuid: "1111",
      //   email: "jason@awesome.com"
      // },
      reducers: {
        setUser(state, payload) {
          return payload;
        }
      },
      effects: dispatch => ({
        async login(payload, rootState) {
          await apis.login(payload);
        }
      })
    }
  },
  redux: {
    middlewares: [logger]
  }
});

export const { dispatch } = store;

export default store;

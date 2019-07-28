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
        async getReviews(payload, rootState) {
          // api call for getting reviews
          const reviews = await apis.getReviews();
          dispatch.reviews.setReviews(reviews);
        },
        async postReview(payload, rootState) {
          const response = await apis.postReview(payload);
          // dispatch isLoading false?
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
    }
  },
  redux: {
    middlewares: [logger]
  }
});

export const { dispatch } = store;

export default store;

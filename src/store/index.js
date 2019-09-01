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
          dispatch.call.setCall({ isFetching: true, error: "" });
          try {
            await apis.postReview(payload);
            dispatch.call.setCall({ isFetching: false, error: "" });
            dispatch.app.setNotifcation({
              notification: "Review successfully saved"
            });
          } catch (e) {
            dispatch.call.setCall({ isFetching: false, error: e });
          }
        },
        async updateReview(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            await apis.updateReview(payload);
            dispatch.app.setNotifcation({
              notification: "Review successfully updated"
            });
          } catch (e) {
            dispatch.call.setCall({ isfetching: false, error: e });
          }
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
        email: "",
        reviews: []
      },
      // state: {
      //   loggedIn: true,
      //   username: "bison",
      //   firstName: "Jason",
      //   lastName: "Tenbrink",
      //   userUuid: "1111",
      //   email: "jason@awesome.com",
      //   reviews: apis.userReviews
      // },
      reducers: {
        setUser(state, payload) {
          return payload;
        },
        deleteReviewFromStore(state, uuid) {
          console.log("state", state);
          const reviews = state.reviews.filter(review => review.uuid !== uuid);
          return { ...state, reviews };
        }
      },
      effects: dispatch => ({
        async login(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            const result = await apis.login(payload);
            dispatch.user.setUser({ ...result, loggedIn: true });
            dispatch.call.setCall({ isfetching: false, error: "" });
          } catch (e) {
            dispatch.call.setCall({ isfetching: false, error: e });
          }
        },
        async register(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            const result = await apis.login(payload);
            dispatch.user.setUser({ ...result, loggedIn: true });
            dispatch.call.setCall({ isfetching: false, error: "" });
          } catch (e) {
            dispatch.call.setCall({ isfetching: false, error: e });
          }
        },
        async resetPassword(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            await apis.resetPassword(payload);
            dispatch.app.setNotifcation({
              notification: "Check your email for your new password"
            });
          } catch (e) {
            dispatch.call.setCall({ isfetching: false, error: e });
          }
        },
        async deleteReview(uuid, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            await apis.deleteReview(uuid);
            dispatch.app.setNotifcation({
              notification: "Review successfully deleted"
            });
            dispatch.user.deleteReviewFromStore(uuid);
          } catch (e) {
            dispatch.call.setCall({ isfetching: false, error: e });
          }
        }
      })
    },
    call: {
      state: { isfetching: false, error: "" },
      reducers: {
        setCall(state, payload) {
          return payload;
        }
      }
    },
    app: {
      state: { notification: "" },
      reducers: {
        setNotifcation(state, payload) {
          return payload;
        }
      },
      effects: dispatch => ({
        async provideFeedback(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            await apis.provideFeedback(payload);
            dispatch.app.setNotifcation({
              notification: "Thanks for your help!"
            });
          } catch (e) {
            dispatch.call.setCall({ isfetching: false, error: e });
          }
        }
      })
    },
    vendor: {
      state: {},
      reducers: {},
      effects: dispatch => ({
        async suggestVendor(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            await apis.suggestVendor(payload);
            dispatch.app.setNotifcation({
              notification: "Thanks for your help!"
            });
          } catch (e) {
            dispatch.call.setCall({ isfetching: false, error: e });
          }
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

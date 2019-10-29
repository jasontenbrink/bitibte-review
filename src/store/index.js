import { init } from "@rematch/core";
// import apis from "../apis/mockApis";
import apis from "../apis/realApis";
import logger from "redux-logger";
import { starQuestions } from "../utils";

function questionScoresToArray(objectWithQuestions) {
  console.log("object with questions", objectWithQuestions);
  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    // question9,
    // question10,
    ...newObjectWithQuestions
  } = objectWithQuestions;
  console.log("newobjectWithQuestions", newObjectWithQuestions);
  const questions = [];
  for (let i = 1; i < 9; i++) {
    questions.push(parseFloat(objectWithQuestions["question" + i]));
  }
  newObjectWithQuestions.questions = questions;
  return newObjectWithQuestions;
}

function questionScoresToObject(objectWithScores) {
  const { questions, ...rest } = objectWithScores;
  const questionsObj = objectWithScores.questions.reduce(
    (total, question, index) => {
      total["question" + (index + 1)] = question.coloredStars;
      return total;
    },
    {}
  );
  const newObj = { ...rest, ...questionsObj };
  console.log("new obj", newObj);
  return newObj;
}

const initialUserState = {
  loggedIn: false,
  username: "",
  firstName: "",
  lastName: "",
  userUuid: "",
  email: "",
  reviews: []
  // loggedIn: true,
  // username: "",
  // firstName: "",
  // lastName: "",
  // userUuid: "",
  // email: "",
  // reviews: []
};

const store = init({
  models: {
    reviews: {
      state: [],
      reducers: {
        setReviews(state, payload) {
          return payload;
        }
        // upsertReviews
      },
      effects: dispatch => ({
        async getReviewsAndSetSelected(payload, rootState) {
          // api call for getting reviews
          const reviews = await apis.getReviews();
          dispatch.reviews.setReviews(reviews.map(questionScoresToArray));
          dispatch.selectedReview.setSelectedReview(reviews[0].vendorId);
        },
        async postReview(payload, rootState) {
          dispatch.call.setCall({ isFetching: true, error: "" });
          try {
            const newReview = await apis.postReview(
              questionScoresToObject(payload)
            );
            const formatedReview = questionScoresToArray(newReview);
            dispatch.user.upsertUserReviews(formatedReview);
            // dispatch.reviews.upsertReviews(formatedReview);
            dispatch.call.setCall({ isFetching: false, error: "" });
            dispatch.app.setNotifcation({
              notification: "Review successfully saved"
            });
          } catch (e) {
            console.log(e.response.data);
            dispatch.call.setCall({
              isFetching: false,
              error: e.response.data
            });
            dispatch.app.setNotifcation({
              notification: e.response.data
            });
          }
        },
        async updateReview(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            const newReview = await apis.updateReview(
              questionScoresToObject(payload)
            );
            dispatch.user.upsertUserReviews(questionScoresToArray(newReview));
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
    user: {
      state: initialUserState,
      reducers: {
        setUser(state, payload) {
          return payload;
        },
        deleteReviewFromStore(state, id) {
          console.log("state", state);
          const reviews = state.reviews.filter(review => review.id !== id);
          return { ...state, reviews };
        },
        upsertUserReviews(state, upsertedReview) {
          const reviews = state.reviews.filter(review => {
            return review.id != upsertedReview.id;
          });
          reviews.push(upsertedReview);
          return { ...state, reviews };
        }
      },
      effects: dispatch => ({
        async login(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            const result = await apis.login(payload);
            dispatch.user.setUser({
              ...result,
              reviews: result.reviews.map(questionScoresToArray),
              loggedIn: true
            });
            dispatch.call.setCall({ isfetching: false, error: "" });
          } catch (e) {
            dispatch.call.setCall({
              isfetching: false,
              error: "failed login attempt"
            });
          }
        },
        async logout() {
          dispatch.call.setCall({ isfetching: true, error: "" });
          await apis.logout();
          dispatch.call.setCall({ isfetching: false, error: "" });
          dispatch.user.setUser(initialUserState);
          dispatch.app.setNotifcation({
            notification: "Logout Successful"
          });
        },
        async register(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            const result = await apis.register(payload);
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
        async changePassword(payload, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            await apis.changePassword(payload);
            dispatch.app.setNotifcation({
              notification: "Your password has been changed"
            });
          } catch (e) {
            dispatch.call.setCall({ isfetching: false, error: e });
            dispatch.app.setNotifcation({
              notification: "There was an error resetting your password"
            });
          }
        },
        async deleteReview(id, rootState) {
          dispatch.call.setCall({ isfetching: true, error: "" });
          try {
            await apis.deleteReview({ id });
            dispatch.app.setNotifcation({
              notification: "Review successfully deleted"
            });
            dispatch.user.deleteReviewFromStore(id);
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

const upsertReviews = (state, upsertedReview) => {
  const reviews = state.reviews.filter(review => {
    return review.id != upsertedReview.id;
  });
  reviews.push(upsertedReview);
  return { ...state, reviews };
};

export const { dispatch } = store;

export default store;

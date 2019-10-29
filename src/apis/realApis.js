import axios from "axios";

// uncomment the below when you are working locally using the react dev server
// import Axios from "axios";
// const axios = Axios.create({
//   baseURL: "http://localhost:5000"
// });

export default {
  async getReviews() {
    const { data } = await axios.get("/api/reviews");
    return data;
  },
  async postReview(payload) {
    const { data } = await axios.post("/api/reviews", payload);
    return data;
    // returns statusCode 200
  },
  async login(payload) {
    const { data } = await axios.post("/api/login", payload);
    return data;
  },
  async logout() {
    return await axios.get("/api/logout");
  },
  async register(payload) {
    return await axios.get("/api/registration", payload);
  },
  async resetPassword(payload) {
    return await axios.get("/api/reset-password", payload);
  },
  async changePassword(payload) {
    return await axios.post("/api/change-password", payload);
  },
  async suggestVendor(payload) {
    return await axios.get("/api/suggest-vendor");
  },
  async provideFeedback(payload) {
    return await axios.get("/api/feedback");
  },
  async updateReview(payload) {
    const { data } = await axios.put("/api/reviews", payload);
    return data;
  },
  async deleteReview(payload) {
    return await axios.delete("/api/reviews", { params: payload });
  }
};

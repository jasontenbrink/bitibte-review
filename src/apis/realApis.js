import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000/api"
});

export default {
  async getReviews() {
    const { data } = await axios.get("/reviews");
    return data;
  },
  async postReview(payload) {
    const { data } = await axios.post("/reviews", payload);
    return data;
    // returns statusCode 200
  },
  async login(payload) {
    const { data } = await axios.post("/login", payload);
    return data;
  },
  async logout() {
    return await axios.get("/logout");
  },
  async register(payload) {
    return await axios.get("/registration", payload);
  },
  async resetPassword(payload) {
    return await axios.get("/reset-password", payload);
  },
  async changePassword(payload) {
    return await axios.post("/change-password", payload);
  },
  async suggestVendor(payload) {
    return await axios.get("/suggest-vendor");
  },
  async provideFeedback(payload) {
    return await axios.get("/feedback");
  },
  async updateReview(payload) {
    const { data } = await axios.put("/reviews", payload);
    return data;
  },
  async deleteReview(payload) {
    console.log("dlete", payload);
    return await axios.delete("/reviews", { params: payload });
  }
};

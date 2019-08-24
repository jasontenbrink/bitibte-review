import uuid from "uuid/v4";

export default {
  getReviews() {
    return new Promise(resolve => setTimeout(() => resolve(reviews), 100));
  },
  getQuestions() {
    return new Promise(resolve => setTimeout(() => resolve(questions), 100));
  },
  postReview(payload) {
    return new Promise(resolve =>
      setTimeout(() => resolve({ statusCode: 200 }))
    );
  }
};

const questions = [
  {
    text: "Did the vendor deal with you fairly?",
    uuid: uuid()
  },
  {
    text:
      "Are the vendor's margins competative (Do they take too much off of the top or not)?",
    uuid: uuid()
  },
  {
    text: "Did the vendor communicate with you in a timely manner?",
    uuid: uuid()
  },
  {
    text: "was the vendor knowledgable of the technology industry?",
    uuid: uuid()
  },
  {
    text: "was the vendor knowledgable of the local job market?",
    uuid: uuid()
  },
  {
    text: "Did the vendor try and do right by you?",
    uuid: uuid()
  },
  {
    text: "Was the vendor receptive to your feedback?",
    uuid: uuid()
  },
  {
    text:
      "Did the vendor put in the effort to get to know you? (Didn't show you front end jobs if you didn't want to do front end)",
    uuid: uuid()
  },
  { text: "Does the vendor treat minorities well?", uuid: uuid() },
  {
    text: "Did the vendor advocate to get you the pay rate you wanted?",
    uuid: uuid()
  },
  {
    text:
      "How many interviews did the vendor get you per week?(this shouldn't be a stars q.  It should display a number)",
    uuid: uuid()
  },
  {
    text:
      "how many weeks  between the time the time you started working with the vendor and landing a job?",
    uuid: uuid()
  },
  {
    text:
      "did you end up getting placed through the vendor? (should be a percentage instead of star)",
    uuid: uuid()
  }
];

const reviews = [
  {
    uuid: uuid(),
    // uuid: 1,
    name: "Vendor 1",
    vendorUuid: uuid(),
    questions: [
      {
        text: "Did the vendor deal with you fairly?",
        stars: 3.2
      },
      {
        text:
          "Are the vendor's margins competative (Do they take too much off of the top or not)?",
        stars: 3.2
      },
      {
        text: "Did the vendor communicate with you in a timely manner?",
        stars: 3.2
      },
      {
        text: "was the vendor knowledgable of the technology industry?",
        stars: 3.2
      },
      {
        text: "was the vendor knowledgable of the local job market?",
        stars: 3.2
      },
      {
        text: "Did the vendor try and do right by you?",
        stars: 3.2
      },
      {
        text: "Was the vendor receptive to your feedback?",
        stars: 3.2
      },
      {
        text:
          "Did the vendor put in the effort to get to know you? (Didn't show you front end jobs if you didn't want to do front end)",
        stars: 4
      },
      { text: "Does the vendor treat minorities well?", stars: 4 },
      {
        text: "Did the vendor advocate to get you the pay rate you wanted?",
        stars: 4
      },
      {
        text:
          "How many interviews did the vendor get you per week?(this shouldn't be a stars question.  It should display a number)",
        stars: 2
      },
      {
        text:
          "how many weeks  between the time the time you started working with the vendor and landing a job?",
        stars: 3
      },
      {
        text:
          "did you end up getting placed through the vendor? (should be a percentage instead of stars)",
        stars: 2
      }
    ],
    comments: [
      { authorName: "user1", authorUuid: "123", text: "this is a comment" },
      { authorName: "user2", authorUuid: "222", text: "this is a comment2" }
    ]
  },
  {
    uuid: uuid(),
    name: "Vendor 2",
    vendorUuid: uuid(),
    questions: [
      {
        text: "Did the vendor deal with you fairly?",
        stars: 1.2
      },
      {
        text:
          "Are the vendor's margins competative (Do they take too much off of the top or not)?",
        stars: 1.2
      },
      {
        text: "Did the vendor communicate with you in a timely manner?",
        stars: 1.2
      },
      {
        text: "was the vendor knowledgable of the technology industry?",
        stars: 1
      },
      {
        text: "was the vendor knowledgable of the local job market?",
        stars: 1
      },
      {
        text: "Did the vendor try and do right by you?",
        stars: 2
      },
      {
        text: "Was the vendor receptive to your feedback?",
        stars: 2
      },
      {
        text:
          "Did the vendor put in the effort to get to know you? (Didn't show you front end jobs if you didn't want to do front end)",
        stars: 1
      },
      { text: "Does the vendor treat minorities well?", stars: 4 },
      {
        text: "Did the vendor advocate to get you the pay rate you wanted?",
        stars: 4
      },
      {
        text:
          "How many interviews did the vendor get you per week?(this shouldn't be a stars question.  It should display a number)",
        stars: 2
      },
      {
        text:
          "how many weeks  between the time the time you started working with the vendor and landing a job?",
        stars: 3
      },
      {
        text:
          "did you end up getting placed through the vendor? (should be a percentage instead of stars)",
        stars: 2
      }
    ],
    comments: [
      { authorName: "user3", authorUuid: "333", text: "this is a comment3" },
      { authorName: "user4", authorUuid: "444", text: "this is a comment4" }
    ]
  }
];

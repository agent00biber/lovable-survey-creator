/** VUEX analytics module**/
const fb = require("@/firebase/firebaseConfig.js");

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    //store tester comments and feedback here
    comments: [],
    feedback: []
  },
  // -----------------------------------------------------------------
  getters: {
    //return information
    getCommentAnalytics: state => {
      return state.comments;
    },
    getFeedbackAnalytics: state => {
      return state.feedback;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    //set state
    DATA_setComments(state, surveyComments) {
      state.comments = surveyComments;
    },
    DATA_setFeedback(state, surveyFeedback) {
      state.feedback = surveyFeedback;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    //parent action to get comments and feedback data
    DATA_getAnalytics: ({ commit, dispatch, state, rootState }) => {
      dispatch("DATA_getFeedback").then(surveyFeedback => {
        commit("DATA_setFeedback", surveyFeedback);
      });
      dispatch("DATA_getComments").then(surveyComments => {
        commit("DATA_setComments", surveyComments);
      });
    },
    DATA_getFeedback: ({ commit, state, rootState }) => {
      let activeSurvey = rootState.surveyModule.activeSurvey;
      let surveyData =
        rootState.surveyModule.surveyData[activeSurvey].featureData;
      let surveyID = rootState.surveyModule.surveyData[activeSurvey].id;
      let surveyFeedback = [];

      //get all feedback for every feature in a given survey
      surveyData.forEach((survey, index) => {
        let post = "post" + index;
        let postFeedback = [];
        return fb.feedbackCollection
          .doc(surveyID)
          .collection(post)
          .get()
          .then(result => {
            if (result.empty) {
              //return false when there are no answers to this survey yet
              console.log("No feedback for this survey available");
              return;
            }
            //push every answer to the feedback questions in an array
            result.forEach(doc => {
              postFeedback.push(doc.data());
            });
            //push every answerset in the feedback array
            surveyFeedback.push(postFeedback);
          });
      });
      //return the feedback array to the parent action
      return surveyFeedback;
    },
    DATA_getComments: ({ commit, state, rootState }) => {
      let userID = rootState.authModule.currentUser.uid;
      let activeSurvey = rootState.surveyModule.activeSurvey;
      let surveyData =
        rootState.surveyModule.surveyData[activeSurvey].featureData;
      let surveyID = rootState.surveyModule.surveyData[activeSurvey].id;
      let surveyComments = [];

      //get all comments for every feature
      surveyData.forEach((survey, index) => {
        let post = "post" + index;
        let postComments = [];
        return fb.commentsCollection
          .doc(surveyID)
          .collection(post)
          .get()
          .then(result => {
            if (result.empty) {
              //return false when there are no comments to this survey yet
              console.log("No comments for this survey available");
              return false;
            }
            //push all comments for a certain feature in a local comment array
            result.forEach(doc => {
              postComments.push(doc.data());
            });
            //push all comments in the comments array
            surveyComments.push(postComments);
          });
      });
      //return the comments array to the parent action
      return surveyComments;
    }
  }
};

/** VUEX nav module**/

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    //all feature array
    allFeatures: [],
    //single feature object for basic information, questions, and a stored index for editing
    singleFeature: {
      basics: false,
      questions: [],
      editIndex: false
    }
  },
  // -----------------------------------------------------------------
  getters: {
    getFeatureBasics: state => {
      return state.singleFeature.basics;
    },
    getFeatureQuestions: state => {
      return state.singleFeature.questions;
    },
    getAllFeatures: state => {
      return state.allFeatures;
    },
    getSingleFeature: state => {
      return state.singleFeature;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    //set either the basic information or the questions to the store
    DATA_setFeature(state, featureData) {
      state.singleFeature[featureData.name] = featureData.data;
    },
    //add all information for the survey webapp
    DATA_addAllFeatures(state, featureData) {
      //only needed in the survey webapp
      let counters = {
        counterComment: 0,
        counterFeedback: 0,
        counterLike: 0,
        counterLiked: false,
        counterTimemachine: 0
      };
      let feature = {
        basics: state.singleFeature.basics,
        questions: state.singleFeature.questions,
        counters: counters,
        //a relict from the last version which could be a feature later again
        timemachine: {},
        postId: new Date()
      };
      //check if the data was an edit or is new
      if (
        state.singleFeature.editIndex ||
        state.singleFeature.editIndex === 0
      ) {
        //replace an existing feature
        let position = state.singleFeature.editIndex;
        state.allFeatures.splice(position, 1, feature);
      } else {
        //or add it to the end of the all feature array
        state.allFeatures.push(feature);
      }
      //clear the single feature object afterwards
      state.singleFeature = {
        basics: false,
        questions: [],
        editIndex: false
      };
    },
    //add a question to all questions
    DATA_addSingleQuestion(state, questionData) {
      state.singleFeature.questions.push(questionData);
    },
    //edit a question
    DATA_editSingleQuestion(state, questionData) {
      let position = questionData.position;
      let data = questionData.data;
      //replace the existing data with new data
      state.singleFeature.questions.splice(position, 1, data);
    },
    //delete a question
    DATA_deleteSingleQuestion(state, position) {
      state.singleFeature.questions.splice(position, 1);
    },
    //delete all feature data by reseting the state
    DATA_deleteAllFeatures(state, position) {
      state.allFeatures = [];
      state.singleFeature = {
        basics: false,
        questions: [],
        editIndex: false
      };
    },
    //edit a certain feature by setting a certain feature from the array to the object
    //the edit index signals the desire to edit this feature
    DATA_editOneOfAllFeature(state, index) {
      state.singleFeature.editIndex = index;
      state.singleFeature.basics = state.allFeatures[index].basics;
      state.singleFeature.questions = state.allFeatures[index].questions;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    DATA_setFeature: ({ commit }, featureData) => {
      commit("DATA_setFeature", featureData);
    },
    DATA_addAllFeatures: ({ commit }) => {
      commit("DATA_addAllFeatures");
    },
    DATA_addSingleQuestion: ({ commit }, questionData) => {
      commit("DATA_addSingleQuestion", questionData);
    },
    DATA_editSingleQuestion: ({ commit }, questionData) => {
      commit("DATA_editSingleQuestion", questionData);
    },
    DATA_deleteSingleQuestion: ({ commit }, position) => {
      commit("DATA_deleteSingleQuestion", position);
    },
    DATA_deleteAllFeatures: ({ commit }) => {
      commit("DATA_deleteAllFeatures");
    },
    DATA_editOneOfAllFeature: ({ commit }, index) => {
      commit("DATA_editOneOfAllFeature", index);
    }
  }
};

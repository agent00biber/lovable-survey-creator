/** VUEX feature and data module**/
const fb = require("@/firebase/firebaseConfig.js");

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    surveyData: [],
    activeSurvey: null,
    surveysLoaded: false
  },
  // -----------------------------------------------------------------
  getters: {
    getSurveyData: state => {
      return state.surveyData;
    },
    getSurveyLoaded: state => {
      return state.surveysLoaded;
    },
    getActiveSurvey: state => {
      return state.activeSurvey;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    DATA_getSurveys(state, surveyData) {
      //sets the survey data to the store
      state.surveyData = surveyData;
      //and sets the activeSurvey to a number so a user can click on the analytics-tab and not get an error
      state.activeSurvey = 0;
    },
    DATA_surveyLoaded(state) {
      state.surveysLoaded = true;
    },
    DATA_updateSurvey(state, surveyData) {
      state.surveyData.push(surveyData);
    },
    DATA_setActiveSurvey(state, index) {
      state.activeSurvey = index;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    /* this step is nessesary because the firestore cant handle deep objects well and makes up- and down voting in the survey webapp difficult */
    DATA_getSurveys: ({ commit, state, rootState }) => {
      let userID = rootState.authModule.currentUser.uid;
      let surveyArray = [];
      return (
        fb.surveyCollection
          //get all the survey by a specific user
          .where("createdBy", "==", userID)
          .get()
          .then(result => {
            if (result.empty) {
              //return false when there are no surveys yet
              console.log("No matching documents.");
              return false;
            }
            result.forEach(backgroundData => {
              let singleSurveyData = {};
              let featureData = [];
              //get the backgrounddata and put it into the singleSurveyData Array
              singleSurveyData = backgroundData.data();
              singleSurveyData["id"] = backgroundData.id;

              //for every backgrounddata entry, look up the featureData
              fb.surveyCollection
                .doc(backgroundData.id)
                .collection("featureData")
                .get()
                .then(surveyData => {
                  surveyData.forEach(survey => {
                    //group them in one array
                    featureData.push(survey.data());
                  });
                });
              //add this array to the backgroundData
              singleSurveyData["featureData"] = featureData;
              //push it into the surveyDataArray
              surveyArray.push(singleSurveyData);
            });
          })
          .then(() => {
            commit("DATA_getSurveys", surveyArray);
            commit("DATA_surveyLoaded");
            return "successful survey load";
          })
          .catch(error => {
            console.log(error);
            throw "there was a problem getting your surveys";
          })
      );
    },

    DATA_publishSurvey: ({ commit, state, rootState }, surveyName) => {
      let featureData = rootState.createModule.allFeatures;
      let name = surveyName;
      let author = rootState.authModule.currentUser.uid;
      let date = new Date();
      let surveyID;

      //add this to the existing surveys
      commit("DATA_updateSurvey", {
        createdBy: author,
        surveyName: name,
        date,
        featureData
      });

      //set the background data
      return fb.surveyCollection
        .add({
          createdBy: author,
          surveyName: name,
          date: date
        })
        .then(result => {
          //get the survey id
          surveyID = result.id;
        })
        .then(() => {
          //set every feature
          featureData.forEach((feature, index) => {
            fb.surveyCollection
              .doc(surveyID)
              .collection("featureData")
              .doc(index.toString())
              .set({
                basics: feature.basics,
                questions: feature.questions,
                postID: date,
                counters: feature.counters,
                timemachine: {}
              });
          });
        })
        .then(() => {
          return surveyID;
        })
        .catch(error => {
          console.log(error);
        });
    },

    DATA_setActiveSurvey: ({ commit }, index) => {
      commit("DATA_setActiveSurvey", index);
    }
  }
};

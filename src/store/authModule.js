/** VUEX auth module**/
const fb = require("@/firebase/firebaseConfig.js");
import router from "@/router/router.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    //store the user profile and the current user/firebase auth tokens
    currentUser: null,
    userProfile: null
  },
  // -----------------------------------------------------------------
  getters: {
    //return the information
    getUserProfileState: state => {
      return state.userProfile;
    },
    getCurrentUser: state => {
      return state.currentUser;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    //set the current user to the payload/auth object
    USER_setCurrent(state, user) {
      state.currentUser = user;
    },
    //set the user profile to the retrieved user information
    USER_setProfile(state, user) {
      state.userProfile = user;
    },
    //clear both states to logout
    USER_logout(state) {
      state.userProfile = null;
      state.currentUser = null;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    AUTH_signup: ({ commit, dispatch }, signup) => {
      //stated as a return statement so the local dispatch can react to the return
      return (
        fb.auth
          //firebase auth call
          .createUserWithEmailAndPassword(signup.email, signup.password)
          .then(user => {
            //set the current user to the auth object
            commit("USER_setCurrent", user.user);

            let userID = user.user.uid;

            //retrieve the stored user data from the firestore
            fb.usersCollection
              .doc(userID)
              .set({
                name: signup.name,
                email: signup.email
              })
              .then(() => {
                //and pass it on as another action
                dispatch("USER_getProfile");
              })
              .catch(error => {
                console.log(error);
              });
          })
          .then(() => {
            //return success for the local state handling
            return "successful signup";
          })
          .catch(error => {
            //or throw an error
            console.log(error);
            throw "there was a problem with the signup process";
          })
      );
    },

    AUTH_login: ({ commit, dispatch }, login) => {
      //stated as a return statement so the local dispatch can react to the return
      return (
        fb.auth
          //firebase auth call
          .signInWithEmailAndPassword(login.email, login.password)
          .then(user => {
            //set current user and user profile
            commit("USER_setCurrent", user.user);
            dispatch("USER_getProfile");
          })
          .then(() => {
            //return success for the local state handling
            return "successful signup";
          })
          .catch(error => {
            console.log(error);
            throw "there was a problem with the login process";
          })
      );
    },

    AUTH_PageReload: ({ commit, dispatch }, user) => {
      //get the auth object on reloads and pass it to the store
      commit("USER_setCurrent", user);
      dispatch("USER_getProfile");
    },

    USER_getProfile: ({ commit, state }) => {
      //look up the firestore for the current user id and download the profile
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("USER_setProfile", res.data());
        })
        .catch(error => {
          console.log(error);
        });
    },
    USER_logout: ({ commit }) => {
      //firebase logout call
      fb.auth
        .signOut()
        .then(() => {
          //remove all stored user data
          commit("USER_logout");
          //and go to the home page
          router.replace("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

<template>
  <article class="dashboard">
    <header class="user-greeting" v-if="userProfile">
      <h2 class="header">Hello, {{ userProfile.name }}</h2>
      <p>Glad to see you again.</p>
    </header>

    <!-- all surveys-->
    <section class="survey-section" v-if="surveyData.length">
      <card
        class="card-layout"
        v-for="(survey, index) in surveyData"
        :key="'survey' + index"
        :id="removeSpaces(survey.surveyName)"
        :success="copiedToClipboard"
      >
        <template v-slot:support>
          <p v-if="survey.date.seconds">
            {{ formattedDate(survey.date.seconds) }}
          </p>
          <button class="action-element" @click="copyLink(survey)">
            Copy link to clipboard
          </button>
        </template>
        <template v-slot:content>
          <!-- click anything to come to the analyze tab-->
          <h3 @click="analyzeThisSurvey(index)">{{ survey.surveyName }}</h3>
          <div
            class="image-wrapper picture-body"
            @click="analyzeThisSurvey(index)"
          >
            <picture v-if="survey.featureData.length">
              <v-lazy-image
                class="img--picture"
                :src="survey.featureData[0].basics.pictures[0].pictureURL"
                alt=""
              />
            </picture>
          </div>
          <div class="stats-wrapper" @click="analyzeThisSurvey(index)">
            <p>
              Including <b>{{ survey.featureData.length }}</b> features
            </p>
          </div>
        </template>

        <template v-slot:status> </template>
      </card>
    </section>
    <!-- empty states-->
    <section class="survey-section" v-else>
      <!-- loading state-->
      <div class="empty-state loading" v-if="!loadedSurvey">
        <p class="text--loading">
          We are getting your surveys, this will just take a second.
        </p>
        <div class="loading-state spinner" key="loadingSurvey">
          <div class="bounce1 bounce"></div>
          <div class="bounce2 bounce"></div>
          <div class="bounce3 bounce"></div>
        </div>
      </div>

      <!-- no surveys there with a CTA to make some-->
      <div class="empty-state empty" v-else>
        <p>There are no surveys yet.</p>
        <router-link :to="{ name: 'createOverview' }"
          ><b class="survey-link">Lets make some!</b></router-link
        >
      </div>
    </section>
  </article>
</template>

<script>
import VLazyImage from "v-lazy-image";
import dayjs from "dayjs";
import { mapGetters } from "vuex";
import card from "@/components/cards/Card.vue";
import helper from "@/helper/helper.js";

export default {
  components: { card, VLazyImage },
  name: "dashboard",
  data() {
    return {
      copiedToClipboard: null
    };
  },
  methods: {
    //quickfix for spaces - they will get convertet to %20 which looks dumb
    //take the headline and replace " " with "-"
    removeSpaces(headline) {
      let newHash = headline.replace(/\s+/g, "-");
      return newHash;
    },
    //transform the unix timecode to something readable
    formattedDate(date) {
      let formattedDate = dayjs.unix(date).format("DD/MM/YY");
      return formattedDate;
    },
    //copy the survey link to clipboard
    copyLink(survey) {
      //the surveyID is used by the other app to retrive the survey information
      let baseURL = "https://feedback-creator.firebaseapp.com/";
      let finalURL = baseURL + "survey" + survey.id;
      //quickfix to copy to clipboard
      this.copyStringToClipboard(finalURL);

      //copy state handling
      setTimeout(() => {
        this.copiedToClipboard = null;
      }, 2000);
      this.copiedToClipboard = true;
    },
    copyStringToClipboard(str) {
      // Create new element
      var el = document.createElement("textarea");
      // Set value (string to be copied)
      el.value = str;
      // Set non-editable to avoid focus and move outside of view
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);
      // Select text inside element
      el.select();
      // Copy text to clipboard
      document.execCommand("copy");
      // Remove temporary element
      document.body.removeChild(el);
    },
    analyzeThisSurvey(index) {
      //set the active survey to the clicked survey (globally) so the analyze-tab knows what to display
      this.$store
        .dispatch("surveyModule/DATA_setActiveSurvey", index)
        .then(() => {
          //navigate to the analyze-tab with the survey and feature names as params to display as navigation
          this.$router.push({
            name: "analyzeSurvey",
            params: {
              //remove spaces from the survey name
              survey: this.removeSpaces(
                this.surveyData[this.activeSurvey].surveyName
              ),
              //remove spaces from the feature name
              feature: this.removeSpaces(
                this.surveyData[this.activeSurvey].featureData[0].basics
                  .headline
              )
            }
          });
        });
    },
    //navigation for everything elese
    goTo(targetView) {
      this.$router.push({
        name: targetView
      });
    },
    //replaces spaces with "-"
    removeSpaces(headline) {
      let newHash = headline.replace(/\s+/g, "-");
      return newHash;
    }
  },
  computed: {
    ...mapGetters({
      surveyData: "surveyModule/getSurveyData",
      userProfile: "authModule/getUserProfileState",
      activeSurvey: "surveyModule/getActiveSurvey",
      loadedSurvey: "surveyModule/getSurveyLoaded"
    })
  },
  //set loading to true as long as there is no survey data
  created() {
    this.loading = true;
    if (this.surveyData) {
      this.loading = false;
    }
  },
  //observe the visibility of each survey to highlight the correct navigation
  mounted() {
    this.surveyData.forEach((survey, index) => {
      let id = this.removeSpaces(survey.surveyName);
      helper.observer(index, 1, id);
    });
  },
  //do this in activated as well because sometimes the mounted observer doest fire
  activated() {
    this.surveyData.forEach((survey, index) => {
      let id = this.removeSpaces(survey.surveyName);
      helper.observer(index, 1, id);
    });
  }
};
</script>

<style scoped>
.dashboard {
  min-height: 100%;
  display: grid;
  padding: var(--top-padding) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
}

.survey-section,
.user-greeting {
  grid-column: 2/3;
}

.header {
  color: var(--dark-grey);
}

.picture-body {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 50%;
}

.img--picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--fourthbase);
}

.action-element {
  text-decoration: underline;
  color: var(--darker-grey);
  background-color: inherit;
  font-size: calc(var(--1base) * 0.8);
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  border: 1px transparent;
}

.action-element:active {
  transform: translateY(0.1rem);
}

.empty-state {
  display: flex;
  flex-direction: column;
}

.loading-state {
  padding-top: var(--4base);
}

.survey-link {
  text-decoration: underline;
}

.card-layout {
  margin-bottom: var(--1base);
}

/*----loading-----*/

.text--loading {
  text-align: center;
}

.spinner {
  text-align: center;
}

.bounce {
  width: 0.75rem;
  height: 0.75rem;
  background-color: var(--dark-grey);
  margin: 0 0.1rem;
  border-radius: 100%;
  display: inline-block;
  animation: bounce 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>

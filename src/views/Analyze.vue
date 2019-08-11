<template>
  <page-transition propTransitionName="fade">
    <keep-alive>
      <!--opens a modal with a specific survey-->
      <!--can only open if there is a survey, default is 0-->
      <router-view
        :key="'analyze' + $route.fullPath + $route.params"
        v-if="activeSurvey || activeSurvey === 0"
      />
    </keep-alive>
  </page-transition>
</template>

<script>
import { mapGetters } from "vuex";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: {
    pageTransition
  },
  name: "analyze",
  computed: {
    ...mapGetters({
      surveyComments: "analyticsModule/getCommentAnalytics",
      surveyFeedback: "analyticsModule/getFeedbackAnalytics",
      surveyData: "surveyModule/getSurveyData",
      activeSurvey: "surveyModule/getActiveSurvey"
    })
  }
};
</script>

<style scoped>
.analyze {
  min-height: 100%;
  display: grid;
  padding: var(--top-padding) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
}

.header,
.survey-name,
.features,
.legal {
  grid-column: 2/3;
}
</style>

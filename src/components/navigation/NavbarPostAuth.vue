<template>
  <section class="nav--after-auth">
    <div class="top-nav">
      <!-- add the active class on click-->
      <h2
        :class="[
          $route.name === 'dashboard' ? 'active-headline' : 'headline--top-nav'
        ]"
        @click="goTo('dashboard')"
      >
        View
      </h2>
      <!-- add the active class on click-->
      <h2
        :class="[
          $route.name === 'analyze' || $route.name === 'analyzeSurvey'
            ? 'active-headline'
            : 'headline--top-nav'
        ]"
        @click="goToAnalyze()"
      >
        Analyze
      </h2>
      <!-- add the active class on click and on every sublevel if the create part -->
      <h2
        :class="[
          $route.path === '/create' ||
          $route.path === '/create/overview' ||
          $route.path === '/create/basics' ||
          $route.path === '/create/questions' ||
          $route.path === '/create/preview'
            ? 'active-headline'
            : 'headline--top-nav'
        ]"
        @click="goTo('createOverview')"
      >
        Create
      </h2>
    </div>
    <div
      class="sub-nav"
      v-if="$route.name === 'dashboard' && surveyLoaded"
      id="subnav-view"
    >
      <!-- show a sublink for every survey-->
      <router-link
        v-for="(survey, index) in surveyData"
        :key="'surveyNavigation' + index"
        :id="'surveyNav' + index"
        class="nav-border"
        :to="{ hash: '#' + removeSpaces(survey.surveyName) }"
        >{{ survey.surveyName }}</router-link
      >
    </div>
    <!-- show a sublink for every feature of a given survey-->
    <div
      class="sub-nav"
      id="subnav-analyze"
      v-else-if="
        ($route.name === 'analyze' || $route.name === 'analyzeSurvey') &&
          activeSurvey !== null
      "
    >
      <router-link
        v-for="(feature, index) in surveyData[activeSurvey].featureData"
        :key="'featureNavigation' + index"
        :id="'featureNav' + index"
        class="nav-border"
        :to="{
          name: 'analyzeSurvey',
          params: {
            survey: removeSpaces(surveyData[activeSurvey].surveyName),
            feature: removeSpaces(feature.basics.headline)
          }
        }"
      >
        <span
          @click="
            scrollNav({
              index: index,
              id: 'featureNav' + index,
              target: 'subnav-analyze'
            })
          "
          >{{ feature.basics.headline }}</span
        >
      </router-link>
    </div>
    <!-- show a sublink for every step to create a feature-->
    <div
      class="sub-nav"
      id="subnav-create"
      v-else-if="
        $route.path === '/create' ||
          $route.path === '/create/overview' ||
          $route.path === '/create/basics' ||
          $route.path === '/create/questions' ||
          $route.path === '/create/preview'
      "
    >
      <router-link
        v-for="(step, index) in createArray"
        :key="'createNavigation' + index"
        :id="'createNav' + index"
        class="nav-border"
        :to="{ name: 'create' + step }"
        ><span
          @click="
            scrollNav({
              index: index,
              id: 'createNav' + index,
              target: 'subnav-create'
            })
          "
          >{{ step }}</span
        >
      </router-link>
    </div>
    <hamburger class="hamburger-position" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import hamburger from "@/components/navigation/hamburger.vue";

export default {
  components: {
    hamburger
  },
  name: "navBar",
  data() {
    return {
      createArray: ["Overview", "Basics", "Questions", "Preview"]
    };
  },
  methods: {
    goTo(targetView) {
      this.$router.push({
        name: targetView
      });
    },
    //add left scroll to the navbar so the active view is always visible as nav entry
    scrollNav(nav) {
      let subnav = document.getElementById(nav.target);
      let navItem = document.getElementById(nav.id);
      let navWidth = navItem.clientWidth;
      subnav.scrollLeft = nav.index * navWidth;
    },
    //quickfix because the goTo-function didnt take params really well
    goToAnalyze() {
      this.$router.push({
        name: "analyzeSurvey",
        //add feature and survey as params to display in navigation in the analytics-tab
        params: {
          survey: this.removeSpaces(
            this.surveyData[this.activeSurvey].surveyName
          ),
          feature: this.removeSpaces(
            this.surveyData[this.activeSurvey].featureData[0].basics.headline
          )
        }
      });
    },
    //replace spaces with "-"
    removeSpaces(headline) {
      let newHash = headline.replace(/\s+/g, "-");
      return newHash;
    }
  },
  computed: {
    ...mapGetters({
      surveyData: "surveyModule/getSurveyData",
      surveyLoaded: "surveyModule/getSurveyLoaded",
      activeSurvey: "surveyModule/getActiveSurvey"
    })
  }
};
</script>

<style scoped>
.nav--after-auth {
  display: grid;
  grid-template-columns: auto;
  grid-row: 1fr 1fr;
}

@media (min-width: 80em) {
  .nav--after-auth {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-row: auto;
  }
}

.top-nav {
  padding-bottom: var(--halfbase);
  display: grid;
  grid-template-columns: min-content min-content 1fr min-content;
  grid-column-gap: var(--1base);
}

@media (min-width: 80em) {
  .top-nav {
    justify-self: center;
  }
}

.headline--top-nav {
  color: var(--darker-grey);
  font-size: calc(var(--1base) * 1.25);
}

.active-headline {
  font-size: calc(var(--1base) * 1.25);
}

@media (min-width: 22.5em) {
  .headline--top-nav {
    font-size: var(--2base);
  }
  .active-headline {
    font-size: var(--2base);
  }
}

.sub-nav {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 80em) {
  .sub-nav {
    justify-self: center;
  }
}

.sub-nav::-webkit-scrollbar {
  display: none;
}

.sub-nav a {
  flex: 0 0 auto;
  margin-right: var(--1base);
}

.nav-border {
  position: relative;
}

.nav-border::after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  width: 100%;
  background-color: grey;
  transition: all 0.5s ease;
  opacity: 0;
}

@media (min-width: 80em) {
  .nav-border::after {
    bottom: var(--halfbase);
    left: 0;
  }
}

.nav-active.nav-border::after {
  opacity: 1;
}

.router-link-exact-active.nav-border::after {
  opacity: 1;
}

.hamburger-position {
  grid-column: 2/3;
  grid-row: 1/2;
  justify-self: end;
}

@media (min-width: 80em) {
  .hamburger-position {
    grid-column: 3/4;
  }
}
</style>

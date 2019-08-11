<template>
  <article class="create">
    <header class="header" v-if="allFeatures.length">
      <h2 class="headline">Overview</h2>
      <p class="subline">
        Home to all your features.
      </p>
    </header>
    <!-- empty state for when there are no features yet-->
    <header class="header" v-else>
      <h2 class="headline">Overview</h2>
      <p class="subline">
        There are no features yet. You can create a feature in 3 Steps :)
      </p>
      <ol class="all-steps">
        <li class="step step1">
          Add your feature by pasting in an image-URL and a jolt down a
          description
        </li>
        <li class="step step2">
          Add questions to your feature. As of now you can chose between text
          and image answers
        </li>
        <li class="step step3">
          Check your feature for errors and edit if you find any
        </li>
      </ol>
    </header>
    <!--survey name with error handling because the name is important for navigation and is therefore requiered -->
    <section class="survey-name">
      <p class="survey-topline">
        Before publishing your survey, you need to give it a name.
      </p>
      <card class="card-layout" :error="errorMessage.name" :success="success">
        <template v-slot:support> </template>

        <template v-slot:content>
          <default-input
            v-model="surveyData.name"
            :input="{
              label: 'Survey name',
              type: 'text',
              placeholder: 'A cool name for your survey',
              id: 'survey-name-id'
            }"
            :error="errorMessage.name"
        /></template>

        <template v-slot:status> </template>
      </card>
    </section>
    <!-- if there are any features they are displayed -->
    <section class="features" v-if="allFeatures.length">
      <card
        class="card-layout"
        v-for="(feature, index) in allFeatures"
        :key="'createFeature' + index"
      >
        <template v-slot:support>
          <p v-if="feature.questions.length === 1">
            This Feature has {{ feature.questions.length }} question
          </p>
          <p v-else-if="feature.questions.length > 1">
            This Feature has {{ feature.questions.length }} questions
          </p>
          <p v-else>
            This Feature has no questions
          </p>
          <p class="edit-element" @click="editSurvey(index)">edit</p>
        </template>

        <template v-slot:content>
          <h2>{{ feature.basics.headline }}</h2>
          <!-- click on the picture to see the next-->
          <picture
            class="placeholder--feature-basics"
            @click="nextPicture(feature)"
          >
            <v-lazy-image
              class="image--placeholder"
              :src="feature.basics.pictures[pictureActive].pictureURL"
              alt="pic"
              v-if="feature.basics.pictures[pictureActive].pictureURL"
            />
          </picture>
          <p v-if="feature.basics.pictures.length > 1">
            picture {{ pictureActive + 1 }}/
            {{ feature.basics.pictures.length }}
          </p>
          <p>{{ feature.basics.body }}</p>
        </template>

        <template v-slot:status> </template>
      </card>

      <p class="add-feature action-element" @click="goTo('createBasics')">
        + add another feature
      </p>
    </section>

    <!-- publish button only visable when there are features -->
    <div class="button-field" v-if="allFeatures.length">
      <buttonBack buttonText="discard" @backbuttonevent="discardSurvey" />
      <buttonContinue
        buttonText="publish your survey"
        @continuebuttonevent="publishSurvey"
        :error="error || errorMessage.name"
        :success="success"
      />
    </div>
    <!-- empty state buttons-->
    <div class="button-field" v-else>
      <buttonBack buttonText="back" @backbuttonevent="goTo('dashboard')" />
      <buttonContinue
        buttonText="add a feature"
        @continuebuttonevent="addFeature"
      />
    </div>
    <div class="legal" v-if="allFeatures.length">
      <p>
        By publishing (and thereby uploading) you accept the terms and
        conditions of this service. You can find more about them here:
      </p>
      <a @click="goTo('legal', 'terms')">Terms and Conditions </a>
      <a @click="goTo('legal', 'privacy')">Privacy </a>
    </div>

    <!-- toast confirmation for deleting all features-->
    <page-transition>
      <toast-delete
        :deleteText="toast"
        v-if="toast.length"
        @toastanswerevent="decideDeleteSurvey"
      />
    </page-transition>
  </article>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { mapGetters } from "vuex";
import card from "@/components/cards/Card.vue";
import defaultInput from "@/components/inputs/Input.vue";
import buttonContinue from "@/components/buttons/ButtonContinue.vue";
import buttonBack from "@/components/buttons/ButtonBack.vue";
import toastDelete from "@/components/toasts/ToastDelete.vue";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: {
    VLazyImage,
    card,
    defaultInput,
    buttonContinue,
    buttonBack,
    toastDelete,
    pageTransition
  },
  props: [],
  name: "createOverview",
  data() {
    return {
      surveyData: {
        name: ""
      },
      pictureActive: 0,
      success: null,
      error: null,
      errorMessage: {
        name: ""
      },
      toast: ""
    };
  },
  methods: {
    //publish survey
    publishSurvey() {
      //if there is a name for it
      if (this.checkForm()) {
        this.$store
          .dispatch("surveyModule/DATA_publishSurvey", this.surveyData.name)
          // or throw an error and display it
          .catch(error => {
            console.log(error);
            this.error = true;
          });
      }
    },
    //edit survey
    editSurvey(index) {
      //load the indexed feature into the feature store object
      this.$store
        .dispatch("createModule/DATA_editOneOfAllFeature", index)
        .then(() => {
          //and go to basic section
          this.goTo("createBasics");
        });
    },
    discardSurvey() {
      //display the toast to confirm deletion
      this.toast = "survey";
    },
    decideDeleteSurvey(answer) {
      //if the emitted boolean value is false
      if (!answer) {
        //hide the toast and return early
        this.toast = "";
        return;
      }
      //otherwise delete all features
      this.$store.dispatch("createModule/DATA_deleteAllFeatures");
      this.toast = "";
    },
    //go to the feature basics
    addFeature() {
      this.goTo("createBasics");
    },
    checkForm() {
      //reset the errors to not display an error even if there is none anymore
      this.errorMessage = {
        name: ""
      };
      //check again for a survey name
      if (!this.surveyData.name) {
        this.errorMessage.name = "The survey needs a name";
      }
      //continue if there are no errors
      if (!this.errorMessage.name) {
        return true;
      }
    },
    nextPicture(feature) {
      //if there is more than one picture, show the next picture
      if (feature.basics.pictures.length > 1) {
        //if the last picture is clicked, show the first one again
        if (this.pictureActive === feature.basics.pictures.length - 1) {
          this.pictureActive = 0;
          return;
        }
        //show the next picture
        this.pictureActive += 1;
      }
    },
    //navigation
    goTo(targetView, targetHash) {
      if (targetHash) {
        this.$router.push({
          name: targetView,
          hash: "#" + targetHash
        });
      } else {
        this.$router.push({
          name: targetView
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      allFeatures: "createModule/getAllFeatures"
    })
  }
};
</script>

<style scoped>
.create {
  min-height: 100%;
  display: grid;
  padding: var(--top-padding) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
  position: relative;
}

.header,
.survey-name,
.features,
.legal {
  grid-column: 2/3;
}

.headline {
  color: var(--dark-grey);
}

.all-steps {
  padding: var(--1base);
}

.step {
  font-weight: bold;
  padding: var(--fourthbase) 0;
  color: var(--dark-grey);
}

.placeholder--feature-basics {
  width: 100%;
  height: 10rem;
  background-color: var(--lighter-grey);
  border-radius: var(--fourthbase);
  position: relative;
  padding-top: 100%;
}

.image--placeholder {
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
  font-weight: bold;
  color: var(--darker-grey);
  font-size: calc(var(--1base) * 0.8);
  text-decoration: underline;
  text-align: right;
  padding: var(--2base) var(--fourthbase) 0 0;
}

.edit-element {
  text-decoration: underline;
}

.card-layout {
  margin-bottom: var(--1base);
}

.button-field {
  grid-column: 2/3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (min-width: 28em) {
  .button-field {
    justify-content: center;
  }
}
</style>

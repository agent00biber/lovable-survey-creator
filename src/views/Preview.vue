<template>
  <article class="template">
    <header class="header">
      <h2 class="headline">Preview</h2>
      <p class="subline">
        Step 3: Check your feature and edit if nessesary. Just tap on the part
        you want to change.
      </p>
    </header>
    <section class="preview-basics" v-if="basics">
      <card class="card-layout" :error="error" :success="success">
        <template v-slot:support> </template>

        <template v-slot:content>
          <!-- click on everything besides images to change the basics-->
          <h2 @click="editBasics()">{{ basics.headline }}</h2>
          <!-- see the next image-->
          <picture class="placeholder--feature-basics" @click="nextPicture()">
            <v-lazy-image
              class="image--placeholder"
              :src="basics.pictures[pictureActive].pictureURL"
              alt="pic"
              v-if="basics.pictures[pictureActive].pictureURL"
            />
          </picture>
          <!-- show how many pictures there are-->
          <p v-if="basics.pictures.length > 1">
            picture {{ pictureActive + 1 }}/ {{ basics.pictures.length }}
          </p>
          <p @click="editBasics()">{{ basics.body }}</p>
        </template>

        <template v-slot:status> </template>
      </card>
    </section>
    <!-- empty state for the basic information-->
    <section class="preview-basics empty-preview" v-else>
      <p class="subline" :class="[error ? 'error' : '']">
        - You need to fill out the basic information for this feature. You cant
        add this feature otherwise.
      </p>
      <p class="action-element" @click="goTo('createBasics')">
        Go to the basic information tab
      </p>
    </section>

    <section class="preview-questions" v-if="allQuestions.length">
      <card
        class="card-layout"
        :error="error"
        :success="success"
        v-for="(question, index) in allQuestions"
        :key="'previewquestion' + index"
      >
        <template v-slot:support> </template>

        <template v-slot:content>
          <!-- question preview for the text type -->
          <div
            class="card-wrapper"
            @click="editQuestion(question, index)"
            v-if="question.type === 'text'"
          >
            <p class="card-headline">{{ question.question }}</p>
            <button-feedback
              v-for="(answer, answerIndex) in question.answers"
              :answerData="answer"
              :answerIndex="answerIndex"
              :key="'previewAnswer' + answerIndex"
            />
          </div>
          <!-- question preview for the question type -->
          <div
            class="card-wrapper"
            @click="editQuestion(question, index)"
            v-else-if="question.type === 'image'"
          >
            <p class="card-headline">{{ question.question }}</p>
            <div
              class="placeholder--feature-basics"
              v-for="(image, imageIndex) in question.answers"
              :key="'imagePreviewNr' + imageIndex"
            >
              <picture>
                <v-lazy-image
                  class="image--placeholder"
                  :src="image.answer"
                  alt="pic"
                />
              </picture>
            </div>
          </div>
        </template>

        <template v-slot:status> </template>
      </card>
    </section>
    <!-- basic state for the questions-->
    <section class="preview-questions empty-preview" v-else>
      <p class="subline">
        - You dont have any questions. You can continue from here but its not
        encouraged.
      </p>
      <p class="action-element" @click="goTo('createQuestions')">
        Go to the questions tab
      </p>
    </section>
    <div class="button-field">
      <buttonPrimary
        buttonText="add feature to survey"
        @primarybuttonevent="addFeature()"
        :error="error"
      />
    </div>
  </article>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { mapGetters } from "vuex";
import card from "@/components/cards/Card.vue";
import buttonFeedback from "@/components/buttons/ButtonFeedback.vue";
import buttonPrimary from "@/components/buttons/ButtonPrimary.vue";

export default {
  components: { VLazyImage, card, buttonFeedback, buttonPrimary },
  props: [],
  name: "createPreview",
  data() {
    return {
      data: null,
      success: null,
      error: null,
      pictureActive: 0
    };
  },
  methods: {
    goTo(targetView) {
      this.$router.push({
        name: targetView
      });
    },
    editQuestion(question, index) {
      //go to the indexed question for editing by pushing the question as a prop
      this.$router.push({
        name: "createNewQuestion",
        params: {
          editQuestion: { question: question, position: index }
        }
      });
    },
    editBasics() {
      //go to the basics for editing by pushing the existing Information as a prop
      this.$router.push({
        name: "createBasics",
        params: {
          editBasics: { basicData: this.basics }
        }
      });
    },
    nextPicture() {
      //enable picture clicking only when there are more than 1 pictures
      if (this.basics.pictures.length > 1) {
        //reset picture counter when its the last picture and return early
        if (this.pictureActive === this.basics.pictures.length - 1) {
          this.pictureActive = 0;
          return;
        }
        //go to the next picture
        this.pictureActive += 1;
      }
    },
    addFeature() {
      //check for basic information
      if (this.basics) {
        //and add this single feature to the feature array
        this.$store.dispatch("createModule/DATA_addAllFeatures").then(() => {
          //and go to the overview to either add another feature or publish them
          this.goTo("createOverview");
        });
        return;
      }
      //throw an error when there is no basic information
      //only for basics, because questions are optional
      this.error = "you need to add the basics first";
    }
  },
  computed: {
    ...mapGetters({
      allQuestions: "createModule/getFeatureQuestions",
      basics: "createModule/getFeatureBasics"
    })
  },
  created() {
    //remove errors when visiting this part
    this.error = null;
  },
  activated() {
    //keep-alive fix
    this.error = null;
  }
};
</script>

<style scoped>
.template {
  min-height: 100%;
  display: grid;
  padding: var(--top-padding) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-rows: min-content min-content 1fr;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
}

.header,
.preview-basics,
.preview-questions {
  grid-column: 2/3;
}

.headline {
  color: var(--dark-grey);
}

.subline {
  color: var(--darker-grey);
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

.empty-preview {
  padding: var(--1base) 0;
}

.button-field {
  grid-column: 2/3;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

@media (min-width: 28em) {
  .button-field {
    justify-content: center;
  }
}
.error {
  color: var(--error);
  font-weight: bold;
}
</style>

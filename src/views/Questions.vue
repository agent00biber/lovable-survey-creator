<template>
  <article class="questions">
    <header class="header">
      <h2 class="headline">Questions</h2>
      <p class="subline">Step 2: add questions about your feature</p>
    </header>

    <section class="question-cards" v-if="allQuestions.length">
      <card
        v-for="(question, index) in allQuestions"
        :key="'questionCard' + index"
      >
        <template v-slot:support>
          <p class="info--question-card" v-if="allQuestions.length >= 1">
            Question {{ index + 1 }}/ {{ allQuestions.length }}
          </p>
          <p class="info--question-card" v-else>
            Try to go for more than one question
          </p>
          <p class="delete--question-card" @click="deleteQuestion(index)">
            delete
          </p>
        </template>

        <template v-slot:content>
          <!--section for the different question types-->
          <!--text question type -->
          <div
            class="card-wrapper"
            @click="editQuestion(question, index)"
            v-if="question.type === 'text'"
          >
            <p class="card-headline">{{ question.question }}</p>
            <!-- show every button, no limits here-->
            <button-feedback
              v-for="(answer, answerIndex) in question.answers"
              :answerData="answer"
              :answerIndex="answerIndex"
              :key="'answerButton' + answerIndex"
            />
          </div>

          <!-- image question type-->
          <div
            class="card-wrapper"
            @click="editQuestion(question, index)"
            v-else-if="question.type === 'image'"
          >
            <p class="card-headline">{{ question.question }}</p>
            <!-- only 2 images to compare-->
            <div
              class="placeholder--feature-basics"
              v-for="(image, imageIndex) in question.answers"
              :key="'imageNr' + imageIndex"
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

        <template v-slot:status></template>
      </card>

      <p class="add-question action-element" @click="goTo('createNewQuestion')">
        + add another question
      </p>
    </section>
    <section class="question-cards" v-else>
      <p class="empty-cards">
        There are no questions yet. Lets add some for your visitors to answer!
      </p>
      <p class="add-question action-element" @click="goTo('createNewQuestion')">
        + add a question here
      </p>
    </section>
    <div class="button-field">
      <buttonBack buttonText="back" @backbuttonevent="goTo('createBasics')" />
      <buttonContinue
        buttonText="feature preview next"
        @continuebuttonevent="goTo('createPreview')"
      />
    </div>

    <!--modal for the question creation-->
    <page-transition :propTransitionRouterAdd="true">
      <router-view :key="'questions' + $route.fullPath" />
    </page-transition>

    <!-- toast for deletion confirmation-->
    <page-transition>
      <toast-delete
        :deleteText="toast.text"
        v-if="toast.text.length"
        @toastanswerevent="decideDeleteQuestion"
      />
    </page-transition>
  </article>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { mapGetters } from "vuex";
import card from "@/components/cards/Card.vue";
import pageTransition from "@/components/transitions/transition.vue";
import buttonFeedback from "@/components/buttons/ButtonFeedback.vue";
import buttonContinue from "@/components/buttons/ButtonContinue.vue";
import buttonBack from "@/components/buttons/ButtonBack.vue";
import toastDelete from "@/components/toasts/ToastDelete.vue";

export default {
  components: {
    VLazyImage,
    card,
    pageTransition,
    buttonFeedback,
    buttonContinue,
    buttonBack,
    toastDelete
  },
  props: [],
  name: "createQuestions",
  data() {
    return {
      newQuestionModal: false,
      toast: { text: "", index: null }
    };
  },
  methods: {
    editQuestion(question, index) {
      //edit question by opening the modal with an existing questions as params
      this.$router.push({
        name: "createNewQuestion",
        params: {
          editQuestion: { question: question, position: index }
        }
      });
    },

    deleteQuestion(index) {
      //open toast by giving the toast.text a length
      //save the index to delete the right question
      this.toast.text = "question";
      this.toast.index = index;
    },
    decideDeleteQuestion(boolean) {
      //toasts emits a boolean value
      if (!boolean) {
        //emits wrong if the user presses dismiss
        //restores the default toast state
        this.toast.text = "";
        this.toast.index = null;
        //returns early
        return;
      }
      //otherwise it deletes the question with the saved index
      this.$store.dispatch(
        "createModule/DATA_deleteSingleQuestion",
        this.toast.index
      );
      //and restores the default toast state
      this.toast.text = "";
      this.toast.index = null;
    },
    goTo(targetView) {
      //navigation
      this.$router.push({
        name: targetView
      });
    }
  },
  computed: {
    ...mapGetters({
      allQuestions: "createModule/getFeatureQuestions"
    })
  }
};
</script>

<style scoped>
.questions {
  min-height: 100%;
  display: grid;
  padding: var(--top-padding) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-rows: min-content 1fr;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
}

.header,
.question-cards,
.button-field {
  grid-column: 2/3;
}

.headline {
  color: var(--dark-grey);
}
.subline {
  color: var(--darker-grey);
}

.empty-cards {
  color: var(--darker-grey);
  padding-top: var(--3base);
}

.action-element {
  font-weight: bold;
  color: var(--darker-grey);
  font-size: calc(var(--1base) * 0.8);
  text-decoration: underline;
}

.add-question {
  text-align: right;
  padding: var(--2base) var(--fourthbase) 0 0;
}

.delete--question-card {
  text-decoration: underline;
  justify-self: end;
}

.placeholder--feature-basics {
  width: 100%;
  height: 10rem;
  background-color: var(--lighter-grey);
  border-radius: var(--fourthbase);
  position: relative;
  padding-top: 100%;
}

.placeholder--feature-basics:first-of-type {
  margin-bottom: var(--halfbase);
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

.button-field {
  grid-row: 3/4;
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

<template>
  <aside class="new-question">
    <header class="header">
      <p class="topline">
        Create your Question
      </p>
      <h1 class="headline">What do you want to ask?</h1>
    </header>
    <section class="question-section">
      <card
        class="card-layout"
        :error="errorMessage.question || errorMessage.type"
        :success="success"
      >
        <template v-slot:support> </template>

        <template v-slot:content>
          <inputField
            v-model="newQuestionData.question"
            :input="{
              label: 'Your Question',
              type: 'text',
              placeholder: 'Type in your question here',
              id: 'newquestion-question'
            }"
            :error="errorMessage.question"
          />
          <!-- select a question type -->
          <div class="answer-options--question-section">
            <p class="label--answer-option">Choose an answer Type</p>
            <button-feedback
              v-for="(questionTypes, questionIndex) in [
                { text: 'Text answers', questionType: 'text' },
                { text: 'Image comparison', questionType: 'image' }
              ]"
              :key="'questionTypes' + questionIndex"
              :answerData="questionTypes"
              :answerIndex="questionIndex"
              @feedbackbuttonevent="choseAnswerType"
              :class="[
                newQuestionData.type === questionTypes.questionType
                  ? 'active'
                  : ''
              ]"
            />
            <p class="error-status" v-if="errorMessage.type">
              {{ errorMessage.type }}
            </p>
          </div>
        </template>

        <template v-slot:status> </template>
      </card>
    </section>
    <section class="answer-section" v-if="newQuestionData.type === 'text'">
      <card
        class="card-layout"
        :error="errorMessage.answerText || error"
        :success="success"
      >
        <template v-slot:support
          ><p>Try to go for 3 answers</p></template
        >

        <template v-slot:content>
          <!-- add a text answer -->
          <inputField
            v-for="(answer, questionAnswerIndex) in newQuestionData.answers"
            v-model="newQuestionData.answers[questionAnswerIndex].answer"
            :key="'questionanswer' + questionAnswerIndex"
            :input="{
              label: 'Answer Option ' + letters(questionAnswerIndex),
              type: 'text',
              placeholder: 'Type in your question here',
              id: 'newquestion-text',
              labelRemove: true
            }"
            :index="questionAnswerIndex"
            :error="errorMessage.answerText"
            @labelevent="deleteQuestion(questionAnswerIndex)"
          />
          <button class="add-question" @click="addQuestion()">
            + Add another question
          </button>
        </template>

        <template v-slot:status> </template>
      </card>
    </section>
    <section
      class="answer-section"
      v-else-if="newQuestionData.type === 'image'"
    >
      <card
        class="card-layout"
        :error="errorMessage['answerPicture' + index]"
        v-for="(image, index) in newQuestionData.answers"
        :key="'imageAnswer' + index"
      >
        <template v-slot:support></template>

        <template v-slot:content>
          <!-- or add images -->
          <picture class="placeholder--feature-basics">
            <v-lazy-image
              class="image--placeholder"
              :src="newQuestionData.answers[index].answer"
              alt="pic"
              v-if="newQuestionData.answers[index].answer"
            />
          </picture>
          <picture-input
            v-model="checkPictureUrl[index]"
            :input="{
              label: 'Answer Option ' + letters(index),
              type: 'text',
              placeholder: 'Paste in your Image URL here',
              id: 'newquestion-image' + index
            }"
            :error="errorMessage['answerPicture' + index]"
            @setbuttonevent="setPicture(index)"
        /></template>

        <template v-slot:status></template>
      </card>
    </section>
    <div class="button-field">
      <buttonBack
        buttonText="back"
        @backbuttonevent="goTo('createQuestions')"
      />
      <buttonContinue
        v-if="editQuestion"
        buttonText="Update question"
        @continuebuttonevent="setNewQuestion"
      />
      <buttonContinue
        v-else
        buttonText="Add question"
        @continuebuttonevent="setNewQuestion"
      />
    </div>
  </aside>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { mapGetters } from "vuex";
import card from "@/components/cards/Card.vue";
import inputField from "@/components/inputs/Input.vue";
import buttonContinue from "@/components/buttons/ButtonContinue.vue";
import buttonBack from "@/components/buttons/ButtonBack.vue";
import buttonFeedback from "@/components/buttons/ButtonFeedback.vue";
import pageTransition from "@/components/transitions/transition.vue";
import pictureInput from "@/components/inputs/PictureInput.vue";

export default {
  components: {
    VLazyImage,
    card,
    inputField,
    buttonContinue,
    buttonBack,
    pageTransition,
    buttonFeedback,
    pictureInput
  },
  props: ["editQuestion"],
  name: "newQuestion",
  data() {
    return {
      //answer data with at least to answers
      newQuestionData: {
        question: "",
        type: null,
        answers: [{ answer: "" }, { answer: "" }]
      },
      saveAnswers: [],
      checkPictureUrl: ["", ""],
      success: null,
      error: null,
      errorMessage: {
        question: "",
        type: "",
        answerText: "",
        answerPicture1: "",
        answerPicture2: ""
      }
    };
  },
  methods: {
    //add a question to the questions array
    setNewQuestion() {
      //check if the inputs are not empty
      if (this.checkForm()) {
        //check if this is an edit of a question
        if (this.editQuestion) {
          //dispatch the edit action
          this.$store
            .dispatch("createModule/DATA_editSingleQuestion", {
              data: this.newQuestionData,
              position: this.editQuestion.position
            })
            //then reset the questions for future use
            .then(() => {
              this.newQuestionData = {
                question: "",
                type: null,
                answers: [{ answer: "" }, { answer: "" }]
              };
              //and go back to the overview
              this.goTo("createQuestions");
            });
          return;
        }
        //dispatch action for a new question
        this.$store
          .dispatch("createModule/DATA_addSingleQuestion", this.newQuestionData)
          //and reset the question. This is only nessesary if the route-view has a keep-alive-tag
          .then(() => {
            this.newQuestionData = {
              question: "",
              type: null,
              answers: [{ answer: "" }, { answer: "" }]
            };
            //and go back to the overview
            this.goTo("createQuestions");
          });
      }
    },
    choseAnswerType(type) {
      let cleanAnswers = [{ answer: "" }, { answer: "" }];
      let existingAnswers = this.newQuestionData.answers;
      //if you change the question type after adding data to the input, the input is saved
      if (type === "text") {
        //see if there is a save
        if (this.saveAnswers.length) {
          //use the save
          this.newQuestionData.answers = this.saveAnswers;
        }
      } else if (type === "image") {
        //save the answers before going to the images
        this.saveAnswers = this.newQuestionData.answers;
        //reset the answers
        this.newQuestionData.answers = cleanAnswers;
      }

      this.newQuestionData.type = type;
    },
    letters(index) {
      //transforms the index in capital letters
      return String.fromCharCode(65 + index);
    },
    addQuestion() {
      //pushes the question in the local question array
      let newQuestion = { answer: "" };
      this.newQuestionData.answers.push(newQuestion);
    },
    deleteQuestion(index) {
      //deletes a questions and addes a new one if there are less then 2 questions
      let newQuestion = { answer: "" };
      let answers = this.newQuestionData.answers;
      if (this.newQuestionData.answers.length > 2) {
        answers.splice(index, 1);
      } else {
        answers.splice(index, 1, newQuestion);
        //show an error
        this.errorMessage.answerText = "you need at least two questions";
        //for 5s
        setTimeout(() => {
          this.errorMessage.answerText = "";
        }, 5000);
      }
    },
    setPicture(index) {
      //check if there is an image to set and throw an error if you try to set an empty image
      if (!this.checkPictureUrl[index].length) {
        let newErrorMessage = { ...this.errorMessage };
        newErrorMessage["answerPicture" + index] = "Please type in a URL";
        this.errorMessage = newErrorMessage;
        return;
      }
      //check the image
      this.checkForImg(index)
        //and set it as an answer option
        .then(result => {
          this.newQuestionData.answers[index].answer = result;
          this.checkPictureUrl[index] = "";
        })
        .catch(error => {
          //throw an error if the image doesnt exist
          let newErrorMessage = { ...this.errorMessage };
          newErrorMessage["answerPicture" + index] = "this URL doesnt exist";
          this.errorMessage = newErrorMessage;
          this.checkPictureUrl[index] = "";
        });
    },
    //image check
    checkForImg(index) {
      let urlPath = this.checkPictureUrl[index];
      //check if there is an url input
      if (this.validURL(urlPath)) {
        //ping the server if this url exists
        return fetch(urlPath).then(res => {
          if (res.ok) {
            return urlPath;
          }
          throw "this picture doesnt exist";
        });
      }
      let newErrorMessage = { ...this.errorMessage };
      newErrorMessage["answerPicture" + index] = "URL is not valid";
      this.errorMessage = newErrorMessage;

      throw "url is not valid";
    },
    //check if the input is an URL
    validURL(url) {
      let re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
      return re.test(url);
    },
    checkForm() {
      //reset the errors
      this.errorMessage = {
        question: "",
        type: "",
        answerText: "",
        answerPicture: ["", ""]
      };

      //check again
      //check for a question
      if (!this.newQuestionData.question) {
        this.errorMessage.question = "You need to type in a question";
      }
      //check for a type
      if (!this.newQuestionData.type) {
        this.errorMessage.type = "Chose a question type";
      }
      //check for at least to answers
      if (
        this.newQuestionData.type === "text" &&
        (!this.newQuestionData.answers[0].answer ||
          !this.newQuestionData.answers[1].answer)
      ) {
        this.errorMessage.answerText = "at least two answers are required.";
      }
      //check for exactly 2 images and display the error only for the missing image card
      if (
        this.newQuestionData.type === "image" &&
        !this.newQuestionData.answers[0].answer &&
        this.newQuestionData.answers[1].answer
      ) {
        this.errorMessage["answerPicture" + 0] = "both pictures are required.";
      } else if (
        this.newQuestionData.type === "image" &&
        !this.newQuestionData.answers[1].answer &&
        this.newQuestionData.answers[0].answer
      ) {
        this.errorMessage["answerPicture" + 1] = "both pictures are required.";
      } else if (
        this.newQuestionData.type === "image" &&
        (!this.newQuestionData.answers[0].answer &&
          !this.newQuestionData.answers[1].answer)
      ) {
        this.errorMessage["answerPicture" + 0] = this.errorMessage[
          "answerPicture" + 1
        ] = "both pictures are required.";
      }
      //continue if there are no errors
      if (
        !this.errorMessage.question &&
        !this.errorMessage.type &&
        !this.errorMessage.answerText &&
        !this.errorMessage.answerPicture[0] &&
        !this.errorMessage.answerPicture[1]
      ) {
        return true;
      }
    },
    //navigation
    goTo(targetView) {
      this.$router.push({
        name: targetView
      });
    }
  },
  computed: {
    ...mapGetters({})
  },
  created() {
    //check if there is a question to be edited
    if (this.editQuestion) {
      //and set the question to the data
      this.newQuestionData = this.editQuestion.question;
    } else {
      //or reset the data
      this.newQuestionData = {
        question: "",
        type: null,
        answers: [{ answer: "" }, { answer: "" }]
      };
    }
  }
};
</script>

<style scoped>
.new-question {
  min-height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  background-color: var(--background);
  min-height: 100%;
  display: grid;
  padding: var(--top-padding) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
  overflow-y: scroll;
}

@media (min-width: 80em) {
  .new-question {
    grid-template-columns: 1fr 42rem 1fr;
  }
}

.header,
.question-section,
.answer-section,
.button-field {
  grid-column: 2/3;
}

.label--answer-option {
  font-weight: bold;
}

.add-question {
  display: block;
  text-align: left;
  text-decoration: underline;
  font-size: var(--1base);
  line-height: 150%;
  color: var(--text);
  font-family: "Montserrat", sans-serif;
  transition: all 0.2s ease;
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

.error-status {
  color: var(--error);
  font-weight: bold;
}

.active {
  border: 1px solid var(--success);
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
</style>

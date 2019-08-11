<template>
  <article
    class="analyze-wrapper"
    v-if="commentData && feedbackData && surveyData"
  >
    <section
      class="analyze"
      v-for="(surveyFeature, index) in surveyData[activeSurvey].featureData"
      :key="'surveyFeature' + index"
    >
      <section
        class="analyze-survey"
        v-if="removeSpaces(surveyFeature.basics.headline) === data.feature"
      >
        <div class="analyze-feedback" v-if="feedbackData[index]">
          <header class="header">
            <h2>Feedback</h2>
            <p v-if="surveyFeature.questions.length">
              This survey has
              <b>{{ surveyFeature.questions.length }}</b> feedback questions and
              <b v-if="feedbackData[index].length"
                >{{ feedbackData[index].length }} people</b
              >
              <b v-else> nobody</b> answered
            </p>
          </header>
          <card
            class="card-layout"
            v-for="(question, questionIndex) in surveyFeature.questions"
            :key="'previewquestion' + questionIndex"
          >
            <template v-slot:support> </template>

            <template v-slot:content>
              <div class="card-wrapper" v-if="question.type === 'text'">
                <p class="card-headline">{{ question.question }}</p>
                <button-feedback
                  v-for="(answer, answerIndex) in question.answers"
                  :answerData="answer"
                  :answerIndex="answerIndex"
                  :key="'analyticsAnswer' + answerIndex"
                  :percentage="
                    answerPercentage(answer.answer, index, questionIndex)
                  "
                />
              </div>
              <div class="card-wrapper" v-else-if="question.type === 'image'">
                <p class="card-headline">{{ question.question }}</p>
                <div
                  class="placeholder--feature-basics"
                  v-for="(image, imageIndex) in question.answers"
                  :key="'imageAnalyticsNr' + imageIndex"
                >
                  <picture>
                    <v-lazy-image
                      class="image--placeholder"
                      :src="image.answer"
                      alt="pic"
                    />
                    <div class="image--analytics">
                      <div
                        class="shadow"
                        :style="{
                          width:
                            answerPercentage(image.answer, index, imageIndex) +
                            '%'
                        }"
                      ></div>
                      <p class="percentage">
                        <b
                          >{{
                            answerPercentage(image.answer, index, imageIndex)
                          }}%</b
                        >
                      </p>
                    </div>
                  </picture>
                </div>
              </div>
            </template>

            <template v-slot:status> </template>
          </card>
        </div>
        <div class="analyze-feedback" v-else>
          <h3>no feedback available</h3>
        </div>
        <div class="analyze-comments" v-if="commentData[index]">
          <header class="header">
            <h2></h2>
            <p>
              This surveys comments
            </p>
          </header>
          <card
            class="card-layout"
            v-for="(comment, commentIndex) in commentData[index]"
            :key="'previewquestion' + commentIndex"
          >
            <template v-slot:support> </template>

            <template v-slot:content>
              <div class="comment-author">
                <p class="name">
                  <b>{{ comment.author }}</b> says
                </p>
                <p class="date">
                  {{ formattedDate(comment.createdOn) }}
                </p>
              </div>
              <p class="comment-body">{{ comment.comment }}</p>
              <div class="icon-wrapper">
                <heart class="icon"></heart>
                <p class="icon-counter">{{ comment.commentLike }}</p>
              </div>
            </template>

            <template v-slot:status> </template>
          </card>
        </div>
        <div class="analyze-comments" v-else>
          <h3>no comments available</h3>
        </div>
      </section>
    </section>
  </article>
</template>

<script>
import VLazyImage from "v-lazy-image";
import dayjs from "dayjs";
import { mapGetters } from "vuex";
import card from "@/components/cards/Card.vue";
import buttonFeedback from "@/components/buttons/ButtonFeedback.vue";
import heart from "@/components/icons/heart.vue";

export default {
  components: { VLazyImage, card, buttonFeedback, heart },
  props: ["feature"],
  name: "analyzeSurvey",
  data() {
    return {
      loading: false,
      data: { feature: null, survey: null }
    };
  },
  methods: {
    //replace spaces with "-"
    removeSpaces(headline) {
      let newHash = headline.replace(/\s+/g, "-");
      return newHash;
    },
    //get the percentage for feedback questions
    answerPercentage(answer, index, questionIndex) {
      let allAnswers = this.feedbackData[index].length;
      let numberOfAnswers = 0;
      //for every possible answer, check if there is one and increase a counter
      this.feedbackData[index].forEach(testerAnswer => {
        if (testerAnswer[questionIndex] == answer) {
          numberOfAnswers += 1;
        }
      });
      //if there are no votes for that answer return 0 to avoid total destruction of everything by dividing by 0
      if (numberOfAnswers === 0) {
        return 0;
      } else {
        //get the answer percentage
        return (numberOfAnswers / allAnswers) * 100;
      }
    },
    formattedDate(date) {
      let formattedDate = dayjs(date).format("DD/MM/YY");
      return formattedDate;
    }
  },
  computed: {
    ...mapGetters({
      surveyData: "surveyModule/getSurveyData",
      surveyLoaded: "surveyModule/getSurveyLoaded",
      activeSurvey: "surveyModule/getActiveSurvey",
      commentData: "analyticsModule/getCommentAnalytics",
      feedbackData: "analyticsModule/getFeedbackAnalytics"
    })
  },
  created() {
    //quickfix because params are not handled well with a keep-alive-tag
    this.data.feature = this.$route.params.feature;
    if (this.commentData.length && this.feedbackData.length) {
      return;
    }
    //get analytics data
    this.$store.dispatch("analyticsModule/DATA_getAnalytics");
  },
  activated() {
    //quickfix because params are not handled well with a keep-alive-tag
    this.data.feature = this.$route.params.feature;
    if (this.commentData.length && this.feedbackData.length) {
      return;
    }
    //get analytics data
    this.$store.dispatch("analyticsModule/DATA_getAnalytics");
  }
};
</script>

<style scoped>
.analyze-wrapper {
  display: grid;
}

.analyze {
  grid-column: 1/2;
  grid-row: 1/2;
  min-height: 100%;
  padding: var(--top-padding) 0 var(--2base) 0;
}

.analyze-survey {
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
}

.analyze-feedback,
.analyze-comments {
  grid-column: 2/3;
}

.placeholder--feature-basics {
  width: 100%;
  height: 10rem;
  background-color: var(--lighter-grey);
  border-radius: var(--fourthbase);
  position: relative;
  padding-top: 100%;
  margin: var(--fourthbase) 0;
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

.image--analytics {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: var(--fourthbase);
  z-index: 2;
  top: 0;
}

.shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: var(--dark-grey);
  border-radius: var(--fourthbase);
  z-index: 3;
  top: 0;
}

.percentage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--fourthbase);
  z-index: 5;
  color: white;
  text-shadow: 1px 1px 4px black;
}

.empty-state {
  padding: var(--top-padding) 0 var(--2base) 0;
}

.comment-author {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.name {
  margin-right: 0.2rem;
}

.icon-wrapper {
  display: flex;
  flex-direction: row;
}

.icon {
  height: var(--2base);
  margin-right: 0.2rem;
}
</style>

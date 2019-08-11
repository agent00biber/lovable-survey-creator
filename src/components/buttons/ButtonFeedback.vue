<template>
  <ul
    class="button button-feedback"
    @click="$emit('feedbackbuttonevent', answerData.questionType)"
  >
    <div class="button-lettering">
      <p v-if="customLettering">{{ customLettering }}</p>
      <p v-else>{{ letters }}</p>
    </div>
    <li v-if="customButtonText" class="button-text custom-text">
      {{ customButtonText }}
    </li>
    <li v-else class="button-text">
      {{ answerData.text || answerData.answer }}
    </li>
    <p v-if="percentage || percentage == 0" class="percentage">
      {{ percentage }}%
    </p>
    <div class="percentage-overlay" :style="{ width: percentage + '%' }"></div>
  </ul>
</template>

<script>
export default {
  name: "buttonFeedback",
  props: [
    "answerIndex",
    "answerData",
    "customLettering",
    "customButtonText",
    "percentage"
  ],
  computed: {
    letters() {
      return String.fromCharCode(97 + this.answerIndex);
    }
  }
};
</script>

<style scoped>
/*layout*/

.button-feedback {
  display: grid;
  grid-template-columns: min-content 1fr min-content;

  justify-self: center;
  background-color: var(--grey3);
  width: 100%;
  min-height: var(--4base);
  padding: var(--thirdbase);
  margin: var(--halfbase) 0;
  border-radius: var(--fourthbase);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  cursor: pointer;
  font-size: var(--halfbase);
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: var(--text);
}

.button::before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 500ms;
  border-radius: var(--thirdbase);
}

.button:hover::before {
  opacity: 1;
}

.button,
.button:focus {
  outline: none;
  outline-style: none;
  border: none;
}

.button:active {
  transform: translateY(0.1rem);
}

.button-lettering {
  height: var(--3base);
  width: var(--3base);
  background-color: var(--lighter-grey);
  grid-column: 1/2;
  justify-self: center;
  align-self: center;
  border-radius: var(--fourthbase);
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border: 1px solid transparent;
  position: relative;
  z-index: 2;
}

.button-text {
  grid-column: 2/3;
  justify-self: center;
  align-self: center;
  padding: 0 var(--1base);
  position: relative;
  z-index: 2;
}

.custom-text {
  text-transform: none;
  font-weight: 400;
  position: relative;
  z-index: 2;
}

.percentage {
  grid-column: 3/4;
  justify-self: end;
  align-self: center;
}

.percentage-overlay {
  content: " ";
  position: absolute;
  background-color: var(--light-grey);
  height: 100%;
  border-radius: var(--fourthbase);
}
</style>

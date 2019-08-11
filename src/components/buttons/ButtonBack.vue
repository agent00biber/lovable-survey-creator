<template>
  <button class="button button-back" @click="$emit('backbuttonevent')">
    <div class="default-state button-layout">
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 15 12" class="arrow">
        <path
          fill="#848484"
          fill-rule="evenodd"
          d="M15 5H3.192l2.983-3.59L5 0 0 6l5 6 1.175-1.41L3.192 7H15z"
        />
      </svg>
      <p class="button-text">{{ buttonText }}</p>
    </div>
  </button>
</template>

<script>
export default {
  name: "buttonContinue",
  props: ["buttonText"]
};
</script>

<style scoped>
/*layout*/

.button-back {
  background-color: hsl(0, 0%, 100%);
}

.button {
  width: 100%;
  max-width: 8rem;
  height: var(--4base);
  padding: var(--halfbase);
  margin: var(--halfbase) var(--fourthbase) var(--halfbase) 0;
  border-radius: var(--thirdbase);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  cursor: pointer;
}

@media (min-width: 22.5em) {
  .button {
    margin: var(--halfbase) var(--halfbase) var(--halfbase) 0;
  }
}

@media (min-width: 25em) {
  .button {
    max-width: 9rem;
  }
}

@media (min-width: 28em) {
  .button {
    max-width: 10rem;
  }
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

/*----default state-----*/

.default-state {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.button-text {
  color: hsla(0, 0%, 0%, 0.5);
  font-size: var(--halfbase);
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  padding-left: var(--halfbase);
}

.arrow {
  width: var(--1base);
  height: var(--1base);
}

@media (min-width: 28em) {
  .arrow {
    padding-top: 0.2rem;
  }
}
</style>

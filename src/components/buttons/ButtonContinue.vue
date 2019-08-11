<template>
  <button
  :class="[success ? 'success' : '', error ? 'error' : '']"
    class="button button-continue"
    @click="$emit('continuebuttonevent')"
  >
    <div class="loading-state spinner" v-if="loading" key="loading">
      <div class="bounce1 bounce"></div>
      <div class="bounce2 bounce"></div>
      <div class="bounce3 bounce"></div>
    </div>
    <div class="error-state" v-else-if="error" key="error">
      <p class="button-text">Error!</p>
    </div>
    <div class="success-state" v-else-if="success" key="success">
      <p class="button-text">Lets go!</p>
    </div>
    <div class="default-state button-layout" v-else key="defaultState">
      <p class="button-text">{{ buttonText }}</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 15 12" class="arrow">
        <path
          fill="#FFF"
          fill-rule="evenodd"
          d="M0 5h11.808L8.825 1.41 10 0l5 6-5 6-1.175-1.41L11.808 7H0z"
        />
      </svg>
    </div>

  </button>

  </button>
</template>

<script>

export default {
  name: "buttonContinue",
  props: ["buttonText", "loading", "error", "success"]
};
</script>

<style scoped>
/*----general button style-----*/

.button-continue {
  background-color: var(--main-color);
}

.button {
    width: 100%;
  max-width: 12.5rem;
  height: var(--4base);
  padding: var(--halfbase);
  margin: var(--halfbase) 0 var(--halfbase) var(--fourthbase);
  border-radius: var(--thirdbase);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  cursor: pointer;
}

@media (min-width: 22.5em) {
    .button {
      margin: var(--halfbase) 0 var(--halfbase) var(--halfbase);
    }
}


@media (min-width: 25em) {
  .button {
    max-width: 13.5rem;
  }
}

@media (min-width: 28em) {
  .button {
    max-width: 14.5rem;
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
  color: hsl(0, 0%, 100%);
  font-size: var(--halfbase);
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  padding-right: 0;
}

.arrow {
  width: 0;
  height: 0;

}

@media (min-width: 22.5em) {
    .button-text {
      padding-right: var(--halfbase);
    }
    .arrow {
      width: var(--1base);
      height: var(--1base);
    }
}

@media (min-width: 28em) {
    .arrow {
     padding-top: 0.2rem
    }
}




/*-----error/success----*/

.error {
  color: hsl(0, 0%, 100%);
  background-color: var(--error);
}

.success {
  color: hsl(0, 0%, 100%);
  background-color: var(--success);
}

/*----loading-----*/

.spinner {
  text-align: center;
}

.bounce {
  width: 0.75rem;
  height: 0.75rem;
  background-color: white;
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

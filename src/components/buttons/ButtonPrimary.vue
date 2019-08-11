<template>
  <button
    v-if="error"
    class="button button-error"
    @click="$emit('primarybuttonevent')"
  >
    error
  </button>
  <button
    v-else
    class="button button-primary"
    @click="$emit('primarybuttonevent')"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "buttonPrimary",
  props: ["buttonText", "error"]
};
</script>

<style scoped>
/*layout*/

.button-primary {
  color: hsl(0, 0%, 100%);
  background-color: var(--main-color);
}

.button-error {
  color: hsl(0, 0%, 100%);
  background-color: var(--error);
}

.button {
  width: 100%;
  max-width: 16rem;
  height: var(--4base);
  padding: var(--1base) var(--halfbase);
  margin: var(--halfbase) 0;
  justify-self: center;
  border-radius: var(--thirdbase);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  cursor: pointer;
  font-size: var(--halfbase);
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
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
</style>

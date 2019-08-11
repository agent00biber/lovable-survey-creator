<template>
  <form @submit.prevent class="form">
    <label class="label--form" :for="input.id" v-if="input.label">
      {{ input.label }}
    </label>
    <input
      class="input--form input-shadow"
      :class="[error ? 'error' : '']"
      :type="input.type"
      :placeholder="input.placeholder"
      :id="input.id"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <button
      class="button button-set"
      @click="$emit('setbuttonevent', input.index)"
    >
      Set
    </button>
    <p v-show="error" class="error-layout">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: "inputField",
  props: ["value", "input", "error"]
};
</script>

<style scoped>
.form {
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: 1fr var(--5base);
  width: 100%;
}

.label--form {
  font-size: var(--1base);
  margin-bottom: var(--halfbase);
  font-weight: bold;
  grid-column: 1/2;
  grid-row: 1/2;
  color: var(--text);
}

.input--form {
  grid-column: 1/3;
  grid-row: 2/3;
  position: relative;
  width: 100%;
  border-radius: var(--fourthbase);
  border: 1px solid var(--darker-grey);
  height: var(--4base);
  padding: var(--1base) var(--halfbase);
  line-height: 150%;
  color: var(--text);
  font-size: var(--1base);
}

.input--form:focus {
  outline: none;
  outline-style: none;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  transition: all 200ms;
}

.input--form::placeholder {
  font-size: var(--1base);
}

.input-preview {
  grid-column: 2/3;
  grid-row: 2/3;
  margin-left: -2px;
}

.error {
  border: 1px solid var(--error);
}

.error-layout {
  color: var(--error);
  padding: var(--fourthbase) var(--fourthbase) 0 var(--fourthbase);
  font-weight: bold;
  grid-row: 3/4;
  grid-column: 1/3;
}

/*button*/

.button {
  width: 100%;
  cursor: pointer;
}

.button,
.button:focus {
  outline: none;
  outline-style: none;
  border: none;
}

.button-set {
  grid-row: 2/3;
  grid-column: 2/3;
  position: relative;
  z-index: 2;
  background-color: var(--main-color);
  height: calc(var(--4base) - 0.5rem);
  width: calc(100% - 0.25rem);
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--fourthbase);
  color: hsl(0, 0%, 100%);
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: var(--halfbase);
}
</style>

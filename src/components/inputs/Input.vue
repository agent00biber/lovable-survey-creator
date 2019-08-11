<template>
  <form @submit.prevent class="form">
    <label
      class="label--form"
      :for="input.id"
      v-if="input.label && !input.labelRemove"
    >
      {{ input.label }}
    </label>
    <label
      class="label--form label-remove"
      :for="input.id"
      v-else-if="input.label && input.labelRemove"
    >
      {{ input.label }}
      <p class="text-remove" @click="$emit('labelevent', index)">(remove)</p>
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
    <p v-show="error" class="error-layout">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: "inputField",
  props: ["value", "input", "error", "index"]
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.label--form {
  font-weight: bold;
  font-size: var(--1base);
  margin-bottom: var(--halfbase);
  color: var(--text);
}

.label-remove {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}

.text-remove {
  font-weight: 400;
  font-size: 0.75rem;
}

.input--form {
  width: 100%;
  border-radius: var(--fourthbase);
  border: 1px solid var(--darker-grey);
  height: var(--4base);
  padding: var(--1base) var(--halfbase);
  line-height: 150%;
  font-size: var(--1base);
  color: var(--text);
}

.input--form:focus {
  outline: none;
  outline-style: none;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--darker-grey);
  transition: all 200ms;
}

.input--form::placeholder {
  font-size: var(--1base);
}

.error {
  border: 1px solid var(--error);
}

.error-layout {
  color: var(--error);
  padding: var(--fourthbase) var(--fourthbase) 0 var(--fourthbase);
  font-weight: bold;
}
</style>

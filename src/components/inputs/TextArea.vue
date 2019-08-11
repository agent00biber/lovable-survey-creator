<template>
  <form @submit.prevent class="form">
    <label class="label--form" :for="defaultTextarea.id">
      {{ defaultTextarea.label }}
    </label>
    <textarea
      class="textarea--form input-shadow"
      :class="[error ? 'error' : '']"
      :type="defaultTextarea.type"
      :placeholder="defaultTextarea.placeholder"
      :id="defaultTextarea.id"
      :value="value"
      @input="$emit('input', $event.target.value)"
      cols="30"
      rows="30"
    />
    <p v-show="error" class="error-layout">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: "defaultTextArea",
  props: ["defaultTextarea", "value", "error"]
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

.textarea--form {
  width: 100%;
  border-radius: var(--fourthbase);
  border: 1px solid var(--darker-grey);
  height: var(--6base);
  padding: var(--1base) var(--halfbase);
  line-height: 150%;
  color: var(--text);
  font-size: var(--1base);
}

.textarea--form:focus {
  outline: none;
  outline-style: none;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  transition: all 200ms;
}

.textarea--form::placeholder {
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

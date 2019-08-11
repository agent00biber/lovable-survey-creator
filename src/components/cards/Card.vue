<template>
  <section class="card">
    <div class="support--card">
      <!-- displays information or actions related to that card -->
      <slot name="support"></slot>
    </div>

    <div
      class="content--card"
      :class="[success ? 'success' : '', error ? 'error' : '']"
    >
      <!-- main content -->
      <slot name="content"></slot>
    </div>

    <!-- displays error messages-->
    <div class="status--card">
      <slot name="status"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "card",
  props: ["error", "success"]
};
</script>

<style scoped>
.support--card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: var(--fourthbase);
}

.support--card p,
.support--card a {
  font-weight: bold;
  color: var(--darker-grey);
  font-size: calc(var(--1base) * 0.8);
}

.content--card {
  display: grid;
  grid-row-gap: var(--2base);
  padding: var(--2base) var(--1base);
  background-color: white;
  box-shadow: 1px 1px 5px 1px var(--light-grey);
  border: 1px solid transparent;
  border-radius: var(--fourthbase);
  transition: all 200ms;
}

.status--card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 var(--fourthbase) var(--fourthbase) var(--fourthbase);
  font-size: calc(var(--1base) * 0.8);
  font-weight: bold;
}

/*---------loading states----------*/

.success {
  border: 1px solid var(--success);
  transition: all 200ms;
}
.error {
  border: 1px solid var(--error);
  transition: all 200ms;
}
</style>

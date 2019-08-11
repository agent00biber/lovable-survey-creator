<template>
  <section class="nav--before-auth">
    <router-link class="title" :to="{ name: 'home', hash: '#header' }">
      <heart class="heart-icon" />
      <h3 class="title-name">Lovable Surveys</h3>
    </router-link>
    <router-link :to="{ name: 'login' }">Login</router-link>
  </section>
</template>

<script>
import heart from "@/components/icons/heart.vue";

export default {
  components: { heart },
  name: "navBar"
};
</script>

<style scoped>
.nav--before-auth {
  height: var(--3base);
  padding: var(--halfbase) 0;
  display: grid;
  grid-template-columns: 2fr min-content;
  width: 100%;
}

@media (min-width: 80rem) {
  .nav--before-auth {
    height: var(--4base);
  }
}

.title {
  grid-column: 1/2;
  justify-self: start;
  align-self: center;
  display: flex;
}

.heart-icon {
  grid-column: 2/3;
  width: var(--2base);
  height: var(--2base);
  margin-right: var(--halfbase);
}
</style>

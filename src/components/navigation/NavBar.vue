<template>
  <!--dont show the navigation during login and signup to not distract the user-->
  <nav
    class="navbar"
    id="nav"
    v-if="$route.name !== 'login' && $route.name !== 'signup'"
  >
    <!-- show the small navigation on the homepage and legal  -->
    <pre-auth v-if="$route.name === 'home' || $route.name === 'legal'" />
    <!-- the user is logged in every other case  -->
    <post-auth v-else />
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import preAuth from "@/components/navigation/NavbarPreAuth.vue";
import postAuth from "@/components/navigation/NavbarPostAuth.vue";

export default {
  components: {
    preAuth,
    postAuth
  },
  name: "navBar"
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
  padding: var(--halfbase) var(--1base) var(--halfbase) var(--halfbase);
}

@media (min-width: 22.5em) {
  .navbar {
    padding: var(--halfbase) var(--1base) var(--1base) var(--1base);
  }
}

@media (min-width: 30em) {
  .navbar {
    padding: var(--halfbase) var(--2base) var(--1base) var(--2base);
  }
}

@media (min-width: 40em) {
  .navbar {
    padding: var(--1base) var(--3base);
  }
}

@media (min-width: 80em) {
  .navbar {
    padding: var(--1base) var(--3base) var(--thirdbase) var(--3base);
  }
}

/*-------------after Auth-----------------*/

.top-nav {
  padding-bottom: var(--halfbase);
  display: grid;
  grid-template-columns: min-content min-content 1fr min-content;
  grid-column-gap: var(--1base);
}

.headline--top-nav {
  color: var(--darker-grey);
}

.sub-nav {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.sub-nav::-webkit-scrollbar {
  display: none;
}

.sub-nav a {
  flex: 0 0 auto;
  margin-right: var(--1base);
}

.nav-border {
  position: relative;
}

.nav-border::after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: grey;
  transition: all 0.5s ease;
  opacity: 0;
}

.nav-active.nav-border::after {
  opacity: 1;
}
</style>

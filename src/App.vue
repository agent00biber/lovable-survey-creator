<template>
  <main id="app">
    <!--always on top navbar -->
    <nav-bar />
    <page-transition propTransitionName="navigation">
      <!--slide out menu -->
      <hamburger-bar />
    </page-transition>
    <page-transition propTransitionRouter="true">
      <keep-alive>
        <!--main view -->
        <router-view :key="'survey' + $route.fullPath" />
      </keep-alive>
    </page-transition>
  </main>
</template>

<script>
import navBar from "@/components/navigation/NavBar.vue";
import pageTransition from "@/components/transitions/transition.vue";
import hamburgerBar from "@/components/navigation/hamburgerBar.vue";

export default {
  components: {
    navBar,
    pageTransition,
    hamburgerBar
  },
  name: "app"
};
</script>

<style>
/*Globale Variabeln*/
:root {
  /*16px*/
  --1base: 1rem;
  /*24px*/
  --2base: calc(1.5 * var(--1base));
  /*36px*/
  --3base: calc(1.5 * 1.5 * var(--1base));
  /*54px*/
  --4base: calc(1.5 * 1.5 * 1.5 * var(--1base));
  /*81px*/
  --5base: calc(1.5 * 1.5 * 1.5 * 1.5 * var(--1base));
  /*122px*/
  --6base: calc(1.5 * 1.5 * 1.5 * 1.5 * 1.5 * var(--1base));
  /*10px*/
  --halfbase: calc((var(--1base) / 1.5));
  /*6.66px*/
  --thirdbase: calc((var(--1base) / 1.5 / 1.5));
  /*4.44px*/
  --fourthbase: calc((var(--1base) / 1.5 / 1.5 / 1.5));

  /*color*/
  --text: hsla(0, 0%, 0%, 0.8);
  --headline: hsla(0, 0%, 0%, 0.9);
  --background: hsla(240, 27%, 96%, 1);
  --dark-grey: hsla(0, 0%, 0%, 0.7);
  --darker-grey: hsla(0, 0%, 0%, 0.5);
  --lighter-grey: hsla(0, 0%, 0%, 0.3);
  --light-grey: hsla(0, 0%, 0%, 0.1);
  --success: hsla(125, 59%, 64%, 1);
  --error: hsla(0, 59%, 64%, 1);
  --main-color: hsla(227.5, 38.7%, 24.3%, 1);
  --help-color: hsla(4, 94%, 69%, 1);

  /*basic margin settings*/
  --main-view: 1fr;
  --outer-column: var(--halfbase);
  --row-gap: var(--2base);
  --top-padding: var(--6base);
}
@media (min-width: 22.5em) {
  :root {
    /*basic margin settings*/
    --outer-column: var(--1base);
  }
}

@media (min-width: 28em) {
  :root {
    --1base: 1.1rem;
  }
}

@media (min-width: 30em) {
  :root {
    --outer-column: var(--2base);
    --top-padding: calc(var(--6base) * 1.25);
  }
}

@media (min-width: 40em) {
  :root {
    --1base: 1.2rem;
    --outer-column: var(--3base);
    --row-gap: var(--3base);
  }
}

@media (min-width: 40em) {
  :root {
    --outer-column: 0.2fr;
  }
}

@media (min-width: 70em) {
  :root {
    --1base: 1.1rem;
  }
}

@media (min-width: 80em) {
  :root {
    --1base: 1rem;
    --main-view: 35rem;
    --outer-column: 1fr;
  }
}

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap");

/*Borderbox*/
*,
:after,
:before {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-decoration: none;
}

body,
html,
#app {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Montserrat", sans-serif;
  background-color: var(--background);
}

h1 {
  font-size: var(--3base);
  color: var(--headline);
}

h2 {
  font-size: var(--2base);
  color: var(--headline);
}

h3 {
  color: var(--dark-grey);
}

p,
a,
i,
li,
textarea {
  font-size: var(--1base);
  line-height: 150%;
  color: var(--text);
}

a {
  cursor: pointer;
}

ul {
  list-style: none;
}
</style>

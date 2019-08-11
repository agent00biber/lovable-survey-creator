<template>
  <aside class="settings-modal" v-if="hamburgerMenu">
    <section class="navigation--modal">
      <div class="top-section">
        <h2 class="headline--navigation">
          Everything else
        </h2>
        <p class="body--navigation">
          <b>Hey there,</b> <br />
          we hope you enjoy this web app. If you want to give us some
          constructive feedback or just a shout out, contact us
          <a class="link--navigation" href="#">here</a>
        </p>

        <div class="account">
          <button-primary
            class="link--navigation"
            @primarybuttonevent="goTo('signup')"
            buttonText="sign up"
            v-if="$route.name === 'home'"
          />
          <button-primary
            class="link--navigation"
            @primarybuttonevent="logout()"
            buttonText="log out"
            v-else
          />
          <a class="link--navigation" @click="goTo('legal', 'terms')">
            reset password
          </a>
        </div>
      </div>

      <div class="bottom-section">
        <h3 class="headline--bottom-section">Legal</h3>
        <a class="link--navigation" @click="goTo('legal', 'Netiquette')">
          Netiquette
        </a>
        <a class="link--navigation" @click="goTo('legal', 'privacy')">
          Privacy
        </a>
        <a class="link--navigation" @click="goTo('legal', 'terms')">
          Terms and Conditions
        </a>
      </div>
    </section>
    <section class="transparent--modal" @click="isHamburgerToggled()"></section>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";
import buttonPrimary from "@/components/buttons/ButtonPrimary.vue";

export default {
  components: { buttonPrimary },
  name: "hamburgerBar",
  methods: {
    //toggle the side menu on/off
    isHamburgerToggled() {
      this.$store.dispatch("navModule/NAV_toggleHamburgerMenu");
    },
    //navigation and closing of the menu
    goTo(targetName, targetHash) {
      this.$router.push({ name: targetName, hash: "#" + targetHash });
      this.isHamburgerToggled();
    },
    //logout
    logout() {
      this.$store.dispatch("authModule/USER_logout");
      this.isHamburgerToggled();
    }
  },
  computed: {
    ...mapGetters({
      hamburgerMenu: "navModule/getActiveHamburgerMenu"
    })
  }
};
</script>

<style scoped>
.settings-modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1001;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

@media (min-width: 40rem) {
  .settings-modal {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 60rem) {
  .settings-modal {
    grid-template-columns: 30rem 1fr;
  }
}

@media (min-width: 80rem) {
  .settings-modal {
    grid-template-columns: 35rem 1fr;
  }
}

.transparent--modal {
  background-color: transparent;
}

.navigation--modal {
  height: 100%;
  display: grid;
  grid-template-rows: 1.5fr 1fr;
  background-color: white;
  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.navigation--modal::-webkit-scrollbar {
  display: none;
}

.top-section {
  height: 100%;
  grid-row: 1/2;
  padding: var(--3base) var(--2base);
  display: grid;
  grid-template-rows: min-content min-content min-content 1fr;
  align-self: end;
  grid-row-gap: var(--row-gap);
}

@media (min-width: 80rem) {
  .top-section {
    padding: var(--3base) var(--4base) var(--3base) var(--5base);
  }
}

.account {
  display: flex;
  flex-direction: column;
}

.headline--navigation {
  padding-bottom: var(--2base);
}

.bottom-section {
  height: 100%;
  grid-row: 2/3;
  padding: var(--2base) var(--2base);
  align-self: start;
  display: flex;
  flex-direction: column;
  background-color: var(--light-grey);
}

@media (min-width: 80rem) {
  .bottom-section {
    padding: var(--3base) var(--4base) var(--3base) var(--5base);
  }
}

.headline--bottom-section {
  padding-bottom: var(--2base);
}

.link--navigation {
  margin: var(--halfbase) 0;
  text-decoration: underline currentcolor;
  font-weight: bold;
}
</style>

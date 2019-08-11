<template>
  <article class="login">
    <section class="top-section">
      <header class="header">
        <p class="topline">We missed you</p>
        <h1 class="headline">Welcome back, Handsome</h1>
      </header>
    </section>
    <section class="bottom-section">
      <card class="card-layout" :error="error" :success="success">
        <template v-slot:support>
          <!-- option for sign up -->
          <p class="text--switch">You dont have an account?</p>
          <router-link :to="{ name: 'signup', params: {} }" class="link--switch"
            >Sign up here</router-link
          >
        </template>

        <template v-slot:content>
          <!-- input fields -->
          <inputField
            v-model="authData.email"
            :input="{
              label: 'Your Email',
              type: 'email',
              placeholder: 'YourEmail@provider.com',
              id: 'email-signup'
            }"
            :error="errorMessage.email"
          />
          <inputField
            v-model="authData.password"
            :input="{
              label: 'Your Password',
              type: 'password',
              placeholder: '************',
              id: 'password-signup'
            }"
            :error="errorMessage.password"
          />
          <div class="button-field">
            <!-- additional state handling-->
            <buttonBack buttonText="back" @backbuttonevent="goTo('home')" />
            <buttonContinue
              buttonText="continue"
              @continuebuttonevent="userSignup"
              :loading="loading"
              :error="error"
              :success="success"
            />
          </div>
        </template>

        <template v-slot:status>
          <!-- main state handling -->
          <page-transition propTransitionName="fade">
            <p class="error-status" v-if="error">error :(</p>
            <p class="success-status" v-else-if="success">success :)</p>
          </page-transition>
        </template>
      </card>
    </section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import card from "@/components/cards/Card.vue";
import inputField from "@/components/inputs/Input.vue";
import buttonContinue from "@/components/buttons/ButtonContinue.vue";
import buttonBack from "@/components/buttons/ButtonBack.vue";
import pageTransition from "@/components/transitions/transition.vue";

export default {
  components: {
    card,
    inputField,
    buttonContinue,
    buttonBack,
    pageTransition
  },
  props: [],
  name: "login",
  data() {
    return {
      loading: false,
      success: false,
      error: false,
      errorMessage: {
        email: "",
        password: ""
      },
      authData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    checkForm() {
      //check if there is an email and if its valid
      if (!this.authData.email) {
        this.errorMessage.email = "Email required.";
      } else if (!this.validEmail(this.authData.email)) {
        this.errorMessage.email = "Valid Email required.";
      }
      //check for a password
      if (!this.authData.password) {
        this.errorMessage.password = "Password required.";
      }
      //if there are an email and a password continue
      if (!this.errorMessage.email && !this.errorMessage.password) {
        return true;
      }
    },
    validEmail(email) {
      //regex email check
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    userSignup() {
      //check the form
      if (this.checkForm()) {
        //set of a loading state while firebase checks the login
        this.loading = true;
        this.$store
          .dispatch("authModule/AUTH_login", this.authData)
          .then(result => {
            //if the user is know stop the loading state
            this.loading = false;
            //and show a success state
            this.setButton("success");
            //for 500ms
            setTimeout(() => {
              this.goTo("dashboard");
            }, 500);
          })
          //then clear the data for reuse again
          .then(() => {
            this.authData = {
              email: "",
              password: ""
            };
          })
          //otherwise throw an error for firebase
          .catch(error => {
            console.log(error);
            this.loading = false;
            this.setButton("error");
          });
      } else {
        //throw an error if the form is not complete
        this.setButton("error");
      }
    },
    setButton(state) {
      //state handling for error and success
      if (state === "error") {
        this.error = true;
        this.success = false;
      } else if (state === "success") {
        this.success = true;
        this.error = false;
      }
      setTimeout(() => {
        //display only for 5s to not annoy the user to much
        this.success = false;
        this.error = false;
      }, 5000);
    },
    goTo(targetView) {
      //programmatic navigation
      this.$router.push({
        name: targetView
      });
    }
  }
};
</script>

<style scoped>
.login {
  min-height: 100%;
  display: grid;
  padding: var(--top-padding) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
}

.top-section {
  grid-column: 2/3;
  display: grid;
  grid-row-gap: var(--1base);
}

.link--switch {
  text-decoration: underline;
  font-weight: bold;
}

.bottom-section {
  grid-column: 2/3;
}

.button-field {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (min-width: 28em) {
  .button-field {
    justify-content: center;
  }
}

.legal--comments {
  padding: var(--2base) var(--thirdbase) var(--fourthbase) var(--thirdbase);
}

.info-text--legal {
  color: var(--darker-grey);
  font-size: calc(var(--1base) * 0.8);
  display: flex;
  flex-direction: column;
}

.link--navigation {
  margin: var(--halfbase) 0;
  text-decoration: underline currentcolor;
}

.success-status {
  color: var(--success);
}

.error-status {
  color: var(--error);
}
</style>

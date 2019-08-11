<template>
  <article class="signup">
    <section class="top-section">
      <header class="header">
        <p class="topline">Get actionable feedback now</p>
        <h1 class="headline">Create a free a account</h1>
      </header>
    </section>
    <section class="bottom-section">
      <card class="card-layout" :error="error" :success="success">
        <template v-slot:support>
          <!--support text with the option to switch to login -->
          <p class="text--switch">You already have an account?</p>
          <router-link :to="{ name: 'login' }" class="link--switch"
            >Log in here</router-link
          >
        </template>

        <template v-slot:content>
          <!--custom input fields for name, email and password with error handling -->
          <inputField
            v-model="authData.name"
            :input="{
              label: 'Your Name',
              type: 'name',
              placeholder: 'e.g. Val Kilmer',
              id: 'name-signup'
            }"
            :error="errorMessage.name"
          />
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
            <!--buttons with additional error handling -->
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
          <!--handels success and error status-->
          <page-transition propTransitionName="fade">
            <p class="error-status" v-if="error">error :(</p>
            <p class="success-status" v-else-if="success">success :)</p>
          </page-transition>
        </template>
      </card>
      <div class="legal--comments">
        <p class="info-text--legal">
          By clicking 'Signup' you accept the netiquette + the terms and
          condition of this site, which mostly says not to be evil. You can read
          more about it here:
          <br />
        </p>
        <a
          class="link--navigation info-text--legal"
          @click="goTo('legal', 'terms')"
        >
          Terms and Conditions
        </a>
        <a
          class="link--navigation info-text--legal"
          @click="goTo('legal', 'netiquette')"
        >
          Netiquette
        </a>
      </div>
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
  name: "signup",
  data() {
    return {
      loading: false,
      success: false,
      error: false,
      //per field error messages
      errorMessage: {
        name: "",
        email: "",
        password: ""
      },
      authData: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    checkForm() {
      //check for a name
      if (!this.authData.name) {
        this.errorMessage.name = "Name required.";
      }
      //check for an email and than for a valid email adress
      if (!this.authData.email) {
        this.errorMessage.email = "Email required.";
      } else if (!this.validEmail(this.authData.email)) {
        this.errorMessage.email = "Valid Email required.";
      }
      //check for a password
      if (!this.authData.password) {
        this.errorMessage.password = "Password required.";
      }
      //if everything is valid, continue
      if (
        !this.errorMessage.name &&
        !this.errorMessage.email &&
        !this.errorMessage.password
      ) {
        return true;
      }
    },
    //check for a characteristics of a normal email
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    userSignup() {
      // perform a check
      if (this.checkForm()) {
        //if it returns true, set loading to true while firebase does its thing
        this.loading = true;
        // and dispath the signup vuex call
        this.$store
          .dispatch("authModule/AUTH_signup", this.authData)
          //when it returns true
          .then(result => {
            //set loading to false
            this.loading = false;
            // and display a success-green around the button
            this.setButton("success");
            setTimeout(() => {
              //for the user to see this, the routing-call is delayed by 500ms
              this.goTo("dashboard");
            }, 500);
          })
          .then(() => {
            //clean the data for usage again
            this.authData = {
              name: "",
              email: "",
              password: ""
            };
          })
          .catch(error => {
            //show an error when firebase returns an error
            console.log(error);
            this.loading = false;
            this.setButton("error");
          });
      }
    },
    setButton(state) {
      //display error and success exklusivly
      if (state === "error") {
        this.error = true;
        this.success = false;
      } else if (state === "success") {
        this.success = true;
        this.error = false;
      }
      setTimeout(() => {
        //and hide them after 5s to not be annoying
        this.success = false;
        this.error = false;
      }, 5000);
    },
    //programmatic routing
    goTo(targetView, targetHash) {
      //quickfix because otherwise the routing tries to go to an undefined hash
      if (targetHash) {
        this.$router.push({
          name: targetView,
          hash: "#" + targetHash
        });
      } else {
        this.$router.push({
          name: targetView
        });
      }
    }
  }
};
</script>

<style scoped>
.signup {
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

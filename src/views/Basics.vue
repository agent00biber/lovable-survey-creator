<template>
  <article class="create-basics">
    <header class="header">
      <h2 class="headline">Basics</h2>
      <p class="subline">
        Step 1: Add one or more images and basic information to your feature
      </p>
    </header>
    <card
      class="card-layout"
      :error="error"
      :success="success"
      v-for="(picture, index) in basicData.pictures"
      :key="'basicCard' + index"
    >
      <template v-slot:support>
        <p v-if="basicData.pictures.length > 1">
          Picture {{ index + 1 }}/{{ basicData.pictures.length }}
        </p>
        <p v-else>Your Picture</p>
        <p
          v-if="basicData.pictures.length > 1"
          @click="deletePicture(index)"
          class="supporting-text"
        >
          delete this picture
        </p>
        <p v-else @click="deletePicture(index)" class="supporting-text">
          reset this picture
        </p>
      </template>

      <template v-slot:content>
        <picture class="placeholder--feature-basics">
          <v-lazy-image
            class="image--placeholder"
            :src="basicData.pictures[index].pictureURL"
            alt="pic"
            v-if="basicData.pictures[index].pictureURL"
          />
        </picture>
        <picture-input
          v-model="checkPictureURL[index].checkURL"
          :input="{
            label: 'Image',
            type: 'text',
            placeholder: 'Paste your image here',
            id: 'input-image' + index,
            index
          }"
          :error="errorMessage.picture[index].error"
          @setbuttonevent="setPicture"
        />
      </template>

      <template v-slot:status> </template>
    </card>

    <p class="add-picture action-element" @click="addPicture()">
      + add another picture
    </p>

    <card class="card-layout" :error="error" :success="success">
      <template v-slot:support> </template>

      <template v-slot:content>
        <defaultInput
          v-model="basicData.headline"
          :input="{
            label: 'Headline',
            type: 'text',
            placeholder: 'Your new headline',
            id: 'headline-id'
          }"
          :error="errorMessage.headline"
        />
        <defaultTextarea
          v-model="basicData.body"
          :defaultTextarea="{
            label: 'Body',
            type: 'text',
            placeholder: 'Your bodytext',
            id: 'textaera-id'
          }"
          :error="errorMessage.body"
        />
      </template>

      <template v-slot:status> </template>
    </card>
    <div class="button-field">
      <buttonBack buttonText="back" @backbuttonevent="goTo('createOverview')" />
      <buttonContinue
        buttonText="add questions next"
        @continuebuttonevent="setBasics"
        :error="error"
        :success="success"
      />
    </div>
  </article>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { mapGetters } from "vuex";
import card from "@/components/cards/Card.vue";
import pictureInput from "@/components/inputs/PictureInput.vue";
import defaultInput from "@/components/inputs/Input.vue";
import defaultTextarea from "@/components/inputs/TextArea.vue";
import buttonContinue from "@/components/buttons/ButtonContinue.vue";
import buttonBack from "@/components/buttons/ButtonBack.vue";

export default {
  components: {
    VLazyImage,
    card,
    pictureInput,
    defaultInput,
    defaultTextarea,
    buttonContinue,
    buttonBack
  },
  //if the basics are being edited, this array contains existing basic information
  props: ["editBasics"],
  name: "createBasics",
  data() {
    return {
      basicData: {
        pictures: [{ pictureURL: "" }],
        pictureActive: 0,
        headline: "",
        body: ""
      },
      //for every picture there is a check
      checkPictureURL: [{ checkURL: "" }],
      success: null,
      error: null,
      //and error messages
      errorMessage: {
        picture: [{ error: "" }],
        headline: "",
        body: ""
      }
    };
  },
  methods: {
    setBasics() {
      //check if the needed information is there
      if (this.checkForm()) {
        //and push it to the store
        this.$store
          .dispatch("createModule/DATA_setFeature", {
            name: "basics",
            data: this.basicData
          })
          .then(() => {
            //then go to the next step
            this.goTo("createQuestions");
            //and reset the data
            this.basicData = {
              pictures: [{ pictureURL: "" }],
              pictureActive: 0,
              headline: "",
              body: ""
            };
            this.checkPictureURL = [{ pictureURL: "" }];
          });
      }
    },
    //regex check if the picture url is an actual url
    validURL(url) {
      var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
      return re.test(url);
    },
    //2-step image check
    checkForImg(index) {
      let urlPath = this.checkPictureURL[index].checkURL;
      //check if the URL is valid
      if (this.validURL(urlPath)) {
        return (
          fetch(urlPath)
            //check if the image is on a server and returns a signal
            .then(res => {
              if (res.ok) {
                return urlPath;
              } else {
                //throw an error if the image doest exist
                throw "this picture doesnt exist";
              }
            })
            .catch(error => {
              //throw an error if the image doest exist
              this.errorMessage.picture[index].error = "url is not valid";
              throw "this picture doesnt exist";
            })
        );
      } else {
        //throw an error if the image url is not valid
        this.errorMessage.picture[index].error = "url is not valid";
      }
    },
    setPicture(index) {
      //check the image
      this.checkForImg(index)
        .then(result => {
          //set the image as the src-value for it to be displayed
          this.basicData.pictures[index].pictureURL = result;
        })
        .catch(error => {
          //or throw an error
          console.log(error);
          this.errorMessage.picture[index].error = "This URL doesnt exist";
        });
    },
    addPicture() {
      //add another picture-object to the picture array so another card gets rendered
      let pictureArray = this.basicData.pictures;
      let anotherPicture = { pictureURL: "" };
      pictureArray.push(anotherPicture);
      //align image array with error and check arrays
      this.setAdditionalPictureData();
    },
    deletePicture(index) {
      let pictureArray = this.basicData.pictures;
      let anotherPicture = { pictureURL: "" };
      // if there is more than one image, remove that image
      if (pictureArray.length > 1) {
        pictureArray.splice(index, 1);
        //align image array with error and check arrays
        this.setAdditionalPictureData();
      } else {
        // if there is only one image, reset it
        pictureArray.splice(index, 1, anotherPicture);
        //align image array with error and check arrays
        this.setAdditionalPictureData();
      }
    },

    setAdditionalPictureData() {
      //get the number of images
      let numberOfPictures = this.basicData.pictures.length;
      let anotherError = { error: "" };
      let anotherURLCheck = { checkURL: "" };

      //build an array with an error and a check for eath image
      let allPictureErrors = Array(numberOfPictures).fill(anotherError);
      let allURLChecks = Array(numberOfPictures).fill(anotherURLCheck);

      //set the new arrays to the data
      this.errorMessage.picture = allPictureErrors;
      this.checkPictureURL = allURLChecks;
    },
    checkForm() {
      //remove all errors to check for new ones
      let pictureArray = this.basicData.pictures.length;
      let anotherError = { error: "" };
      let allPictureErrors = Array(pictureArray).fill(anotherError);
      this.errorMessage = {
        picture: allPictureErrors,
        headline: "",
        body: ""
      };

      //check again
      //check if there are no pictures
      if (!this.basicData.pictures[0].pictureURL) {
        this.errorMessage.picture[0].error = "at least one picture required.";
      }
      //check for a headline
      if (!this.basicData.headline) {
        this.errorMessage.headline = "headline required.";
      }
      //check for a body text
      if (!this.basicData.body) {
        this.errorMessage.body = "text required.";
      }
      //continue if there are no errors
      if (
        !this.errorMessage.picture[0].error &&
        !this.errorMessage.headline &&
        !this.errorMessage.body
      ) {
        return true;
      }
    },
    //navigation
    goTo(targetView) {
      this.$router.push({
        name: targetView
      });
    }
  },
  computed: {
    ...mapGetters({
      singleFeature: "createModule/getSingleFeature"
    })
  },
  created() {
    //check if there are params and exisiting basic information needs to be edited
    if (this.editBasics) {
      //replace empty data
      this.basicData = this.editBasics.basicData;
      //align errors and checks with the amount of pictures
      this.setAdditionalPictureData();
      return;
    } else if (
      //check the vuex-getter for exisiting information
      this.singleFeature.editIndex ||
      this.singleFeature.editIndex === 0
    ) {
      this.basicData = this.singleFeature.basics;
      //align errors and checks with the amount of pictures
      this.setAdditionalPictureData();
      return;
    } else {
      console.log("no params are here");
    }
  },
  //same check for route-view keep-alive
  activated() {
    if (this.editBasics) {
      this.basicData = this.editBasics.basicData;
      this.setAdditionalPictureData();
      return;
    } else if (
      this.singleFeature.editIndex ||
      this.singleFeature.editindex === 0
    ) {
      this.basicData = this.singleFeature.basics;
      this.setAdditionalPictureData();
      return;
    } else {
      console.log("no params are here");
    }
  }
};
</script>

<style scoped>
.create-basics {
  min-height: 100%;
  display: grid;
  padding: var(--top-padding) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
}

.card-layout,
.header,
.add-picture {
  grid-column: 2/3;
}

.headline {
  color: var(--dark-grey);
}

.subline {
  color: var(--darker-grey);
}

.placeholder--feature-basics {
  width: 100%;
  height: 10rem;
  background-color: var(--lighter-grey);
  border-radius: var(--fourthbase);
  position: relative;
  padding-top: 100%;
}

.image--placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--fourthbase);
}

.action-element {
  font-weight: bold;
  color: var(--darker-grey);
  font-size: calc(var(--1base) * 0.8);
  text-decoration: underline;
}

.add-picture {
  justify-self: end;
  padding-right: var(--fourthbase);
}

.supporting-text {
  text-decoration: underline;
}

.button-field {
  grid-column: 2/3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (min-width: 28em) {
  .button-field {
    justify-content: center;
  }
}
</style>

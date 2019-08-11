<template>
  <article class="home">
    <section class="create-surveys">
      <header class="header" id="header">
        <h1 class="headline">
          Create a stunning survey experience in under 5 minutes
        </h1>
        <p class="subheadline">
          Taking your survey is going to delight your users and gives you the
          actionable feedback you need.
        </p>
      </header>
      <buttonPrimary
        buttonText="Become a survey creator"
        @primarybuttonevent="goTo('signup')"
      />
      <div class="video-wrapper">
        <video
          poster="https://www.dropbox.com/s/qo5y1htb2gnn9e8/Salad1-0.png?raw=1"
          loop
          autoplay
          muted
          class="product-video"
        >
          <source
            src="https://www.dropbox.com/s/4n7xiorvn1c8x3s/Salad1.webm?raw=1"
            type="video/webm"
          />
          <source
            src="https://www.dropbox.com/s/d5pjf6fi4cn7e3e/Salad1.mp4?raw=1"
            type="video/mp4"
          />
        </video>
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
        <div class="circle circle3"></div>
      </div>
    </section>
    <section class="to-get-answers">
      <header class="header">
        <h1 class="headline">
          To get the answers you need - for every feature
        </h1>
        <p class="subline">and advance your product to new levels</p>
      </header>
      <div class="feature-presentation feature1">
        <h3 class="headline--description">Show off you amazing feature</h3>
        <p class="body--description">
          Add geogous images, briliant copy text and jaw-dropping headlines not
          even the most interesting man in the world could resist.
        </p>
        <div class="image-wrapper image-wrapper1">
          <picture class="picture--image-wrapper picture1">
            <img
              class="image--picture"
              src="https://www.dropbox.com/s/ris0chfo5ryewvp/Salad1-1.png?raw=1"
              alt=""
            />
          </picture>
          <div class="circle circle4"></div>
        </div>
      </div>
      <div class="feature-presentation feature2">
        <h3 class="headline--description">Ask every question there is</h3>
        <p class="body--description">
          Ask more than a 3 year old, who just learn the word “why” and courious
          george together.
        </p>
        <div class="image-wrapper image-wrapper2">
          <picture class="picture--image-wrapper picture2">
            <img
              class="image--picture"
              src="https://www.dropbox.com/s/fe9r65xfjstr3lq/Salad1-2.png?raw=1"
              alt=""
            />
          </picture>
          <div class="circle circle5"></div>
        </div>
      </div>
      <div class="feature-presentation feature3">
        <h3 class="headline--description">
          Sit back and watch the results fly in
        </h3>
        <p class="body--description">
          Get insights to your featues nobody else could even think of. Its a
          mystery how work gets done by nobody having thought of that one thing,
          you now have an answer to
        </p>
        <!--<buttonPrimary
          buttonText="Become a survey creator"
          @primarybuttonevent="goTo('signup')"
        /> -->
        <div class="image-wrapper image-wrapper3">
          <picture class="picture--image-wrapper picture3">
            <img
              class="image--picture"
              src="https://www.dropbox.com/s/flmpju02k3bptho/Salad1-3.png?raw=1"
              alt=""
            />
          </picture>
          <div class="circle circle6"></div>
        </div>
      </div>
    </section>
    <section class="in-a-short-time">
      <header class="header">
        <h1 class="headline">
          In the time you need to drink one coffee
        </h1>
        <p class="subline">
          The big one, which makes your head tingle, but in a good way. If you
          dont have all your images ready, you need to have another coffee.
        </p>
      </header>
      <div class="gallery-wrapper">
        <div class="gallery--gallery-wrapper">
          <p class="text--gallery-wrapper">
            Sip 1) Add images, a headline and body text
          </p>
          <picture class="picture--gallery-wrapper">
            <img
              class="image--gallery"
              src="https://www.dropbox.com/s/rza8wtkeu3e3ffr/Salad1-4.png?raw=1"
              alt=""
            />
          </picture>
        </div>
        <div class="gallery--gallery-wrapper">
          <p class="text--gallery-wrapper">
            Sip 2) Add images, a headline and body text
          </p>
          <picture class="picture--gallery-wrapper">
            <img
              class="image--gallery"
              src="https://www.dropbox.com/s/n4c7nm8gwcbxlea/Salad1-5.png?raw=1"
              alt=""
            />
          </picture>
        </div>
        <div class="gallery--gallery-wrapper">
          <p class="text--gallery-wrapper">
            Sip 3) Check if everything is nice and good looking
          </p>
          <picture class="picture--gallery-wrapper">
            <img
              class="image--gallery"
              src="https://www.dropbox.com/s/9ybkh8pjrtzuhld/Salad1-6.png?raw=1"
              alt=""
            />
          </picture>
        </div>
        <div class="circle circle7"></div>
        <div class="circle circle8"></div>
      </div>
      <div class="body--short-time">
        <p class="text--body">
          Admire your work and the amout of coffee you still have left until you
          need a new one. Repeat for every feature or your coffee runs out.
        </p>
        <buttonPrimary
          buttonText="Become a survey creator"
          @primarybuttonevent="goTo('signup')"
        />
      </div>
    </section>
    <footer class="footer">
      <h3 class="headline--footer">Everything else</h3>
      <p class="text--footer">Thank you for considering this service.</p>
      <ul class="links--footer">
        <li>
          <router-link :to="{ name: 'legal', hash: '#privacy' }"
            >Privacy</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'legal', hash: '#terms' }"
            >Terms and Conditions</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'legal', hash: '#netiquette' }"
            >Netiquette</router-link
          >
        </li>
      </ul>
    </footer>
  </article>
</template>

<script>
import VLazyImage from "v-lazy-image";
import buttonPrimary from "@/components/buttons/ButtonPrimary.vue";

export default {
  components: { VLazyImage, buttonPrimary },
  name: "home",
  methods: {
    goTo(targetView) {
      this.$router.push({
        name: targetView
      });
    }
  },
  mounted() {
    const circles = document.querySelectorAll(".circle");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          //when a circle comes into view, add an appear-class to make it appear
          entry.target.classList.add("appear");
        }
      });
    });

    circles.forEach(circle => {
      observer.observe(circle);
    });
  }
};
</script>

<style scoped>
.home {
  min-height: 100%;
  display: grid;
  padding: var(--top-padding) 0 0 0;
  grid-auto-rows: min-content;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--row-gap);
  background-color: white;
  overflow-x: hidden;
}

@media (min-width: 80em) {
  .home {
    padding: 15% 0 0 0;
    grid-template-columns: 1fr 50rem 1fr;
    grid-row-gap: 15rem;
  }

  h3 {
    font-size: var(--2base);
  }

  p,
  li {
    font-size: calc(var(--1base) * 1.25);
  }
}

.create-surveys,
.to-get-answers,
.in-a-short-time {
  grid-column: 2/3;
  height: 100%;
  display: grid;
  grid-row-gap: var(--2base);
}

@media (min-width: 80em) {
  .create-surveys,
  .to-get-answers,
  .in-a-short-time {
    grid-row-gap: var(--4base);
  }
}

.header {
  display: grid;
  grid-row-gap: var(--1base);
  text-align: center;
  position: relative;
  z-index: 3;
}
.headline {
  font-size: calc(var(--2base) * 1.2);
}

@media (min-width: 22.5em) {
  .headline {
    font-size: var(--3base);
  }
}

@media (min-width: 80em) {
  .header {
    padding: 0 var(--2base);
  }
}

/*------------*/

.video-wrapper {
  height: 80%;
  justify-self: center;
  position: relative;
}

.product-video {
  height: 100%;
  width: auto;
  border-radius: var(--halfbase);
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 3;
}

@media (min-width: 22.5em) {
  .video-wrapper {
    height: 90%;
  }
}

@media (min-width: 25em) {
  .video-wrapper {
    height: 100%;
  }
}

.circle {
  content: " ";
  border-radius: 50%;
  background-color: hsla(0, 44%, 88%, 0.4);
  position: absolute;
  z-index: 1;
  opacity: 0;
  transform: scale(0);
  transition: transform 0.65s ease-in-out;
}

.circle.appear {
  opacity: 1;
  transform: scale(1);
  transition: transform 0.65s ease-in-out;
}

.circle1 {
  width: 8rem;
  height: 8rem;
  top: 2rem;
  left: -6rem;
}

.circle2 {
  width: 13rem;
  height: 13rem;
  bottom: 20rem;
  right: -3rem;
}

.circle3 {
  width: 15rem;
  height: 15rem;
  bottom: -6rem;
  left: -3rem;
}

/*------------*/

.feature-presentation {
  height: 100%;
  display: grid;
  grid-row-gap: var(--2base);
  padding-bottom: var(--3base);
}

@media (min-width: 80em) {
  .feature-presentation {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.5fr 1fr 1fr;
    grid-column-gap: var(--2base);
  }
}

.headline--description,
.body--description {
  text-align: center;
  position: relative;
  z-index: 3;
}

@media (min-width: 80em) {
  .headline--description,
  .body--description {
    text-align: left;
  }
}

.image-wrapper {
  height: 100%;
  width: auto;
  position: relative;
  text-align: center;
}

@media (min-width: 80em) {
  .image-wrapper {
    grid-column: 1/2;
    grid-row: 1/4;
    height: 90%;
    text-align: center;
  }
  .headline--description {
    grid-column: 2/3;
    grid-row: 1/2;
    align-self: end;
  }
  .body--description {
    grid-column: 2/3;
    grid-row: 2/3;
    align-self: start;
  }

  .feature2 .image-wrapper {
    grid-column: 2/3;
    grid-row: 1/4;
  }
  .feature2 .headline--description {
    grid-column: 1/2;
    grid-row: 1/2;
    align-self: end;
    text-align: right;
  }
  .feature2 .body--description {
    grid-column: 1/2;
    grid-row: 2/3;
    align-self: start;
    text-align: right;
  }
}

.picture--image-wrapper {
  height: 100%;
  position: relative;
  z-index: 3;
  grid-row: 3/4;
}

.image--picture {
  height: auto;
  width: 100%;
  max-width: 22.5rem;
  object-fit: cover;
  border-radius: var(--halfbase);
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.25);
}

.circle4 {
  width: 16rem;
  height: 16rem;
  top: -3rem;
  right: -6rem;
}

.circle5 {
  width: 26rem;
  height: 26rem;
  bottom: 1rem;
  left: -14rem;
}

.circle6 {
  width: 45rem;
  height: 45rem;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
}

/*------------*/

.body--short-time {
  text-align: center;
  position: relative;
  z-index: 3;
}
@media (min-width: 80em) {
  .in-a-short-time {
    grid-row-gap: var(--6base);
  }
}

.gallery-wrapper {
  min-height: 50%;
  width: auto;
  display: grid;
  grid-row-gap: var(--2base);
  position: relative;
}

@media (min-width: 80em) {
  .gallery-wrapper {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: var(--4base);
  }
}

.gallery--gallery-wrapper {
  height: 100%;
  width: auto;
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-row-gap: var(--1base);
  padding-bottom: var(--2base);
  position: relative;
  z-index: 3;
}

.picture--gallery-wrapper {
  height: 100%;
  justify-self: center;
}

.text--gallery-wrapper {
  text-align: center;
  font-weight: bold;
}

.image--gallery {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: var(--halfbase);
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.25);
}

.circle7 {
  width: 16rem;
  height: 16rem;
  top: 12rem;
  right: 8rem;
}
.circle8 {
  width: 16rem;
  height: 16rem;
  bottom: -10rem;
  left: 9rem;
}

/*------------*/

.footer {
  grid-column: 1/4;
  background-color: var(--light-grey);
  padding: var(--2base);
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: var(--outer-column) var(--main-view) var(
      --outer-column
    );
  grid-row-gap: var(--1base);
}

@media (min-width: 80em) {
  .footer {
    padding: var(--5base);
  }
}

.headline--footer,
.text--footer,
.links--footer {
  grid-column: 2/3;
}

.links--footer {
  text-decoration: underline;
}
</style>

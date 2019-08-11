<!--transition wrapper-->
<template>
  <!--transition group-->
  <transition-group
    :name="transitionName"
    :mode="transitionMode"
    v-if="propTransitionGroup"
  >
    <slot />
  </transition-group>
  <!--single transition-->
  <transition :name="transitionName" :mode="transitionMode" v-else>
    <slot />
  </transition>
</template>

<script>
export default {
  name: "TransitionPage",
  //recieved options
  props: [
    "propTransitionName",
    "propTransitionMode",
    "propTransitionRouter",
    "propTransitionGroup",
    "propTransitionRouterAdd"
  ],
  data() {
    return {
      //defaults
      transitionName: "fade",
      transitionMode: "out-in"
    };
  },
  created() {
    //override the defaults
    if (this.propTransitionName) {
      this.transitionName = this.propTransitionName;
    }
    if (this.propTransitionMode) {
      this.transitionMode = this.propTransitionMode;
    }
    //check if this wrapper is used for navigation
    if (this.propTransitionRouter) {
      this.$router.beforeEach((to, from, next) => {
        const targetRoute = to.name;
        const fromRoute = from.name;
        //use left-right transitions
        if (targetRoute === "dashboard") {
          this.transitionName = "slide-left";
        } else if (targetRoute === "analyize" && fromRoute === "dashboard") {
          this.transitionName = "slide-right";
        } else if (targetRoute === "analyize" && fromRoute === "create") {
          this.transitionName = "slide-left";
        } else if (targetRoute === "create") {
          this.transitionName = "slide-right";
        }
        next();
      });
    }
    //check if this wrapper is used for creating a feature
    if (this.propTransitionRouterAdd) {
      this.$router.beforeEach((to, from, next) => {
        const targetRoute = to.name;
        const fromRoute = from.name;
        if (
          targetRoute === "createNewQuestion" &&
          fromRoute === "createQuestions"
        ) {
          this.transitionName = "slide-bottom";
        } else if (
          targetRoute === "createQuestions" &&
          fromRoute === "createNewQuestion"
        ) {
          this.transitionName = "slide-top";
        }
        next();
      });
    }
  }
};
</script>

<style scoped>
/* --------fade---------*/
.fade-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* --------slide---------*/
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-top-enter-active,
.slide-top-leave-active,
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition-duration: 0.25s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(1em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-1em, 0);
}

.slide-top-enter,
.slide-bottom-leave-active {
  opacity: 0;
  transform: translate(0, 1em);
}

.slide-top-leave-active,
.slide-bottom-enter {
  opacity: 0;
  transform: translate(0, -1em);
}

/* --------slide in and out from the same side---------*/
.navigation-enter-active {
  transition: all 0.3s ease;
}
.navigation-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.navigation-enter, .navigation-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
}
</style>

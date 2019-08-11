<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 27"
    @click="changeHeartColor()"
  >
    <path
      :class="[heartColor ? 'active' : '']"
      fill="none"
      fill-rule="evenodd"
      stroke="var(--help-color)"
      stroke-width="2"
      d="M3.553 13.817L14.678
    24.94l11.124-11.124.173-.199A7.532 7.532 0 0 0 15.336
    3.004l-.658.576-.659-.576A7.532 7.532 0 0 0 3.38 13.618l.173.199z"
    />
  </svg>
</template>

<script>
export default {
  name: "iconHeart",
  props: ["givenHeartColor", "disable"],
  data() {
    return {
      heartColor: false
    };
  },
  methods: {
    changeHeartColor() {
      if (!this.disable) {
        this.heartColor ? (this.heartColor = false) : (this.heartColor = true);
        this.$emit("hearticonevent", this.heartColor);
      }
    }
  },
  watch: {
    /*givenHeartColor: function(valNew, valOld) {
      this.heartColor = valNew;
  }*/
  },
  created() {
    if (this.givenHeartColor) {
      this.heartColor = this.givenHeartColor;
    }
  }
};
</script>

<style scoped>
.active {
  fill: var(--help-color);
  stroke: var(--help-color);
}
</style>

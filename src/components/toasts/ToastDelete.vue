<template>
  <section class="toast">
    <!-- emit true to confirm deletion-->
    <div class="delete-confirm delete-toast" @click="toastAnswer(true)">
      <p class="delete-text text-confirm">
        tap to delete this {{ deleteText }}
      </p>
    </div>
    <!-- emit false to dismiss deletion-->
    <div class="delete-dismiss delete-toast" @click="toastAnswer(false)">
      <p class="delete-text text-dismiss">dismiss</p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  props: ["deleteText"],
  name: "toastDelete",
  data() {
    return {
      data: null,
      success: null,
      error: null
    };
  },
  methods: {
    toastAnswer(boolean) {
      this.$emit("toastanswerevent", boolean);
    }
  },
  computed: {
    ...mapGetters({})
  }
};
</script>

<style scoped>
.toast {
  position: absolute;
  bottom: 18%;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin: var(--1base);
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
}

.delete-toast {
  padding: var(--2base) var(--halfbase);
}

.delete-confirm {
  background-color: var(--error);
  border-top-left-radius: var(--fourthbase);
  border-bottom-left-radius: var(--fourthbase);
}

.delete-dismiss {
  background-color: white;
  border-top-right-radius: var(--fourthbase);
  border-bottom-right-radius: var(--fourthbase);
}

.delete-text {
  text-align: center;
  font-weight: bold;
}

.text-confirm {
  color: white;
}
</style>

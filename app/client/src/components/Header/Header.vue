<template lang="pug">
.navbar-fixed
  nav
    .nav-wrapper
      .brand-logo.left
        router-link(to="/") JustChatting
      UserTitle(v-if="authorized")
      ul.right(v-else)
        li
          router-link(to="/login") 
            b sign in
        li
          router-link(to="/registry") 
            b sign up
</template>

<script>
import UserTitle from "./UserTitlte";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const { getters } = useStore();
    const authorized = computed(() => getters.isAuthorized);

    return {
      authorized,
    };
  },
  components: {
    UserTitle,
  },
};
</script>

<style lang="sass">
.logout
  text-decoration: underline
  cursor: pointer
  &:hover
    text-decoration: none
</style>

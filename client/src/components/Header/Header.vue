<template lang="pug">
.navbar-fixed
  nav
    .nav-wrapper
      .brand-logo.left
        router-link(to="/") JustChatting
      .user-info.row.right(v-if="authorized")
          .col
            .flow-text username
            span.logout.right logout
          img.circle.col(src="/images/users/default-avatar.png")
      ul.right(v-else)
        li
          router-link(to="/login") 
            b sign in
        li
          router-link(to="/registry") 
            b sign up
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const authorized = computed(() => store.getters.isAuthorized);

    return {
      authorized,
    };
  },
};
</script>

<style lang="sass">
.user-info
  line-height: 22px
  padding-top: 10px
  img
    width: 67px
.logout
  text-decoration: underline
  cursor: pointer
  &:hover
    text-decoration: none
</style>

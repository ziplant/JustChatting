<template lang="pug">
Header
main
  router-view
</template>
<script>
import Header from "./components/Header/Header";
import { onBeforeMount, onRenderTriggered } from "vue";
import { useStore } from "vuex";

import { useSocket } from "vue-socket.io-next";

export default {
  setup() {
    const { commit, dispatch, getters } = useStore();
    const socket = useSocket();

    socket.on("connect", () => {
      console.log("socket connected");
    });

    onBeforeMount(async () => {
      commit("login");

      if (getters.isAuthorized) {
        await dispatch("fetchUser");
      }
    });
  },
  components: { Header },
};
</script>
<style lang="sass">
main
  position: relative
body
  background-color: #eee
  .container
  &.dark
    background-color: #343434
    color: #fff
    input,
    textarea
      color: #fff
    nav
      background-color: #212121
    .card
      background-color: transparent
    .btn
      background-color: #26a69a
    .divider
      opacity: 0.2
    .sidenav
      background-color: #2D2D31
      li
        a
          &:not(.subheader)
            color: #89B2F5
            &:hover
              background-color: #3B4043
          &.subheader
            color:#9AA0A6
          .material-icons
            color: #9AA0A6
    .collection
      border: 1px solid rgba(255,255,255,0.2)
      .collection-item
        background-color: rgba(255,255,255,0.1)
        border-bottom: 1px solid rgba(255,255,255,0.2)

.page-inner
  padding-top: 10px
</style>

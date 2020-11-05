<template lang="pug">
GroupList(v-if="authorized")
</template>

<script>
import GroupList from "../components/Group/GroupList";
import { ref, onBeforeMount } from "vue";
import useRedirect from "@/compositions/redirect";

export default {
  setup() {
    const { notVerifiedRedirect } = useRedirect();
    let authorized = ref(false);

    onBeforeMount(() => {
      authorized.value = !notVerifiedRedirect();
    });

    return {
      authorized,
    };
  },
  components: {
    GroupList,
  },
};
</script>

<style lang="sass"></style>

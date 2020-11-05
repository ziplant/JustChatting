<template lang="pug">
router-view(v-if="authorized")
</template>

<script>
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
};
</script>

<style lang="sass"></style>

<template lang="pug">
.container
  h4 Group {{$route.params.groupId}}
  Chat
</template>

<script>
import Chat from "../../components/Group/Chat/Chat";
export default {
  components: {
    Chat,
  },
};
</script>

<style lang="sass"></style>

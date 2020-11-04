<template lang="pug">
li.collection-item 
  span.chat_username {{message.username}}: 
  span {{message.message_text}}
</template>

<script>
export default {
  props: {
    message: Object,
  },
};
</script>

<style lang="sass"></style>

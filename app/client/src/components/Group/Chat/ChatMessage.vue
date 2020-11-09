<template lang="pug">
li.collection-item.message
  .row
    .col.s10
      span.chat_username {{message.User.username}}: 
      span {{message.message_text}}
    .col.s2 
      span.right {{formattedTime}}
</template>

<script>
export default {
  props: {
    message: Object,
  },
  setup({ message }) {
    const formattedTime = new Date(
      message.date_of_writing
    ).toLocaleTimeString();

    return {
      formattedTime,
    };
  },
};
</script>

<style lang="sass">
.message
  .row
    margin: 0
</style>

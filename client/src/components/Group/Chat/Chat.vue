<template lang="pug">
ul.collection.chat
  .chat_messages
    ChatMessage(
      v-for="message in messages"
      :key="message.message_id"
      :message="message"
    )
  form.chat_form(@submit.prevent="sendMessage()")
    input(type="text" v-model="messageText" placeholder="Your message")
    button.btn.waves-effect.waves-light(type="submit") send
      i.material-icons.right send
</template>

<script>
import ChatMessage from "./ChatMessage.vue";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: ["groupId"],
  setup({ groupId }) {
    const { dispatch, getters } = useStore();

    const messages = [
      {
        message_id: 1,
        username: "user1",
        message_text: "hello there",
        date_of_writing: "03/11/2020",
      },
      {
        message_id: 2,
        username: "user2",
        message_text: "uo",
        date_of_writing: "03/11/2020",
      },
      {
        message_id: 3,
        username: "user1",
        message_text:
          "some a large text here... asda d asd ada dad ad   asda da asd asda dasd asdasd adsa dasd ad adsasd a dad adasda a sd adas da sda da dsdasdasdasdasd adasdasda end",
        date_of_writing: "03/11/2020",
      },
    ];

    const messageText = ref("");

    const sendMessage = async () => {
      if (!messageText.value) return;

      let message = {
        user_id: getters.isAuthorized.user_id,
        group_id: groupId,
        message_text: messageText.value,
        date_of_writing: Date.now(),
      };

      console.log(await dispatch("createMessage", message));

      messageText.value = "";
    };

    return {
      messages,
      messageText,
      sendMessage,
    };
  },
  components: {
    ChatMessage,
  },
};
</script>

<style lang="sass">
.chat
  display: flex
  flex-direction: column
  height: 400px
  &_messages
    flex-grow: 1
    overflow-y: auto
  &_username
    color: #f06292
    font-weight: bold
  &_form
    border-top: 1px solid rgba(255, 255, 255, 0.2)
    width: 100%
    margin: 0
    margin-top: 5px
    display: flex
    & > *
      height: 42px
    input
      padding: 0 20px !important
      box-sizing: border-box !important
      margin: 0 !important
    button
      min-width: 110px
</style>

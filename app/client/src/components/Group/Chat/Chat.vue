<template lang="pug">
ul.collection.chat
  .chat_messages#messagesContainer
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
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useSocket } from "vue-socket.io-next";

export default {
  props: ["groupId"],
  setup({ groupId }) {
    const { dispatch, commit, getters } = useStore();
    const socket = useSocket();

    const messages = computed(() => getters.getMessages);
    const messageText = ref("");

    const scrollDown = () => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    onMounted(() => {
      scrollDown();
    });

    const sendMessage = async () => {
      if (!messageText.value) return;

      let message = {
        user_id: getters.isAuthorized.user_id,
        group_id: groupId,
        message_text: messageText.value,
        date_of_writing: Date.now(),
      };

      await dispatch("createMessage", message);
      message.User = { username: getters.getCurrentUser.username };
      socket.emit("sendMessage", message);

      scrollDown();
      messageText.value = "";
    };

    socket.on("pushMessage", (data) => {
      commit("pushMessage", data);
      setTimeout(() => {
        scrollDown();
      }, 0);
    });

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

<template lang="pug">
Progress(v-if="!isFetched")
.container.page-inner(v-else-if="!passwordConfirmed")
  h3.center Confirm group password
  .row
    form.col.l6.push-l3.m8.push-m2.s12(@submit.prevent="confirmPassword()")
      .input-field
        input#password.validate(type="password" v-model="groupPassword")
        label(for="password") Group password
      button.btn.waves-effect.waves-light.col.s12(type="submit") Confirm
.container.page-inner(v-else) 
  .row
    h5.col.flow-text {{group.title}}
    h5.col.flow-text.right users: {{online}}
  Chat(:groupId="groupId")
Alert(v-if="alertOpen") {{responseError}}
</template>

<script>
import Chat from "../../components/Group/Chat/Chat";
import Alert from "@/components/Alert";
import Progress from "@/components/Progress";
import { useStore } from "vuex";
import { ref, computed, onBeforeMount, onBeforeUnmount } from "vue";
import useAlert from "@/compositions/alert";
import useFetching from "@/compositions/fetching";
import { useSocket } from "vue-socket.io-next";

export default {
  props: ["groupId"],
  setup({ groupId }) {
    const { getters, dispatch } = useStore();
    const { alertOpen, showAlert } = useAlert();
    const { responseError, isFetched, fetchAction } = useFetching();
    const socket = useSocket();

    const joinRoom = () => {
      passwordConfirmed.value = true;
      socket.emit("switchGroup", groupId);
    };

    const leaveRoom = () => {
      socket.emit("switchGroup");
    };

    onBeforeMount(async () => {
      await fetchAction("fetchGroupById", groupId);
      if (!group.value.password) {
        await fetchAction("fetchMessages", {
          groupPassword: groupPassword.value,
          limit: 100,
        });
        joinRoom();
      }
    });

    onBeforeUnmount(() => {
      leaveRoom();
    });

    const groupPassword = ref("");
    const passwordConfirmed = ref(false);
    const confirmPassword = async () => {
      await fetchAction("fetchMessages", {
        groupPassword: groupPassword.value,
        limit: 100,
      });
      if (responseError.value) {
        showAlert();
        groupPassword.value = "";
      } else {
        joinRoom();
      }
    };

    const group = computed(() => {
      return getters.getCurrentGroup;
    });
    const online = computed(() => {
      return getters.getGroupOnline(groupId);
    });

    return {
      groupPassword,
      confirmPassword,
      passwordConfirmed,
      group,
      online,
      responseError,
      isFetched,
      alertOpen,
      showAlert,
    };
  },
  components: {
    Chat,
    Alert,
    Progress,
  },
};
</script>

<style lang="sass"></style>

<template lang="pug">
.container
  .row
    h5.col.flow-text {{group.title}}
    h5.col.flow-text.right online: 0
  Chat(:groupId="groupId")
</template>

<script>
import Chat from "../../components/Group/Chat/Chat";
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";

export default {
  props: ["groupId"],
  setup({ groupId }) {
    const { getters, dispatch } = useStore();

    onBeforeMount(async () => {
      await dispatch("fetchGroupById", groupId);
    });

    const group = computed(() => {
      return getters.getCurrentGroup;
    });

    return {
      group,
    };
  },
  components: {
    Chat,
  },
};
</script>

<style lang="sass"></style>

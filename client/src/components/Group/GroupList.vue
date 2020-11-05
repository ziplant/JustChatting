<template lang="pug">
nav
  .nav-wrapper
    form
      .input-field
        input#search(type="search" placeholder="Search group by title" required)
        label.label-icon(for="search")
          i.material-icons search
        i.material-icons close
.container.group-list
  .row
    GroupItem(v-for="item in groups" :key="item.group_id" :group="item")
router-link.add-link(to="/group/create").btn-floating.btn-large.waves-effect.waves-light
  i.material-icons add
</template>

<script>
import GroupItem from "./GroupItem";
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";

export default {
  setup() {
    const { dispatch, getters } = useStore();

    onBeforeMount(async () => {
      await dispatch("fetchGroups", getters.getAuth.token);
    });

    const groups = computed(() => getters.getGroups);

    return {
      groups,
    };
  },
  components: {
    GroupItem,
  },
};
</script>

<style lang="sass">
a.add-link
  position: fixed
  right: 15px
  bottom: 15px

.group-list
  padding-top: 40px
</style>

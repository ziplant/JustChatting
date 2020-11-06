<template lang="pug">
nav
  .nav-wrapper
    .input-field
      input#search(type="search" v-model="groupSearch" placeholder="Search group by title" required)
      label.label-icon(for="search")
        i.material-icons search
      i.material-icons(@click="clearSearch()") close
.container.group-list
  Preloader(v-if="!loaded")
  .row(v-else)
    GroupItem(v-for="item in groups" :key="item.group_id" :group="item")
router-link.add-link(to="/group/create").btn-floating.btn-large.waves-effect.waves-light
  i.material-icons add
</template>

<script>
import GroupItem from "./GroupItem";
import Preloader from "@/components/Preloader";
import { useStore } from "vuex";
import { ref, computed, onBeforeMount } from "vue";

export default {
  setup() {
    const { dispatch, getters } = useStore();

    let loaded = ref(false);

    onBeforeMount(async () => {
      await dispatch("fetchGroups");
      loaded.value = true;
    });

    const groupSearch = ref("");

    const clearSearch = () => {
      groupSearch.value = "";
    };

    const groups = computed(() => getters.getGroups(groupSearch));

    return {
      groups,
      groupSearch,
      clearSearch,
      loaded,
    };
  },
  components: {
    GroupItem,
    Preloader,
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

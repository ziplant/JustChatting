<template lang="pug">
nav
  .nav-wrapper
    form
      .input-field
        input#search(type="search" placeholder="Search group" required)
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

export default {
  setup() {
    const groups = [
      {
        group_id: 1,
        title: "main",
        description: "this is main group baby",
        password: false,
        logo_filename: "default-logo.png",
        date_created: "02/11/2020",
        owner_id: 1,
      },
      {
        group_id: 2,
        title: "second",
        description: "this is second group baby",
        password: false,
        logo_filename: "default-logo.png",
        date_created: "02/11/2020",
        owner_id: 1,
      },
      {
        group_id: 3,
        title: "main3",
        description:
          "this is main group baby his is main group baby his is main group babyhis is main group baby",
        password: false,
        logo_filename: "default-logo.png",
        date_created: "02/11/2020",
        owner_id: 1,
      },
      {
        group_id: 4,
        title: "4",
        description: "this is main group baby",
        password: false,
        logo_filename: "default-logo.png",
        date_created: "02/11/2020",
        owner_id: 1,
      },
      {
        group_id: 5,
        title: "last",
        description: "LAST GROUP PLEASE NO MORE",
        password: false,
        logo_filename: "default-logo.png",
        date_created: "02/11/2020",
        owner_id: 1,
      },
    ];

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

<template lang="pug">
.col.s12.m6.l4.group-item
  .card
    router-link(:to="'/group/' + group.group_id")
     .card-image.waves-effect.waves-block.waves-ligh.grey.darken-3
        .group-item_logo(
          v-if="group.logo_filename"
          :style="{'background-image': `url(/images/groups/${group.logo_filename})`}"
          )
        img.group-item_logo(
          v-else="group.logo_filename"
          src="/images/groups/default-logo.png"
          )
        span.group-item_caption.flow-text.white-text.left users: {{group.online}}
        span.group-item_caption.flow-text.pink-text.right(
          v-if="group.password"
        ) {{access}}
        span.group-item_caption.flow-text.green-text.right(
          v-else
        ) {{access}}
    .card-content
      span.card-title.activator.white-text {{group.title}}
        i.material-icons.right more_vert
      
    .card-reveal.grey.darken-3
      span.card-title.activator {{group.title}}
        i.material-icons.right close
      p {{group.description}}
      p {{formattedDate}}
</template>

<script>
export default {
  props: {
    group: Object,
  },
  setup({ group }) {
    const formattedDate = new Date(group.date_created).toLocaleDateString();
    const access = group.password ? "private" : "public";

    return {
      formattedDate,
      access,
    };
  },
};
</script>

<style lang="sass">
.group-item
  .card-image
    padding: 5px
  &_logo
    height: 190px
    width: auto !important
    margin: auto
    background-size: cover
    background-position: 50% 50%
    background-repeat: no-repeat
  &_caption
    padding: 5px
</style>

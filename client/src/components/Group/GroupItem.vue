<template lang="pug">
.col.s12.m6.l4
  .card
    .card-image.waves-effect.waves-block.waves-ligh.pink.lighten-2
      router-link(:to="'/group/' + group.group_id")
        img.circle(:src="'/images/groups/' + group.logo_filename")
    .card-content
      span.card-title.activator.white-text {{group.title}}
        i.material-icons.right more_vert
      
    .card-reveal.pink.lighten-2
      span.card-title.activator {{group.title}}
        i.material-icons.right close
      p {{group.description}}
      p {{group.date_created}}
</template>

<script>
export default {
  props: {
    group: Object,
  },
};
</script>

<style lang="sass"></style>

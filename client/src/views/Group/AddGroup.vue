<template lang="pug">
.container
  h3.center Create group
  .row
    form#groupForm.col.l6.push-l3.m8.push-m2.s12
      .input-field
        input#groupTitle(type="text")
        label(for="groupTitle") Title
      .input-field
        textarea#groupDescription.materialize-textarea(type="text")
        label(for="groupDescription") Description
      .input-field
        input#groupPassword(type="password")
        label(for="groupPassword") Password
      .input-field.file-field
        .btn
          span Choose file
          input(type="file")
        .file-path-wrapper
          input.file-path(type="text" placeholder="Upload group logo")
      button.btn.waves-effect.waves-light.col.s12(type="submit") Create
</template>

<script>
export default {};
</script>

<style lang="sass"></style>

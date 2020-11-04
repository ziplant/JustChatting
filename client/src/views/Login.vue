<template lang="pug">
.container
  h3.center Sign in for chatting
  .row
    form#authForm.col.l6.push-l3.m8.push-m2.s12
      .input-field
        input#login(type="text")
        label(for="login") Login
      .input-field
        input#password(type="password")
        label(for="password") Password
      button.btn.waves-effect.waves-light.col.s12(type="submit") Sign in
</template>

<script>
export default {};
</script>

<style lang="sass"></style>

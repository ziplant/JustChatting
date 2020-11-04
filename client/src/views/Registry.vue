<template lang="pug">
.container
  h3.center Create your account
  .row
    form#registryForm.col.l6.push-l3.m8.push-m2.s12(
      @submit.prevent="submit()"
      enctype="multipart/form-data"
    )
      .input-field
        input#login(type="text" name="username")
        label(for="login") Login
      .input-field
        input#password(type="password" name="password")
        label(for="password") Password
      .input-field.file-field
        .btn
          span Choose file
          input(type="file" name="avatar" accept=".jpg, .jpeg, .png")
        .file-path-wrapper
          input.file-path(type="text" placeholder="Upload your avatar")
      button.btn.waves-effect.waves-light.col.s12(type="submit") Sign up
</template>

<script>
import { useStore } from "vuex";
import {} from "vue";

export default {
  setup() {
    const store = useStore();

    const submit = async () => {
      console.log(await store.dispatch("registry", registryForm));
    };

    return {
      submit,
    };
  },
};
</script>

<style lang="sass"></style>

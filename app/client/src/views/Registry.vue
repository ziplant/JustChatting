<template lang="pug">
Progress(v-if="!isFetched")
.container.page-inner
  h3.center Create your account
  .row
    form#registryForm.col.l6.push-l3.m8.push-m2.s12(
      @submit.prevent="submit()"
      enctype="multipart/form-data"
    )
      .input-field
        input#login.validate(type="text" name="username")
        label(for="login") Username
        span.helper-text(data-error="Username length must be at least 3 characters long")
      .input-field
        input#password.validate(type="password" name="password")
        label(for="password") Password
        span.helper-text(data-error=" Password length must be at least 5 characters long")
      .input-field
        input#confirmPassword.validate(type="password")
        label(for="confirmPassword") Confirm Password
        span.helper-text(data-error="Passwords don't match")
      .input-field.file-field
        .btn
          span Choose file
          input(type="file" name="avatar" accept=".jpg, .jpeg, .png")
        .file-path-wrapper
          input.file-path(type="text" placeholder="Upload your avatar")
      button.btn.waves-effect.waves-light.col.s12(type="submit") Sign up
Alert(v-if="alertOpen") {{responseError}}
</template>

<script>
import Progress from "@/components/Progress";
import Alert from "@/components/Alert";
import { useStore } from "vuex";
import { ref, onBeforeMount } from "vue";
import useValidate from "@/compositions/validate";
import useAlert from "@/compositions/alert";
import useRedirect from "@/compositions/redirect";
import useFetching from "@/compositions/fetching";

export default {
  setup() {
    const { dispatch } = useStore();
    const { authValidate } = useValidate();
    const { alertOpen, showAlert } = useAlert();
    const { verifiedRedirect, redirect } = useRedirect();
    const { responseError, isFetched, fetchAction } = useFetching();

    onBeforeMount(() => {
      verifiedRedirect("/");
    });

    const submit = async () => {
      if (authValidate(registryForm)) {
        await fetchAction("registry", registryForm);

        if (responseError.value) {
          showAlert();
        } else {
          redirect("/login");
        }
      }
    };

    return {
      submit,
      alertOpen,
      responseError,
      isFetched,
    };
  },
  components: {
    Progress,
    Alert,
  },
};
</script>

<style lang="sass"></style>

<template lang="pug">
.container
  h3.center Sign in for chatting
  .row
    form#authForm.col.l6.push-l3.m8.push-m2.s12(@submit.prevent="submit()")
      .input-field
        input#login.validate(type="text" name="username" v-model="loginForm.username")
        label(for="login") Username
        span.helper-text(data-error="Username length must be at least 3 characters long")
      .input-field
        input#password.validate(type="password" name="password" v-model="loginForm.password")
        label(for="password") Password
        span.helper-text(data-error=" Password length must be at least 5 characters long")
      button.btn.waves-effect.waves-light.col.s12(type="submit") Sign in
Teleport(to="#modal")
  Alert(v-if="alertOpen") {{response.message}}
</template>

<script>
import Alert from "@/components/Alert";
import { useStore } from "vuex";
import { reactive, onBeforeMount } from "vue";
import useValidate from "@/compositions/validate";
import useRedirect from "@/compositions/redirect";
import useAlert from "@/compositions/alert";

export default {
  setup() {
    const { dispatch, getters } = useStore();
    const { authValidate } = useValidate();
    const { alertOpen, showAlert } = useAlert();
    const { verifiedRedirect } = useRedirect();
    const loginForm = reactive({});

    onBeforeMount(() => {
      verifiedRedirect("/");
    });

    let response = reactive({});

    const submit = async () => {
      if (authValidate(authForm)) {
        response.message = (await dispatch("login", loginForm)).error;

        if (response.message) {
          showAlert();
        } else {
          await dispatch("fetchUser", getters.getAuth);
          verifiedRedirect("/");
        }
      }
    };

    return {
      loginForm,
      submit,
      alertOpen,
      showAlert,
      response,
    };
  },
  components: {
    Alert,
  },
};
</script>

<style lang="sass"></style>

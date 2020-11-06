<template lang="pug">
Progress(v-if="fetching")
.container.page-inner
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
  Alert(v-if="alertOpen") {{responseError}}
</template>

<script>
import Progress from "@/components/Progress";
import Alert from "@/components/Alert";
import { useStore } from "vuex";
import { reactive, ref, onBeforeMount } from "vue";
import useValidate from "@/compositions/validate";
import useRedirect from "@/compositions/redirect";
import useAlert from "@/compositions/alert";

export default {
  setup() {
    const { dispatch } = useStore();
    const { authValidate } = useValidate();
    const { alertOpen, showAlert } = useAlert();
    const { verifiedRedirect } = useRedirect();
    const loginForm = reactive({});

    onBeforeMount(() => {
      verifiedRedirect("/");
    });

    const responseError = ref("");
    const fetching = ref(false);

    const submit = async () => {
      if (authValidate(authForm)) {
        fetching.value = true;
        responseError.value = (await dispatch("login", loginForm)).error;
        fetching.value = false;

        if (responseError.value) {
          showAlert();
        } else {
          await dispatch("fetchUser");
          verifiedRedirect("/");
        }
      }
    };

    return {
      loginForm,
      submit,
      alertOpen,
      showAlert,
      responseError,
      fetching,
    };
  },
  components: {
    Progress,
    Alert,
  },
};
</script>

<style lang="sass"></style>

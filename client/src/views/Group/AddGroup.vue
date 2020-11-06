<template lang="pug">
Progress(v-if="fetching")
.container.page-inner
  h3.center Create group
  .row
    form#groupForm.col.l6.push-l3.m8.push-m2.s12(
      enctype="multipart/form-data"
      @submit.prevent="submit()"
    )
      .input-field
        input#groupTitle.validate(type="text" name="title")
        label(for="groupTitle") Title
        span.helper-text(data-error="Title is required")
      .input-field
        textarea#groupDescription.validate.materialize-textarea(
          type="text" name="description"
        )
        label(for="groupDescription") Description
        span.helper-text(data-error="Description is required")
      .input-field
        input#groupPassword(type="password" name="password")
        label(for="groupPassword") Password(optional)
      .input-field.file-field
        .btn
          span Choose file
          input(type="file" name="logo" accept=".jpg, .jpeg, .png")
        .file-path-wrapper
          input.file-path(type="text" placeholder="Upload group logo")
      button.btn.waves-effect.waves-light.col.s12(type="submit") Create
Teleport(to="#modal")
  Alert(v-if="alertOpen") {{responseError}}
</template>

<script>
import Progress from "@/components/Progress";
import Alert from "@/components/Alert";
import { useStore } from "vuex";
import { ref } from "vue";
import useValidate from "@/compositions/validate";
import useRedirect from "@/compositions/redirect";
import useAlert from "@/compositions/alert";

export default {
  setup() {
    const { dispatch, getters } = useStore();
    const { groupValidate } = useValidate();
    const { alertOpen, showAlert } = useAlert();
    const { verifiedRedirect } = useRedirect();

    let responseError = ref("");
    let fetching = ref(false);

    const submit = async () => {
      if (groupValidate(groupForm)) {
        fetching.value = true;
        responseError.value = (await dispatch("createGroup", groupForm)).error;
        fetching.value = false;

        if (responseError.value) {
          showAlert();
        } else {
          await dispatch("fetchGroups");
          verifiedRedirect("/");
        }
      }
    };

    return {
      alertOpen,
      responseError,
      submit,
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

<template lang="pug">
.user-title.row.right(v-if="user.username")
	.col
		.flow-text {{user.username}}
		span.logout.right(@click="logout()") logout
	.col(v-if="user.portrait_filename")
		.user-title_avatar.circle(
			:style="{'background-image': `url(/images/users/${user.portrait_filename})`}"
		)
	.col(v-else)
		.user-title_avatar.circle(
			style="background-image: url('/images/users/default-avatar.png')"
		)
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import useRedirect from "@/compositions/redirect";

export default {
  setup() {
    const { getters, dispatch } = useStore();
    const { redirect } = useRedirect();

    const user = computed(() => getters.getCurrentUser);

    const logout = () => {
      dispatch("logout");
      redirect("/login");
    };

    return {
      user,
      logout,
    };
  },
};
</script>

<style lang="sass">
.user-title
	line-height: 22px
	padding-top: 10px
	&_avatar
		width: 46px
		height: 46px
		background-position: 50% 50%
		background-repeat: no-repeat
		background-size: cover
</style>

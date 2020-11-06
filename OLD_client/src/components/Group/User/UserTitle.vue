<template lang="pug">
.usertitle
	.usertitle_avatar
		img(
			v-if="getCurrentUser.portrait_filename",
			:src="'/images/users/' + getCurrentUser.portrait_filename"
		)
		img(v-else, src="/images/users/default-avatar.png")
	h4.usertitle_username {{ getCurrentUser.username }}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user_id: null,
    };
  },
  computed: {
    ...mapGetters(["getCurrentUser"]),
  },
  methods: {
    ...mapActions(["fetchUserById"]),
  },
  mounted() {
    this.user_id = localStorage.getItem("user");
    this.fetchUserById({
      token: localStorage.getItem("token"),
      id: this.user_id,
    });
  },
};
</script>

<style lang="sass" scoped>
.usertitle
	display: flex
	align-items: center
	&_avatar
		width: 60px
		margin-right: 10px
		img
			float: left
	&_username
		margin: 0
</style>

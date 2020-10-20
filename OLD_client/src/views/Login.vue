<template lang="pug">
#login.card
	.wrap.wrap--between
		h2 Login
		router-link(to="/register") register
	.card_message {{ loginResponse.error }}
	form#loginForm(@submit.prevent="submit()")
		input.form-elem(
			v-model="user.username",
			placeholder="username",
			name="username"
		)
		input.form-elem(
			v-model="user.password",
			placeholder="password",
			name="password",
			type="password"
		)
		button.form-elem(type="submit") login
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			loginResponse: {},
			user: {},
		};
	},
	computed: {
		...mapGetters(["isAuthorized"]),
	},
	methods: {
		...mapActions(["login", "fetchGroups"]),
		async submit() {
			this.loginResponse = await this.login(this.user);
			if (!this.loginResponse.error && this.$router.history.current.path != "/")
				this.$router.push("/");
		},
	},
	mounted() {
		if (this.isAuthorized && this.$router.history.current.path != "/")
			this.$router.push("/");
	},
};
</script>

<style lang="sass" scoped>
</style>
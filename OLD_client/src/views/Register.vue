<template lang="pug">
#register.card
	.wrap.wrap--between
		h2 Register
		router-link(to="/login") login
	.card_message {{ registerResponse.error }}
	form#registerForm(@submit.prevent="submit()", enctype="multipart/form-data")
		input.form-elem(placeholder="username", name="username")
		input.form-elem(placeholder="password", name="password", type="password")
		.form-elem.file-wrap
			label(for="avatar") Choose avatar to upload
			input#avatar(type="file", name="avatar", accept=".jpg, .jpeg, .png")
		button.form-elem(type="submit") register
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			registerResponse: {},
		};
	},
	computed: {
		...mapGetters(["isAuthorized"]),
	},
	methods: {
		...mapActions(["register"]),
		async submit() {
			this.registerResponse = await this.register(registerForm);
			if (!this.registerResponse.error) this.$router.push("login");
		},
	},
	mounted() {
		if (this.isAuthorized) this.$router.push("/");
	},
};
</script>

<style lang="sass" scoped>
.file-wrap
	text-align: left
	& > *
		display: block
		width: 100%
</style>
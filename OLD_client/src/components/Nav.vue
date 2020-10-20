<template lang="pug">
	.nav(v-if="!isAuthorized")
		span welcome
	.nav(v-else)
		UserTitle
		button.nav_logout(@click="logout()") logout
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UserTitle from "./User/UserTitle";
export default {
	methods: {
		...mapActions(["logout"]),
	},
	computed: {
		...mapGetters(["isAuthorized"]),
	},
	components: {
		UserTitle,
	},
};
</script>

<style lang="sass">
.nav
	display: flex
	justify-content: center
	align-items: center
	padding: 30px
	&_logout
		margin-left: 20px
</style>
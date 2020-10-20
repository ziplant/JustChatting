<template lang="pug">
#app
	header#header
		Nav
	main#main
		router-view
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Nav from "./components/Nav";

export default {
	components: {
		Nav,
	},
	computed: {
		...mapGetters(["isAuthorized"]),
	},
	methods: {
		...mapActions(["checkToken", "fetchGroups"]),
	},
	sockets: {
		connect: () => {
			console.log("socket connected");
		},
	},
	async created() {
		this.checkToken();
		if (this.isAuthorized) {
			await this.fetchGroups(localStorage.getItem("token"));
		}
	},
};
</script>

<style lang="sass">
@import /assets/sass/_common

#app
	font-family: Avenir, Helvetica, Arial, sans-serif
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	text-align: center
	color: #2c3e50
</style>

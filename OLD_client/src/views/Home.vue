<template lang="pug">
#home
	Login(v-if="!isAuthorized")
	GroupList(v-else)
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Login from "./Login";
import GroupList from "../components/Group/GroupList";

export default {
	computed: {
		...mapGetters(["isAuthorized"]),
	},
	components: {
		Login,
		GroupList,
	},
};
</script>

<style lang="sass" scoped>
</style>
<template lang="pug">
.grouplist
	h2.grouplist_title Group list
	ul.grouplist_list
		GroupItem(v-for="item in getGroups", :key="item.group_id", :group="item")
</template>

<script>
import GroupItem from "./GroupItem";
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {};
	},
	components: {
		GroupItem,
	},
	computed: {
		...mapGetters(["getGroups"]),
	},
};
</script>

<style lang="sass" scoped>
.grouplist
	&_list
		list-style: none
		padding: 0
		text-align: left
</style>
<template lang="pug">
li.groupitem
	router-link.groupitem_link(:to="'/group/' + group.group_id")
		.groupitem_image
			img(
				v-if="group.logo_filename",
				:src="'/images/groups/' + group.logo_filename"
			)
			img(v-else, src="/images/groups/default-logo.png")
		.groupitem_info
			h4.groupitem_title {{ group.title }}
			.groupitem_desc {{ group.description }}
			.groupitem_online online: {{ online }}
</template>

<script>
export default {
	data() {
		return {
			online: 0,
		};
	},
	props: {
		group: {
			type: Object,
			required: true,
		},
	},
	sockets: {
		groupOnline: function (data) {
			this.online = data[this.group.group_id] || 0;
		},
	},
};
</script>

<style lang="sass" scoped>
.groupitem
	margin: 5px
	padding: 10px
	&_link
		display: flex
		text-decoration: none
		font-weight: normal
		&:hover
			background-color: #ccc

	&_image
		width: 75px
		margin-right: 10px
	&_info
	&_title
		margin: 5px 0
</style>
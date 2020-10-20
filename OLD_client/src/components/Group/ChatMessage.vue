<template lang="pug">
li.chat_message {{ message.User.username }}: {{ message.message_text }}
</template>

<script>
export default {
	props: {
		message: {
			type: Object,
		},
	},
};
</script>

<style lang="sass">
</style>
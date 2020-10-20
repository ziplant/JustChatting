<template lang="pug">
.group
	router-link(to="/") go home
	h3 {{ group.title }}
	p online: {{ online }}
	.chat
		ul.chat_list
			ChatMessage(
				v-for="message in getMessages",
				:key="message.message_id",
				:message="message"
			)
		form.chat_send-message(@submit.prevent="sendMessage()")
			input(type="text", v-model="textMessage")
			button(type="submit") send
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ChatMessage from "../components/Group/ChatMessage";

export default {
	data() {
		return {
			group: {},
			textMessage: "",
			online: 0,
		};
	},
	sockets: {
		groupOnline: function (data) {
			this.online = data[this.$route.params.id];
		},
	},
	components: {
		ChatMessage,
	},

	computed: {
		...mapGetters(["getMessages", "getCurrentGroup", "getCurrentUser"]),
	},
	methods: {
		...mapActions(["fetchMessages", "fetchGroupById", "createMessage"]),
		...mapMutations(["pushMessage"]),
		async sendMessage() {
			if (!this.textMessage) return;
			let message = {
				user_id: localStorage.getItem("user"),
				group_id: this.group.group_id,
				message_text: this.textMessage,
				date_of_writing: Date.now(),
			};
			let res = await this.createMessage({
				message: message,
				token: localStorage.getItem("token"),
			});
			message.User = {};
			message.User.username = this.getCurrentUser.username;
			this.$socket.emit("sendMessage", message);
			this.textMessage = "";
		},
	},
	async mounted() {
		console.log(this.$socket);
		if (!this.$store.getters.isAuthorized) this.$router.push("/");

		this.$socket.emit("switchGroup", this.$route.params.id);

		await this.fetchGroupById({
			id: this.$route.params.id,
			token: localStorage.getItem("token"),
		});

		this.group = this.getCurrentGroup(this.$route.params.id);

		await this.fetchMessages({
			group: this.group.group_id,
			token: localStorage.getItem("token"),
			limit: 100,
		});
	},
	beforeDestroy() {
		this.$socket.emit("switchGroup");
	},
};
</script>

<style lang="sass">
.group
.chat
	max-width: 400px
	height: 300px
	margin: auto
	border: 1px dotted #000
	border-radius: 3px
	display: flex
	flex-direction: column
	&_list
		overflow: auto
		padding: 0
		margin: 0
		list-style: none
		text-align: left
		flex: 1
	&_message
		padding: 5px 10px
		border-bottom: 1px dotted #000
	&_send-message
		& > *
			margin: 5px
</style>
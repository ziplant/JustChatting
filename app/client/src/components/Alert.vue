<template lang="pug">
Teleport(to="#modal")
	.alert
		slot
</template>

<script>
export default {};
</script>

<style lang="sass">
.alert
	position: fixed
	top: 10px
	right: 10px
	padding: 10px 15px
	min-width: 100px
	font-size: 16px
	text-align: center
	background-color: rgba(38, 166, 154, .85)
	z-index: 1000
	margin-top: 64px
</style>

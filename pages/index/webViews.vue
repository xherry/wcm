<template>
	<view>
		<web-view :src="webUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl:''
			}
		},
		onLoad(e) {
			this.webUrl = e.webUrl
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

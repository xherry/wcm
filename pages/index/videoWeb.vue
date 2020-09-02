<template>
	<view>
		<web-view :src="videoUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl:''
			}
		},
		onLoad(e) {
			this.videoUrl = e.videoUrl
		},
		methods: {
			
		}
	}
</script>

<style scoped>

</style>

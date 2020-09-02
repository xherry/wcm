<template>
	<view>
		<web-view :src="redirectUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				redirectUrl:''
			}
		},
		onLoad(e){
			this.redirectUrl = e.redirectUrl
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

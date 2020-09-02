<template>
	<view class="content">
		<view class="helpWords">
			{{words}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				words:''
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
			  title: e.question
			});
			this.words = e.answer
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.content{
		padding: 30rpx;
		box-sizing: border-box;
	}
	.helpWords{
		font-size: 30rpx;
	}
</style>

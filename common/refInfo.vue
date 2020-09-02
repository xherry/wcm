<template>
	<view class="props">
		<view class="prop-item">
			<text>{{titles}}</text>
			<text>{{content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "refInfo",
		data() {
			return {
				titles:'',
				content:''
			}
		},
		props:{
			// titles:'',
			// content:''
		},
		created() {
			uni.$on('changeNum',(res)=>{
				this.titles = res.titles;
				this.content = res.content
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.props{
		position: fixed;
		top: 0;
		left: 0;
	}
	.prop-item{
		width: 750rpx;
		padding: 6rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.prop-item>text{
		display: block;
		font-size: 26rpx;
		color: #333333;
	}
	.prop-item>text:first-child{
		text-align: center;
		width: 100%;
	}
	.prop-item>text:last-child{
		text-indent: 20rpx;
		width: 100%;
	}
</style>

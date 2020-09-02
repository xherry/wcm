<template>
	<view class="content">
		<view class="richs">
			<rich-text :nodes="intro"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				intro:''
			}
		},
		onLoad() {
			this.getCompanyIntro()
		},
		methods: {
			getCompanyIntro(){
				let api = '/sys/intro';
				this.http(api,"GET",{}).then(res=>{
					console.log(res)
					if(res.code==200){
						let intro = res.data.intro;
						intro =  intro.replace(/\<p/gi,'<p style="font-size: 16px;text-indent: 32px;white-space: pre-wrap"');
						intro =  intro.replace(/\<span/gi,'<span style="font-size: 16px;text-indent: 32px;white-space: pre-wrap"');
						intro =  intro.replace(/\<img/gi,'<img style="max-width:100%;margin-top: 10px;display: block;margin-left:50%;transform: translateX(-50%);" mode="widthFix"');  
						console.log(intro);
						this.intro = intro;
						let imgs =  intro.split('img');
						console.log(imgs)
					}
				})
			},
		}
	}
</script>

<style scoped>
	.richs{
		width: 750rpx;
		padding:20rpx;
		box-sizing: border-box;
	}
	.rich-img{
		width: 100%;
	}
	.rich-text{
		font-size: 28rpx;
		text-indent: 20rpx;
		white-space: pre-wrap;
	}
</style>

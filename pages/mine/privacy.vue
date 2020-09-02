<template>
	<view class="content">
		<view class="helpWords">
			<rich-text :nodes="agree"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agree:''
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
			   title: '隐私政策'
			});
			this.getAgree();
		},
		methods: {
			getAgree(){
				let api = '/sys/agree';
				this.http(api,"GET",{}).then(res=>{
					console.log(res)
					if(res.code==200){
						let agree = res.data.agree
						agree =  agree.replace(/\<p/gi,'<p style="font-size:14px;text-indent: 28px;white-space: pre-wrap"')
						agree =  agree.replace(/\<span/gi,'<span style="font-size:14px;text-indent: 28px;white-space: pre-wrap"')
						// console.log(agree)
						this.agree = agree
					}
				})
			},
		}
	}
</script>

<style scoped>
	.helpWords{
		width: 750rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}
</style>

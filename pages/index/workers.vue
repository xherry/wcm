<template>
	<view class="content">
		<view class="serched">
			<input  type="text" v-model="companyName" @input="serchCompany" :focus="focus" @focus="closeHolder" />
			<view v-if="isPlace" @tap="changeFocus">
				<image src="../../static/home/030.png" mode=""></image>
				<text>搜索企业</text>
			</view>
		</view>
		<view class="person-item" @tap="toSetPerson(s.companyId,s.intoCount,s.companyName)" v-for="(s,i) in workers" :key="'s'+i">
			<view class="firmName">
				<view class="qyinfrom">
					<view>{{s.companyName}}</view>
					<view>下井人数：{{s.intoCount}}人</view>
					<view>今日负责人：{{s.mainUserName?s.mainUserName:'无'}}</view>
				</view>
				<image src="../../static/mine/tos.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus:false,
				companyName:'',
				workers:[],//
				isPlace:true
			}
		},
		onLoad(){
			this.getWorkers();
		},
		methods: {
			// 搜索公司
			serchCompany(e){
				this.getWorkers()
			},
			// 激活foucs
			changeFocus(){
				this.focus = true
				this.isPlace = false
			},
			// 关闭搜索文字
			closeHolder(){
				this.isPlace = false
			},
			// 前往设置页面
			toSetPerson(m,n,x){
				uni.navigateTo({
					url:'./workers/setperson?companyId='+m+'&pcount='+n+'&companyName='+x
				})
			},
			// 获取下井人员列表
			async getWorkers(){
				let api = '/mine/company/into';
				let data = {
					companyName:this.companyName,
					userId:uni.getStorageSync('userInfo').userId
				}
				let res = await this.http(api,"GET",data)
				console.log(res);
				if(res.code==200){
					this.workers = res.data
				}
			},
		}
	}
</script>

<style scoped>
	.person-item{
		padding: 37rpx 15rpx;
		box-sizing: border-box;
	}
	.firmName{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;
	}
	.qyinfrom view{
		color: #fff;
		font-size: 26rpx;
		margin-bottom: 10rpx;
	}
	.firmName .qyinfrom view:first-child{
		font-size: 34rpx;
	} 
	.firmName image{
		width: 18rpx;
		height: 32rpx;
	}
</style>

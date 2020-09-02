<template name='leaves'>
	<scroll-view scroll-y="true" class="content">
		<view class="person-item" v-for="(item,index) in leaveList" v-if='item.dealStatus==0' :key="'l'+index">
			<view>{{item.companySample.companyName}}</view>
			<view>姓名：{{item.staffName}}</view>
			<view>岗位：{{item.jobName}}</view>
			<view>请假原因：{{item.leaveType==0?'病假':'事假'}}</view>
			<view>请假天数：{{item.day}}天 {{item.beginTimes}} 至 {{item.endTimes}}</view>
			<view>请假事由：{{item.reason}}</view> 
			<view>
				<button @tap="dealWith(2,item.recordId,index)">拒绝</button>
				<button @tap="dealWith(1,item.recordId,index)">同意</button>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name:'leaves',
		data() {
			return {
				leaveList:[],//请假列表
			}
		},
		created(){
			this.getLeaveList();
		},
		methods: {
			// 处理请假
			dealWith(m,n,index){
				uni.showModal({
					title:`确认操作`,
					content:`点击确定${m==1?'同意':'拒绝'}请假`,
					success:res=>{
						if(res.confirm){
							let api = '/user/audit/leave';
							let data = {
								dealStatus:m,
								recordId:n,
								userId:uni.getStorageSync('userInfo').userId
							}
							this.http(api,"POST",data).then(res=>{
								console.log(res)
								if(res.code==200){
									this.leaveList[index].dealStatus = m
									uni.showToast({
										title:`${m==1?'已同意':'已拒绝'}`,
										icon:'none'
									})
								}
							})
						}
					}
				})
			},
			// 获取请假列表
			async getLeaveList(){
				let userInfo = uni.getStorageSync('userInfo');
				let api = '/user/admin/leave/list';
				let data = {
						status:0,// 0 未处理
						userId:userInfo.userId,   
					}
				let result = await this.http(api,"GET",data);
				console.log(result);
				if(result.code==200){
					for(let item of result.data.rows){
						// item.leaveTime =  Math.ceil((item.endTime - item.beginTime)/60/60/24/1000); 
						item.beginTimes = this.$format(item.beginTime);
						item.endTimes = this.$format(item.endTime); 
					}
					this.leaveList =  result.data.rows;
				}
			},
		}
	}
</script>

<style scoped>
	.content{
		padding-bottom: 110rpx;
	}
	.person-item{
		padding-left: 15rpx;
		box-sizing: border-box;
	}
	.person-item>view:first-child{
		font-size: 34rpx;
	}
	.person-item>view{
		font-size: 28rpx;
		margin-top: 22rpx;
	}
	.person-item>view:last-child{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 22rpx;
	}
	.person-item button{
		width: 162rpx;
		height: 48rpx;
		color: #fff;
		font-size: 26rpx;
		background: #0F439B;
		line-height: 48rpx;
		border-radius: 26rpx;
	}
	.person-item button:active{
		background: #0b3375;
	}
	.person-item button:first-child{
		margin-right: 131rpx;
	}
</style>

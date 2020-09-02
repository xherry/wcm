<template name='askLeave'>
	<scroll-view scroll-y="true"  @scrolltolower='scrollPerson'   class="content">
		<view class="person-item" v-for="(item,i) in leaveList" :key="'p'+i">
			<view>{{item.companySample.companyName}}</view>
			<view>姓名：{{item.staffName}}</view>
			<view>岗位：{{item.jobName}}</view>
			<view>请假原因：{{item.leaveType==0?'病假':'事假'}}</view>
			<view>请假天数：{{item.day}}天 {{item.beginTime}} 至 {{item.endTime}}</view>
			<view>请假事由：{{item.reason}}</view>
			<view></view>
			<view>处理状态：{{item.dealStatus==0?'待处理':(item.dealStatus==1?'已同意':'已拒绝')}}</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		naems:'askLeave',
		data() {
			return {
				leaveList:[],
				pageNum:1,//默认页码
				pages:1,//默认总页数
			}
		},
		created(){
			this.getLeaveList()
		},
		methods: {
			// 获取请假列表
			async getLeaveList(){
				let userInfo = uni.getStorageSync('userInfo');
				let api = '/user/admin/leave/list';
				let data = {
						pageNum:this.pageNum,
						pageSize:5,
						status:1,// 1 已同意
						userId:userInfo.userId,
					}
				let result = await this.http(api,"GET",data);
				console.log(result,"获取请假列表");
				if(result.code==200){
					for(let item of result.data.rows){
						// item.leaveTime = Math.ceil((item.endTime - item.beginTime)/60/60/24/1000);
						item.beginTime = this.$format(item.beginTime);
						item.endTime = this.$format(item.endTime);
					}
					this.leaveList = this.leaveList.concat(result.data.rows);
					this.pages = result.data.pages;
				}
			},
			// 滑动加载数据
			scrollPerson(){
				if(this.pages>this.pageNum){
					this.pageNum += 1;
					this.getLeaveList()
				}
			},
		}
	}
</script>

<style scoped>
	.person-item{
		padding: 27rpx 15rpx 26rpx;
		box-sizing: border-box;
	}
	.person-item>view{
		font-size: 28rpx;
		color: #fff;
		margin-bottom: 19rpx;
	}
	.person-item>view:first-child{
		font-size: 34rpx;
	}
	.person-item>view:nth-child(7){
		background: #fff;
		height: 1rpx;
		width: 100%;
	}
	.person-item:last-child{
		margin-bottom: 110rpx;
	}
</style>

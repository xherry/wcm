<template name='leaveHis'>
	<scroll-view scroll-y="true" @scrolltolower='scrollPerson' class="content">
		<view class="person-item records" v-for="(p,i) in leaveList" :key='"o"+i'>
			<view>请假原因：{{p.leaveType==0?'病假':'事假'}}</view>
			<view>开始时间：{{p.beginTime}}</view>
			<view>结束时间：{{p.endTime}}</view>
			<view>请假事由：{{p.reason}}</view>
			<view class="lines"></view>
			<view>处理状态：{{p.dealStatus==0?'待处理':(p.dealStatus==1?'同意':'拒绝')}} </view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'leaveHis',
		data() {
			return {
				leaveList: [],
				pageNum: 1, //默认初始页码
				pages: 1, //总页数
			}
		},
		created() {
			this.getLeaveList()
		},
		methods: {
			async getLeaveList() {
				let api = '/user/leave/list';
				let data = {
					userId: uni.getStorageSync('userInfo').userId,
					pageNum: this.pageNum,
					pageSize: 6,
				}
				let res = await this.http(api, 'GET', data);
				console.log(res)
				if (res.code == 200) {
					if (res.data.rows.length == 0) {
						uni.showToast({
							title: '暂无请假记录',
							icon: 'none',
							duration: 2000
						})
					}
					res.data.rows.forEach((item, i) => {
						item.beginTime = this.$format(item.beginTime)
						item.endTime = this.$format(item.endTime)
					})
					this.leaveList = this.leaveList.concat(res.data.rows);
					this.pages = res.data.pages;
				}
			},
			// 滑动加载数据
			scrollPerson() {
				if (this.pages > this.pageNum) {
					this.pageNum += 1;
					this.getLeaveList()
				}
			},
		}
	}
</script>

<style scoped>
	.records .lines {
		width: 100%;
		height: 1rpx;
		background: #fff;
	}

	.records {
		padding: 31rpx 14rpx 31rpx;
		box-sizing: border-box;
	}

	.records view {
		font-size: 26rpx;
		margin-bottom: 18rpx;
	}

	.records view:last-child {
		margin-bottom: 0;
	}

	.records:last-child {
		margin-bottom: 110rpx;
	}
</style>

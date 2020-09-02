<template>
	<view class="contrain">
		<view class="person-item" v-for="(item,index) in violates" @tap='readViolates(item.id,item.illegalMsg,item.times,index)' :key="index">
			<view class="cname" :style="{background:item.read?'#014B84':'#f00' }">{{item.companyName}}</view>
			<view class="rcz">{{item.illegalMsg}}</view>
			<view class="cztime">{{item.times}}</view>
		</view>
	</view>
</template>

<script>
	import date from '../../utils/date.js';
	export default {
		data() {
			return {
				pages: 1,
				pageNum: 1,
				violates: [],
				isOnPullDown:false
			}
		},
		onLoad() {
			this.getViolates()
		},
		onShow() {
			// this.pageNum = 1,
			// this.getViolates()
		},
		methods: {
			// 读取违规信息
			readViolates(id,illegalMsg,times,index){
				let api = `/message/read/1`
				let data = {
					userId: uni.getStorageSync('userInfo').userId,
					id
				}
				this.http(api,"POST",data).then(res=>{
					console.log(res)
					if(res.code==200){
						this.violates[index].read = true
						uni.navigateTo({
							url:'./violateInfo?id='+id
						})
					}
				})
			},
			// 获取违规信息
			getViolates(n) {
				let userInfo = uni.getStorageSync('userInfo')
				let api = `/message/illegal/${userInfo.identityType}`;
				let data = {
					userId: userInfo.userId,
					pageNum: this.pageNum,
					pageSize: 10
				};
				this.http(api, "GET", data).then(res => {
					console.log(res)
					if(this.isOnPullDown){
						uni.stopPullDownRefresh()//停止动画
					}
					if (res.code == 200) {
						res.data.rows.forEach((item, i) => {
							let tiems = date.toDate(item.createTime)
							tiems = tiems.split(' ');
							let leftTime = tiems[0].split('-')[1] + '-' + tiems[0].split('-')[2]
							let rightTime = tiems[1].split(':')[0] + ':' + tiems[1].split(':')[1]
							item.times = leftTime + " " + rightTime
						})
						if(n){
							this.violates = this.violates.concat(res.data.rows);
						}else{
							this.violates = res.data.rows;
						}
						this.pages = res.data.pages;
					}
				})
			},
		},
		// 监听用户上拉加载
		onReachBottom(){
			if (this.pages > this.pageNum) {
				this.pageNum += 1
				let n =  this.pageNum
				this.getViolates(n);
			}
		},
		// 监听用户下拉刷新
		onPullDownRefresh(){
			this.pageNum = 1;
			this.isOnPullDown = true
			this.getViolates();
		},
	}
</script>

<style scoped>
	.person-item {
		padding: 12rpx 14rpx 42rpx;
		box-sizing: border-box;
	}

	.cname {
		width: 100%;
		height: 56rpx;
		line-height: 56rpx;
		padding-left: 13rpx;
		box-sizing: border-box;
		color: #fff;
		font-size: 30rpx;
		background: #014B84;
		overflow: hidden; 
		text-overflow: ellipsis; 
		white-space: nowrap;
	}

	.rcz {
		font-size: 28rpx;
		margin-left: 13rpx;
		margin-top: 23rpx;
	}

	.cztime {
		font-size: 30rpx;
		margin-left: 13rpx;
		margin-top: 28rpx;
	}
</style>

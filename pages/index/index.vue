<template>
	<scroll-view scroll-y='true' class="content">
		<!-- 轮播图 -->
		<swiper class="swipers" circular autoplay indicator-dots indicator-color="rgba(0,0,0,.3)" indicator-active-color="#fff">
			<swiper-item v-for="(item,i) in banners" :key="'img'+i">
				<view class="swiper-item" @tap="toWebViews(item.redirectUrl)">
					<image :src="base_url+'/img'+item.bannerUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 首页导航（管理员） -->
		<view class="navbars" v-if="isAdmin">
			<view class="nav-item" v-for="(item,index) in navImgs" @tap="switchs(item.id,'admin')" :key='"n"+index'>
				<image :src="item.pic" mode=""></image>
				<view>{{item.titl}}</view>
			</view>
		</view>
		<!-- 首页导航（员工） -->
		<view class="navbars" v-else>
			<view class="nav-item" v-for="(item,index) in navImgsr" @tap="switchs(item.id,'ordinary')" :key='"n"+index'>
				<image :src="item.pic" mode=""></image>
				<view>{{item.titl}}</view>
			</view>
		</view>
		<!-- 数据 -->
		<scroll-view scroll-y="true" class="scrollDatas">
			<view v-for="(item,i) in infomList" :style="{color:item.read?'#fff':(item.type==1?'#32f97b':'#ff3007')}" @tap='toInfoms(item.id,item.type)'
			 :key='"s"+i'>{{i+1}}、{{item.companyName}} {{item.type==1?'':item.times}} {{item.type==1?item.subject:item.msg}}</view>
		</scroll-view>
	</scroll-view>
</template>

<script>
	import date from '../../utils/date.js';
	import notice from '../../common/nta.js';
	export default {
		data() {
			return {
				navImgs: [{
						id: 1,
						pic: '../../static/home/006.png',
						titl: '人员管理'
					},
					{
						id: 2,
						pic: '../../static/home/001.png',
						titl: '出入记录'
					},
					{
						id: 3,
						pic: '../../static/home/008.png',
						titl: '人员统计'
					},
					{
						id: 4,
						pic: '../../static/home/007.png',
						titl: '人员设置'
					},
					{
						id: 5,
						pic: '../../static/home/009.png',
						titl: '视频监控'
					},
					{
						id: 6,
						pic: '../../static/home/005.png',
						titl: '请假管理'
					},
					{
						id: 7,
						pic: '../../static/home/004.png',
						titl: '企业管理'
					},
					{
						id: 8,
						pic: '../../static/home/003.png',
						titl: '六大系统'
					},
				],
				navImgsr: [{
						id: 1,
						pic: '../../static/home/009.png',
						titl: '视频监控'
					},
					{
						id: 2,
						pic: '../../static/home/001.png',
						titl: '出入记录'
					},
					{
						id: 3,
						pic: '../../static/home/005.png',
						titl: '请假管理'
					},
					{
						id: 4,
						pic: '../../static/home/027.png',
						titl: '班次列表'
					},
					{
						id: 5,
						pic: '../../static/home/004.png',
						titl: '企业信息'
					},
					{
						id: 7,
						pic: '../../static/home/warn-educate.png',
						titl: '警示教育'
					},
					{
						id: 6,
						pic: '../../static/home/003.png',
						titl: '六大系统'
					}
				],
				isAdmin: false,
				userInfo: {},
				infomList: [], 
				banners: [],
			}
		},
		onLoad() {
			let userInfo = uni.getStorageSync('userInfo');
			this.isAdmin = userInfo.identityType == 1 ? true : false
			this.getUserInfo();
			this.getBanners();
			notice.notice();
		},
		onShow() {
			this.getInfomList();
		},
		methods: {
			// 查看信息
			toInfoms(id, type) {
				let api = `/message/read/${type==1?'0':'1'}`
				let data = {
					userId: uni.getStorageSync('userInfo').userId,
					id: id
				}
				this.http(api, "POST", data).then(res => {
					console.log(res)
					if (res.code == 200) {
						if (type == 1) {
							uni.navigateTo({
								url: '../certify/certifyInfo?id=' + id
							})
						} else {
							uni.navigateTo({
								url: '../violate/violateInfo?id=' + id
							})
						}
					}
				})
			},
			// 管理员
			switchs(n, m) {
				// admin:管理员  ordinary:普通用户
				try {
					if (n == 1) throw m == 'admin' ? './person' : './monitore/moniePage?companyId=' + this.userInfo.companyId + '&companyName=' + this.userInfo.companyName;
					if (n == 2) throw m == 'admin' ? './arecords' : './arecord/arecordTabBar?companyId=' + this.userInfo.companyId +
						'&companyName=' + this.userInfo.companyName;
					if (n == 3) throw m == 'admin' ? './statiste' : './emleaves/emLeaveNav';
					if (n == 4) throw m == 'admin' ? './workers' : './shiftLists';
					if (n == 5) throw m == 'admin' ? './monitore' : './enterprise/cinform';
					if (n == 6) throw m == 'admin' ? './leaveAsk/offLists' : './sixSystem';
					if (n == 7) throw m == 'admin' ? './enterprise' : './warneducate';
					if (n == 8) throw './sixSystem';
				} catch (url) {
					uni.navigateTo({
						url: url
					});
					return;
				}
			},
			// 获取用户信息
			getUserInfo() {
				let api = '/user/info';
				let data = {
					userId: uni.getStorageSync('userInfo').userId
				}
				this.http(api, 'GET', data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.userInfo = res.data
					}
				})
			},
			// 获取信息列表
			getInfomList() {
				let api = '/message/index';
				this.http(api, "GET", {
					userId: uni.getStorageSync('userInfo').userId
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						res.data.forEach((item, i) => {
							let dates = date.toDate(item.createTime).split(' ');
							let years = dates[0].split('-');
							let hours = dates[1].split(':');
							item.times = years[0] + '年' + years[1] + '月' + years[2] + "日" + hours[0] + '时' + hours[1] + '分'
						})
						this.infomList = res.data;
					}
				})
			},
			// 获取轮播图
			async getBanners() {
				let api = '/sys/banner';
				let res = await this.http(api, "GET", {});
				console.log(res)
				if (res.code == 200) {
					this.banners = res.data;
				}
			},
			// 跳转外链
			toWebViews(n) {
				if (n) {
					uni.navigateTo({
						url: './webViews?webUrl=' + n
					})
				}
			},
		}
	}
</script>

<style scoped>
	.scrollDatas view {
		color: #fff;
		font-size: 28rpx;
		max-width: 668rpx;
		margin-left: 23rpx;
		margin-bottom: 32rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.scrollDatas {
		height: 334rpx;
		width: 710rpx;
		margin-left: 20rpx;
		margin-top: 22rpx;
		background-color: #021e3d;
		border-radius: 10rpx;
		padding: 30rpx 0;
		box-sizing: border-box;
		/* text-align: center; */
	}

	.content {
		padding-bottom: 38rpx;
	}

	.navbars {
		margin-top: 22rpx;
		height: 430rpx;
		width: 710rpx;
		background-color: #021e3d;
		margin-left: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.nav-item {
		text-align: center;
		width: 25%;
	}

	.nav-item>image {
		width: 80rpx;
		height: 80rpx;
		overflow: hidden;
	}

	.nav-item>view {
		color: #fff;
		font-size: 30rpx;
	}

	.swipers {
		width: 707rpx;
		height: 368rpx;
		margin-left: 21.5rpx;
		margin-top: 20rpx;
	}

	.swiper-item {
		width: 707rpx;
		height: 368rpx;
	}

	.swiper-item>image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
</style>

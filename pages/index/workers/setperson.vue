<template>
	<view class="content">
		<view class="person-item">
			<view class="toWell-item">
				<text>下井人数</text>
				<input type="text" :disabled='disabled' :value="pcount" />
			</view>
			<view class="toWell-item" v-for='(p,i) in futureDates' :key="'w'+i">
				<text>{{i==0?'明':p.day}}日下井人员</text>
				<view class="seletmans"  @tap='seleteRys(i)'>
					<text>{{!p.wm?'请选择人员':p.wm}}</text>
					<image :style="{transform:`rotate(${seleteRy===i?'0deg':'-180deg'})`}" src="../../../static/home/017.png"
					 mode=""></image>
				</view>
				<scroll-view scroll-y="true" v-show="seleteRy===i" class="seleteBox">
					<view @tap="rySelete(i,index)" v-for="(g,index) in wellMans" :key="'g'+index">{{g.jobName+'：'}}{{g.mainUserName}}</view>
				</scroll-view>
			</view>
			<view></view>
		</view>
		<button @tap='submits'>确定</button>
	</view>
</template>

<script>
	import FutureDate from '../../../utils/date.js';
	export default {
		data() {
			return {
				seleteRy: '',
				disabled: true, //禁止输入
				companyId: '', //设置公司id
				intoDate: '', //所选日期
				pcount: 0,
				wellMans: [], //下井人员
				futureDates: [], //未来7天数据
				isSetWorks:[]
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.companyName
			});
			this.companyId = e.companyId;
			this.pcount = e.pcount;
			this.getWellMan();
			// 获取未来7天数据
			this.futureDates = FutureDate.getFutureDate();
			this.getWellSet(e.companyId)
			console.log(this.futureDates)
		},
		methods: {
			// 确认提交
			submits() {
				let api = '/mine/into/setting';
				let mainUsers = {}
				this.futureDates.forEach((item, i) => {
					if (item.wm) {
						let mainUserDate = `mainUsers[${i}].intoDate`;
						let mainUserId = `mainUsers[${i}].mainUserId`;
						mainUsers[mainUserId] = item.wmId;
						mainUsers[mainUserDate] = item.year + '-' + (item.theMoth < 10 ? '0' + item.theMoth : item.theMoth) + '-' + item.day
					}
				})
				if (Object.keys(mainUsers).length == 0) {
					uni.showToast({
						title: '请选择下井人员',
						icon: 'none'
					})
					return
				}
				let data = {
					companyId: this.companyId,
					userId: uni.getStorageSync('userInfo').userId,
					...mainUsers
				}
				uni.showModal({
					title: '确认设置?',
					content: '点击确认完成设置',
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: '设置中'
							})
							this.http(api, "POST", data).then(res => {
								uni.hideLoading()
								console.log(res)
								if (res.code == 200) {
									uni.showToast({
										title: '设置成功',
										icon: "none"
									})
								}
							})
						}
					}
				})
			},
			// 获取下井设置
			getWellSet(companyId){
				let api = '/mine/into/setting/back';
				let data = { companyId };
				this.http(api,"GET",data).then(res=>{
					if(res.code = 200){
						let isSetWorks = res.data.slice(0,7);
						for(let i = 0;i<7;i++){
							this.futureDates[i].wm = isSetWorks[i].mainUserName
						}
					}
				})
			},
			// 获取下井人员
			async getWellMan() {
				let api = '/mine/choose/principal';
				let data = {
					companyId: this.companyId
				}
				let res = await this.http(api, "GET", data);
				console.log(res)
				if (res.code == 200) {
					this.wellMans = res.data
				}
			},
			// 选择下井人员
			rySelete(m, n) {
				this.futureDates[m]. wm   = this.wellMans[n].mainUserName;
				this.futureDates[m].wmId = this.wellMans[n].mainUserId;
				this.seleteRy = ''
			},
			// 控制选择人员开关
			seleteRys(n) {
				if (this.seleteRy === n) {
					this.seleteRy = ''
				} else {
					this.seleteRy = n
				}
			}
		}
	}
</script>

<style scoped>
	button {
		width: 562rpx;
		height: 78rpx;
		border-radius: 39rpx;
		background: rgba(15, 67, 155, 1);
		line-height: 78rpx;
		color: #fff;
		font-size: 28rpx;
		margin-top: 222rpx;
	}

	button:active {
		background: rgba(9, 43, 98, 1.0);
	}

	.seleteBox {
		position: absolute;
		width: 380rpx;
		height: 270rpx;
		padding: 32rpx 0 25rpx 0rpx;
		box-sizing: border-box;
		background-color: #041647;
		top: 92rpx;
		left: 32%;
		z-index: 99;
	}

	.seleteBox view {
		color: #FFFFFF;
		font-size: 28rpx;
		width: 100%;
		height: 75rpx;
		line-height: 75rpx;
		padding-left: 53rpx;
		box-sizing: border-box;
		margin-bottom: 3rpx;
	}

	.seleteBox view:active {
		background: #072d8b;
	}

	.person-item {
		padding: 0 14rpx;
		box-sizing: border-box;
	}

	.toWell-item {
		height: 92rpx;
		display: flex;
		align-items: center;
		padding-left: 12rpx;
		width: 100%;
		justify-content: space-between;
		border-bottom: 1rpx solid #fff;
		box-sizing: border-box;
		position: relative;
	}

	.toWell-item:last-child {
		border-bottom: 0
	}

	.toWell-item:nth-last-child(2) {
		border-bottom: 0
	}

	.toWell-item>text {
		font-size: 28rpx;
	}

	.toWell-item input,
	.toWell-item>view {
		width: 68%;
		font-size: 28rpx;
	}

	.seletmans {
		display: flex;
		align-items: center;
		position: relative;
	}

	.seletmans>text {
		font-size: 28rpx;
		display: inline-block;
		width: 150rpx;
	}

	.seletmans>image {
		width: 18rpx;
		height: 10rpx;
		/* margin-left: 48rpx; */
		transition: all .3s linear;
	}
</style>

<template>
	<view class="content">
		<view class="serched">
			<input type="text" v-model="keyword" @input="serchName" @confirm="confirm" @focus="closeHolder" :focus="focus" />
			<view v-if="isPlace" @tap="changeFocus">
				<image src="../../static/home/030.png" mode=""></image>
				<text>搜索企业、姓名、账号</text>
			</view>
		</view>
		<scroll-view @scrolltolower='scrollPerson' :style="{height:pheight+'rpx'}" scroll-y="true">
			<!-- 人员数据 -->
			<view class="person-item" v-for="(p,i) in persons" :key="'p'+i" @tap="operateMan(p.staffId,i)">
				<view class="person-data">
					<view class="person-data-left">
						<view>企业：{{p.companySample.companyName}}</view>
						<view class="pserson-data-status">
							<view class="pds">
								<view>姓名：{{p.staffName}}</view>
								<view>状态：{{p.leaveFlag==0?'正常':"请假"}}</view>
							</view>
							<view class="pds">
								<view>工号：{{p.jobNum}}</view>
								<view>岗位：{{p.jobName}}</view>
							</view>
						</view>
					</view>
					<image src="../../static/mine/tos.png" mode=""></image>
				</view>
			</view>
		</scroll-view>
		<view class="addPerson" @tap="addPerson">添加员工</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serchs: '',
				focus: false,
				keyword: '', //关键字
				persons: [], //人员数据
				pageNum: 1, //默认页码
				pages: 1, //默认页码总长度
				pheight: '',
				isPlace: true,
				isRefresh: '0'
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					let screenHeight = res.windowHeight;
					this.pheight = screenHeight * 2 - 68
				}
			})
			this.getPersons()
		},
		async onShow() {
			if (this.isRefresh == '1') {
				this.pageNum = 1;
				this.persons = [];
				await this.getPersons()
				this.isRefresh = '0'
			}
		},
		methods: {
			// 键盘事件
			confirm(e) {
				console.log(e)
			},
			// 修改查看用户
			operateMan(n, index) {
				uni.navigateTo({
					url: 'person/operatePerson?staffId=' + n + '&index=' + index
				})
			},
			// 激活foucs
			changeFocus() {
				this.focus = true
				this.isPlace = false
			},
			// 关闭搜索文字
			closeHolder() {
				this.isPlace = false
			},
			// 查找
			async serchName(e) {
				uni.showLoading({
					title: '加载中'
				})
				let keyword = e.detail.value;
				let persons = []
				let pageNum;
				try {
					if (keyword === '') throw 1;
				} catch (num) {
					pageNum = num
				} finally {
					pageNum = ''
				}
				let data = {
					keyword,
					userId: uni.getStorageSync('userInfo').userId,
					pageNum
				}
				let result = await this.http('/staff/search', 'GET', data);
				uni.hideLoading()
				if (result.code == 200) {
					persons = result.data.rows;
					this.persons = persons;
				}
			},
			addPerson() {
				uni.navigateTo({
					url: './person/addPerson'
				})
				this.keyword = ''
			},
			// 获取人员列表
			async getPersons() {
				uni.showLoading({
					title: '加载中'
				})
				let data = {
					keyword: '',
					pageNum: this.pageNum,
					pageSize: 8,
					userId: uni.getStorageSync('userInfo').userId
				};
				let result = await this.http('/staff/search', 'GET', data);
				console.log(result, "数据")
				uni.hideLoading()
				if (result.code == 200) {
					this.persons = this.persons.concat(result.data.rows);
					this.pages = result.data.pages;
				}
			},
			// 滑动加载数据
			scrollPerson() {
				if (this.pages > this.pageNum) {
					this.pageNum += 1;
					this.getPersons()
				}
			},
		},

	}
</script>

<style scoped>
	.content {
		overflow: hidden;
	}

	.person-item:last-child {
		margin-bottom: 130rpx;
	}

	.addPerson:active {
		background: #033162;
	}

	.addPerson {
		width: 750rpx;
		height: 98rpx;
		background: #021e3d;
		text-align: center;
		line-height: 98rpx;
		color: #fff;
		font-size: 28rpx;
		position: fixed;
		bottom: 0;
	}

	.pserson-data-status {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* width: 100%; */
		flex-wrap: wrap;
	}

	.person-data-left {
		/* width: 40%; */
	}

	.person-data-left>view {
		color: #fff;
		font-size: 34rpx;
	}

	.pds view {
		color: #fff;
		font-size: 26rpx;
		white-space: nowrap;
		width: 240rpx;
		margin-top: 20rpx;
	}

	.person-data>image {
		width: 18rpx;
		height: 32rpx;
	}

	.person-item {
		padding: 27rpx 14rpx;
		box-sizing: border-box;
	}

	.person-data {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>

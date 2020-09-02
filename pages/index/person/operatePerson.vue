<template>
	<view class="content" @tap='hideDP'>
		<view class="allHeader">
			<view class="status_bar"></view>
			<view class="headers">
				<image @tap.stop="backTo" src="../../../static/home/020.png" mode=""></image>
				<text>修改员工</text>
				<text @tap.stop='deleStaff(staffInfo.userId)'>删除</text>
			</view>
		</view>
		<view class="person-item">
			<view class="inputStatus">
				<text>姓名</text>
				<input type="text" v-model="uname" placeholder="请输入姓名" placeholder-style="color:#fff;font-size:26rpx" value="" />
			</view>
			<view class="inputStatus">
				<text>企业</text>
				<view>
					<text>{{qyIndex===''?'请选择企业':qyList[qyIndex].companyName}}</text>
					<image src="../../../static/home/017.png" :style="{transform:`rotate(${seletQy?'0':'-180'}deg)`}" @tap.stop="isSeletQy"
					 mode=""></image>
				</view>
				<scroll-view v-show="seletQy" scroll-y="true" class="selets">
					<view @tap.stop="qySelete(i)" v-for="(q,i) in qyList" :key="'q'+i">{{q.companyName}}</view>
				</scroll-view>
			</view>
			<view class="inputStatus">
				<text>登录账号</text>
				<input type="number" maxlength="11" disabled v-model="phone" placeholder="请输入员工手机号" placeholder-style="color:#fff;font-size:26rpx"
				 value="" />
			</view>
			<view class="inputStatus">
				<text>工号</text>
				<input type="text" v-model="uid" placeholder="请输入员工工号" placeholder-style="color:#fff;font-size:26rpx" value="" />
			</view>
			<view class="inputStatus">
				<text>岗位</text>
				<view>
					<text>{{gwIndex===''?'请选择岗位':gwList[gwIndex].jobName}} </text>
					<image src="../../../static/home/017.png" @tap.stop="isSeletGw" :style="{transform:`rotate(${seletGw?'0':'-180'}deg)`}"
					 mode=""></image>
				</view>
				<scroll-view v-show="seletGw" scroll-y="true" class="selets">
					<view @tap.stop="gwSelete(index)" v-for="(g,index) in gwList" :key="'g'+index">{{g.jobName}}</view>
				</scroll-view>
			</view>
			<view class="addPic">
				<view>照片</view>
				<view class="pics">
					<view class="addss" @tap.stop='addImg'>
						<view></view>
						<view></view>
					</view>
					<view class="showImges" @tap.stop='showDp(img.name)' v-for="(img,index) in pics" :key='"img"+index'>
						<image :src="base_url+'/img'+img.url" mode=""></image>
						<view v-if="picId==img.name">
							<image @tap.stop="imgDeled(img.name,index)" src="../../../static/mine/ljt2.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<button @tap.stop="qureAdd">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				seletQy: false,
				seletGw: false,
				qyList: [], //企业列表,
				gwList: [], //岗位列表
				uid: '', //用户id
				qyIndex: '', //选择企业下标
				gwIndex: '', //选择岗位下标
				uname: '', //用户姓名
				phone: '', //用户手机号
				pics: [], //上传图片列表
				isAdd: false, //是否添加
				staffId: '',
				staffInfo: {},
				picId: '',
				pindex:''
			}
		},
		onLoad(e) {
			this.staffId = e.staffId;
			this.pindex = e.index
			this.getQYlist();
			this.getStaffInfo()
		},
		methods: {
			// 获取员工信息
			getStaffInfo() {
				let api = '/staff/info';
				let data = {
					userId: this.staffId
				}
				this.http(api, 'GET', data).then(res => {
					console.log(res, '员工信息')
					if (res.code == 200) {
						this.qyList.forEach((item, i) => {
							if (res.data.companyId && (res.data.companyId == item.companyId)) {
								this.qyIndex = i
							}
						})
						this.getGWLsit(res.data.companyId, res.data.jobId);
						this.staffInfo = res.data;
						this.uname = res.data.userName;
						this.phone = res.data.phone;
						this.uid = res.data.jobNum;
						this.pics = res.data.mediaInfoList.map((item, i) => {
							return item
						})
					}
				})
			},
			// 删除员工
			deleStaff(n) {
				let api = '/staff/remove';
				let data = {
					userId: n
				};
				uni.showModal({
					title: "确认操作",
					content: '是否删除员工？',
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: '删除中'
							})
							this.http(api, "POST", data).then(res => {
								uni.hideLoading()
								console.log(res)
								if (res.code == 200) {
									uni.showToast({
										title: '删除成功',
										icon: 'none'
									})
									let pages = getCurrentPages();             //获取所有页面栈实例列表
									let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
									prevPage.$vm.persons.splice(this.pindex,1);
									setTimeout(() => {
										uni.navigateBack()
									}, 800);
								}
							})
						}
					}
				})
			},
			// 返回上一页
			backTo() {
				uni.navigateBack({})
			},
			// 
			isSeletGw() {
				if (this.seletGw) {
					this.seletGw = false;
				} else {
					this.seletGw = true;
					if (this.qyIndex === '') {
						uni.showToast({
							title: '请先选择企业',
							icon: 'none'
						})
					}
				}
			},
			isSeletQy() {
				this.seletQy = !this.seletQy
			},
			// 选择企业
			qySelete(n) {
				this.qyIndex = n;
				this.seletQy = false;
				this.gwIndex = ''
				this.getGWLsit();
			},
			// 选择岗位
			gwSelete(n) {
				this.gwIndex = n;
				this.seletGw = false;
			},
			// 确定添加
			qureAdd() {
				try {
					if (!this.uname) throw '用户名不能为空';
					if (this.qyIndex === '') throw '请选择企业';
					if (!this.phone) throw '手机号不能为空';
					if (!this.uid) throw '工号不能为空';
					if (this.gwIndex === '') throw '请选择岗位';
					if (this.pics.length == 0) throw '请选择图片';
				} catch (message) {
					uni.showToast({
						title: message,
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '确认操作',
					content: '是否修改员工信息?',
					success: res => {
						if (res.confirm) {
							this.addStaff()
						}
					}
				})
			},
			//添加员工
			async addStaff() {
				let api = '/staff/revamp';
				let data = {
					companyId: this.qyList[this.qyIndex].companyId,
					jobId: this.gwList[this.gwIndex].jobId,
					jobNum: this.uid,
					userName: this.uname,
					userId: this.staffInfo.userId
				}
				uni.showLoading({
					title: '修改中'
				})
				let result = await this.http(api, "POST", data);
				uni.hideLoading()
				console.log(result);
				if (result.code == 200) {
					this.isAdd = true
					uni.showToast({
						title: '修改成功',
						icon: 'none',
						duration: 1500
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 800);
				}
			},
			// 获取企业列表
			async getQYlist() {
				let api = '/company/choose';
				let data = {
					userId: uni.getStorageSync('userInfo').userId
				}
				let res = await this.http(api, "GET", data);
				console.log(res)
				if (res.code == 200) {
					this.qyList = res.data
				}
			},
			// 获取岗位列表
			async getGWLsit(n, m) {
				let api = '/company/choose/job';
				let data = {
					companyId: n && m ? n : this.qyList[this.qyIndex].companyId
				};
				let res = await this.http(api, "GET", data);
				console.log(res)
				if (res.code == 200) {
					this.gwList = res.data;
					if (n && m) {
						res.data.forEach((item, i) => {
							if (item.jobId == m) {
								this.gwIndex = i
							}
						})
					}
				}
			},
			// 上传图片
			upLoadImg(imgs) {
				uni.showLoading({
					title: '上传中'
				})
				let imgList = []
				imgs.forEach((item, i) => {
					uni.uploadFile({
						url: this.base_url + `/staff/upload/media/${this.staffInfo.userId}`,
						filePath: item,
						name: 'file',
						header: {
							Authorization: uni.getStorageSync('token'),
						},
						success: res => {
							uni.hideLoading()
							console.log(JSON.parse(res.data), '上传图片')
							if (JSON.parse(res.data).code == 200) {
								this.isAdd = false
								this.pics.push(JSON.parse(res.data).data)
								// console.log(imgList)
								// this.pics = imgList								
							} else {
								uni.showToast({
									title: '图片上传失败',
									icon: 'none'
								})
							}
						},
						fail: err => {
							uni.hideLoading()
							uni.showToast({
								title: '图片上传失败',
								icon: 'none'
							})
						}
					})
				})
			},
			// 添加图片
			addImg() {
				uni.chooseImage({
					count: 3,
					sizeType: ['album'],
					success: res => {
						console.log(res);
						if (res.errMsg == "chooseImage:ok") {
							let tempFilePaths = res.tempFilePaths;
							this.upLoadImg(tempFilePaths);
						}
					}
				})
			},
			showDp(pid) {
				this.picId = pid
			},
			hideDP() {
				this.picId = ''
			},
			imgDeled(pid, index) {
				uni.showLoading({
					title: "处理中"
				})
				let api = '/staff/media/remove';
				let data = {
					mediaId: pid
				};
				this.http(api, "POST", data).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.code == 200) {
						this.pics.splice(index, 1)
					}
				})
			},
		},
		// 监听返回
		onBackPress(options) {
			console.log(options, '监听返回')
			// if(options.from == "backbutton"){
			// 	if(this.pics.length!==0 && !this.isAdd){
			// 		this.deleImg()
			// 	}
			// }
		},
	}
</script>

<style scoped>
	.allHeader {
		background: #021e3d;
		width: 100%;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.headers {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		padding: 10rpx 30rpx 10rpx;
		box-sizing: border-box;
		background: #021e3d;
	}

	.headers image {
		width: 16rpx;
		height: 28rpx;
	}

	.headers text:first-of-type {
		font-size: 32rpx;
	}

	.headers text:nth-of-type(2) {
		font-size: 28rpx;
	}

	.selets {
		position: absolute;
		width: 400rpx;
		height: 300rpx;
		/* padding: 0rpx 0 25rpx 0rpx; */
		box-sizing: border-box;
		background-color: #0a3374;
		top: 92rpx;
		left: 160rpx;
		z-index: 99;
		border-radius: 10rpx;
		transform: all .3s linear;
	}

	.selets view {
		color: #fff;
		font-size: 28rpx;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		/* padding-left: 53rpx; */
		box-sizing: border-box;
		margin-bottom: 3rpx;
		text-align: center;
		border-bottom: 1rpx solid #0e47a3;
	}

	.selets view:active {
		background-color: #0c4190;
	}

	.addPic {
		margin-top: 39rpx;
	}

	,
	.addPic>view {
		color: #fff;
		font-size: 28rpx;
		margin-left: 15rpx;
	}

	.addPic .pics {
		display: flex;
		align-items: center;
		margin-left: 61rpx;
		margin-top: 26rpx;
		flex-wrap: wrap;
	}

	.addss {
		width: 120rpx;
		height: 120rpx;
		background: #0F439B;
		position: relative;
		margin-right: 12rpx;
		margin-bottom: 12rpx;
	}

	.addss:active {
		background: #0a2f6c;
	}

	.addss>view:nth-child(1) {
		width: 5rpx;
		height: 60rpx;
		position: absolute;
		background-color: #fff;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.addss>view:nth-child(2)::after {
		content: '';
		display: none;
	}

	.addss>view:nth-child(2)::before {
		content: '';
		display: none;
	}

	.addss>view:nth-child(2) {
		width: 60rpx;
		height: 5rpx;
		position: absolute;
		background-color: #fff;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.pics .showImges {
		width: 120rpx;
		height: 120rpx;
		margin-right: 12rpx;
		margin-bottom: 12rpx;
		position: relative;
	}

	.showImges view {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(255, 255, 255, .5);
	}

	.showImges view>image {
		width: 60rpx;
		height: 60rpx;
		margin: 30rpx;
	}

	.showImges>image {
		width: 120rpx;
		height: 120rpx;
	}

	button {
		width: 562rpx;
		height: 78rpx;
		line-height: 78rpx;
		background: #0F439B;
		color: #fff;
		font-size: 28rpx;
		border-radius: 39rpx;
		margin-top: 136rpx;
	}

	button:active {
		background: #0b3375;
	}

	.inputStatus {
		height: 92rpx;
		border-bottom: 1rpx solid #b1b4be;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}

	.inputStatus text {
		font-size: 28rpx;
		color: #fff;
		margin-left: 15rpx;
	}

	.inputStatus>view {
		height: 100%;
		width: 503rpx;
		line-height: 92rpx;
		display: flex;
		align-items: center;
	}

	.inputStatus>view>text {
		margin-left: 0;
		color: #fff;
		font-size: 28rpx;
	}

	.inputStatus>view>image {
		width: 18rpx;
		height: 10rpx;
		margin-left: 47rpx;
		transition: all .3s linear;
	}

	.inputStatus input {
		height: 100%;
		width: 503rpx;
		color: #fff;
		font-size: 28rpx;
	}

	.person-item {
		padding: 0 14rpx 39rpx;
		box-sizing: border-box;
	}
</style>

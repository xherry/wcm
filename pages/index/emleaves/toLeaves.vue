<template name='toLeaves'>
	<view class="content">
		<view class="person-item toleave">
			<view class="toLeave-item">
				<view class="ti1">请假类型</view>
				<view class="ti2"> {{leaveType===0?'病假':(leaveType===1?'事假':'请选择')}}</view>
				<image src="../../../static/home/017.png" @tap='isOpenType' :style="{transform: `rotate(${seletType?'-180':'0'}deg)`}"
				 mode=""></image>
				<scroll-view v-show="seletType" scroll-y="true" class="changeType">
					<view @tap="typeSelete(0)">病假</view>
					<view @tap="typeSelete(1)">事假</view>
				</scroll-view>
			</view>
			<view class="toLeave-item">
				<view class="ti1">开始时间</view>
				<picker mode="date" @change="changeStartTime">
					<view class="pickers">
						<view class="ti2">{{startTime===''?'请选择':startTime}}</view>
						<image src="../../../static/home/017.png" mode=""></image>
					</view>
				</picker>
			</view>
			<view class="toLeave-item">
				<view class="ti1">结束时间</view>
				<picker mode="date" @change="changeEndTime">
					<view class="pickers">
						<view class="ti2">{{endTime===''?'请选择':endTime}}</view>
						<image src="../../../static/home/017.png" mode=""></image>
					</view>
				</picker>
			</view>
			<view class="askLeave">
				<view>请假事由</view>
				<textarea value="" maxlength="-1" v-model="leaveReason" placeholder="请输入请假事由" placeholder-style="color:#f8f8f8;font-size:26rpx" />
				</view>
		</view>
		<button @tap="toLeave">提交</button>
	</view>
</template>

<script>
	export default {
		name:'toLeaves',
		data() {
			return { 
				seletType:false,
				leaveType:'',
				startTime:'',
				endTime:'',  
				leaveReason:'',//请假事由
			}
		},
		methods: {
			// 选择类型
			typeSelete(n){
				this.leaveType = n;
				this.seletType = false;
			},
			// 关闭或打开遮罩层
			isOpenType(){
				this.seletType = !this.seletType
			},
			// 选则结束时间
			changeEndTime(e){
				this.endTime = e.detail.value
			},
			// 选择开始时间
			changeStartTime(e){
				this.startTime = e.detail.value
			},
			// 确定提交
			toLeave(){
				try{
					if(this.leaveType==='') throw '请选择类型';
					if(!this.startTime) throw '请选择开始时间';
					if(!this.endTime) throw '请选择结束时间';
					if(!this.leaveReason) throw '请输入请假事由';
				}catch(err){
					uni.showToast({
						title:err,
						icon:'none'
					})
					return
				}
				uni.showModal({
					title:'确认操作',
					content:'点击确定提交信息',
					success:res=>{
						if(res.confirm){
							this.submit()
						}
					}
				})					
			},
			// 提交
			async submit(){
				let api = '/user/leave/apply';
				let data = {
					beginTime:this.startTime,
					endTime:this.endTime,
					leaveType:this.leaveType,
					reason:this.leaveReason,
					userId:uni.getStorageSync('userInfo').userId
				}
				uni.showLoading({
					title:'提交中'
				})
				let res = await this.http(api,"POST",data);
				uni.hideLoading()
				console.log(res)
				if(res.code==200){
					uni.showToast({
						title:'提交成功',
						icon:'none'
					})
					this.startTime = '';
					this.endTime = '';
					this.leaveType = '';
					this.leaveReason = '';
				}
			},
		}
	}
</script>

<style scoped>
	.pickers{
		display: flex;
		align-items: center;
	}
	.changeType{
		position: absolute;
		width: 380rpx;
		height: 270rpx;
		padding: 32rpx 0 25rpx 0rpx;
		box-sizing: border-box;
		background-color: #041647;
		top: 92rpx;
		left: 160rpx;
		z-index: 99;
	}
	.changeType view{
		color: #FFFFFF;
		font-size: 28rpx;
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		padding-left: 53rpx;
		box-sizing: border-box;
		margin-bottom: 3rpx;
	}
	.changeType view:active{
		background: #072b87;
	}
	button{
		width: 562rpx;
		height: 78rpx;
		line-height: 78rpx;
		background: #0F439B;
		font-size: 28rpx;
		line-height: 78rpx;
		margin-top: 165rpx;
		color: #fff;
		border-radius: 39rpx;
	}
	button:active{
		background: #0a3170;
	}
	textarea{
		font-size: 28rpx;
		color: #fff;
		width: 100%;
		height: 140rpx;
	}
	.askLeave>view{
		font-size: 28rpx;
		margin-bottom: 22rpx;
	}
	.askLeave{
		padding-top: 40rpx;
		padding-left:13rpx;
		width:100%;
		box-sizing: border-box;
	}
	.toLeave-item .ti1{
		font-size: 28rpx;
		margin-right: 56rpx;
	}
	.toLeave-item .ti2{
		font-size: 28rpx;
		width: 160rpx;
	}
	.toLeave-item image{
		width: 18rpx;
		height: 10rpx;
		transition: all .3s linear;
	}
	.toLeave-item{
		display: flex;
		align-items: center;
		padding-left: 13rpx;
		box-sizing: border-box;
		width: 100%;
		border-bottom: 1rpx solid #fff;
		height: 93rpx;
		position: relative;
	}
	.toleave{
		padding: 0 14rpx 40rpx;
		box-sizing: border-box;
	}
</style>

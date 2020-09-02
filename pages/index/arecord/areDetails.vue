<template name='aredetails'>
	<view class="content">
		<view class="tjnavs">
			<view :class="{tjActiveds:navSeleted===0} " @tap="switchTj(0)">进入统计</view>
			<view :class="{tjActiveds:navSeleted===1} " @tap="switchTj(1)">外出统计</view>			
		</view>
		
		<view class="statiste" >
			<view class="statiste-title" v-show='mainUserName'>
				<view>今日负责人：{{mainUserName}}</view>
				<view>{{intoDate}}</view>
			</view>
			<view class="person-item"  v-show='outInList.length!== 0'>
				<scroll-view scroll-x="true" style="width: 100%;white-space: nowrap;">
					<view  class="statiste-top">
						<view>时间</view>
						<view>工号</view>
						<view>岗位</view>
						<view>联系方式</view> 
						<view>姓名</view>
						<view>照片</view>
					</view>
					
					<view class="statiste-item"  v-if='navSeleted===0' v-for="(item,index) in outInList" :key='"ss"+index'>
						<view>{{item.outIntime}}</view>
						<view>{{item.jobNum?item.jobNum:'未知'}}</view>
						<view>{{item.jobName?item.jobName:'未知'}}</view>
						<view>{{item.phone?item.phone:'未知'}}</view>
						<view>{{item.staffName?item.staffName:'未知'}}</view>
						<view>
							<image :src="base_url+'/img'+item.mediaPath" @tap="_previewImage(item.mediaPath)" mode=""></image>
						</view>
					</view> 
									
				  <view class="statiste-item"  v-if='navSeleted===1' v-for="(item,index) in outInList" :key='"sl"+index'>
				  	<view>{{item.outIntime}}</view>
				  	<view>{{item.jobNum?item.jobNum:'未知'}}</view>
				  	<view>{{item.jobName?item.jobName:'未知'}}</view>
				  	<view>{{item.phone?item.phone:'未知'}}</view>
				  	<view>{{item.staffName?item.staffName:'未知'}}</view>
				  	<view>
				  		<image :src="base_url+'/img'+item.mediaPath" @tap="_previewImage(item.mediaPath)" mode=""></image>
				  	</view>
				  </view>	
					
				</scroll-view>
				<view></view>
			</view>
		</view>
	</view>
</template> 

<script>
	import dates from '../../../utils/date.js';
	export default {
		name:'aredetails',
		props:{
			companyId:'',
		},
		data() {
			return {
				navSeleted:0,
				outInList:[],//进出人员
				mainUserName:'',//负责人姓名
				intoDate:'',//日期
			}
		},
		mounted(){
			this.getOutInList()
		},
		methods: {
			// 点击查看图片
			_previewImage(image){
				let imgArr = [];
				imgArr.push(image);
				console.log(this.base_url+'/img'+imgArr[0]) 
				uni.previewImage({
					urls: imgArr,
					current: this.base_url+'/img'+imgArr[0]
				})
			},
			// 
			switchTj(n){
				this.navSeleted = n;
				this.getOutInList();
			},
			// 获取进出记录
			getOutInList(){
				let api = '/mine/turnover/record';
				let data = {
					companyId:this.companyId,
					type:this.navSeleted,//0进 ，1出
				}
				this.http(api,"GET",data).then(res=>{
					console.log(res)
					if(res.code==200){
						if(res.data){
							this.mainUserName = res.data.mainUserName;
							this.intoDate = res.data.intoDate
							for(let item of res.data.staffList){
								let outIntime = item.createTime;
								outIntime = dates.toDate(outIntime).split(" ")[1].split(':');
								item.outIntime =  outIntime[0]+':'+outIntime[1]
							}
							this.outInList = res.data.staffList;
						}else{
							uni.showToast({
								title:'暂无数据',
								icon:'none',
								duration:2000
							})
						}
					}						 
				})
			},
		}
	}
</script>

<style scoped>
	.statiste-item{
		box-sizing: border-box;
		/* border-bottom: 1rpx solid rgba(15,199,255,.3); */
	}	
	.statiste-item>view{
		border-bottom: 1rpx solid rgba(15,199,255,.2);
	}
	.statiste-item image{
		width: 50rpx;
		height: 50rpx;
		margin-top: 3rpx;
	}
	.content{
		padding-bottom: 110rpx;
	}
	.person-item{
		padding: 12rpx 14rpx 0;
		box-sizing: border-box;
	}
	.statiste-top>view{
		background: #014B84;
	}
	.statiste-top>view,.statiste-item>view{
		width: 18%;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		font-size: 28rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.statiste-top>view:nth-child(4),.statiste-item>view:nth-child(4){
		width: 28%;
	}
	.statiste-top>view:nth-child(2),.statiste-item>view:nth-child(2){
		width: 28%;
	}
	.statiste-item{
		width: 100%;
		/* margin-top: 25rpx; */
	}
	.statiste{
		margin-top: 45rpx;
	}
	.statiste-title>view{
		font-size: 28rpx;
	}
	.statiste-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.tjnavs{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 36rpx;
	}
	.tjnavs>view{
		font-size: 28rpx;
		padding-bottom: 11rpx;
	}
	.tjnavs>view:first-child{
		margin-right: 108rpx;
	}
	.tjnavs .tjActiveds{
		font-size: 30rpx;
		border-bottom: 2rpx solid #fff;
	}
</style>

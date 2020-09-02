<template name='figures'>
	<view class="content">
		<view class="statisteTime">{{nowTimes}}</view>
		<!-- 统计图 -->
		<view class="person-item statisteBlock">
			<echartsr  :option='option'  ref='echartsr' class="echarts"></echartsr> 
			<view></view>
		</view>
		
		<view class="wells">
			<view class="person-item">
				<view>今日下井</view>
				<view>{{intoCount}}人</view>
			</view>
			<view class="person-item">
				<view style="color: #0f0;">今日出井</view>
				<view>{{outCount}}人</view>
			</view>
			<view class="person-item">
				<view style="color: #E50000;">井下现有</view>
				<view>{{residueCount}}人</view>
			</view>
		</view>
	</view>
</template> 

<script>
	import echartsr from './echarts.vue';
	import echarts from '../../../static/echarts.js';
	import dates from '../../../utils/date.js'
	export default {
		name:'figures',
		components:{echartsr},
		props:{
			companyId:''
		},
		data() {
			return {
				option:{},
				intoCount:0,//下井人数
				outCount:0,//出井人数
				residueCount:0,//井下现有
				nowTimes:'',//时间
			}
		},
		beforeCreate() {
		},
		created() {
			this.nowTimes = dates.toDate();
			this.getOptions()
		},
		// 计算属性
		computed:{

		},
		methods: {
			// 获取数据
			getOptions(){
				let api = '/mine/turnover/count';
				let data = { companyId:this.companyId };
				this.http(api,"GET",data).then(res=>{
					console.log(res);
					if(res.code==200){
						this.intoCount = res.data.intoCount;
						this.outCount = res.data.outCount;
						this.residueCount = res.data.residueCount;
						let dataList = res.data.dataList;
						dataList.reverse()
						let xDataTime = dataList.map((item,i)=>{
							return item.date.split('-')[1]+'.'+item.date.split('-')[2]
						})
						let yDateOut = dataList.map((item,i)=>{
							return parseInt(item.count.outCount)
						})
						let yDateIn = dataList.map((item,i)=>{
							return parseInt(item.count.intoCount) 
						})
						this.option = {
							xAxis: {
									type: 'category',
									boundaryGap: false,
									data: xDataTime,
									axisLine:{
										lineStyle:{
											color:'#fff'
										},
										show:false
									},
									splitLine:{
										show:true,
										lineStyle:{
											color:"#041749" 
										}
									},
									axisTick:{
										show:false
									}
							},
							yAxis: {
									type: 'value',
									minInterval: 1, //最小是1
									axisLine:{
										lineStyle:{
											color:'#fff'
										},
										show:false
									},
									splitLine:{
										show:true,
										lineStyle:{
											color:"#041749" 
										}
									},
									axisTick:{
										show:false
									}
							},
							
							series: [
								{
									data: yDateOut,
									type: 'line',
									areaStyle: {},
									smooth:true,    //曲线平滑
									// showAllSymbol: true,
									symbolSize: 8,
									label: {
										normal: {
											show: true,
											color:"#0092f6"
										},
									},
									itemStyle: {
										normal: {
											// color:'rgba(0,146,246,.3)',
											color: new echarts.graphic.LinearGradient(0, 0, 0, 1,//变化度
												//三种由深及浅的颜色
												[ {
													offset : 0,
													color : 'rgba(0,146,246,.8)'
												}, {
													offset : 0.5,
													color : 'rgba(0,146,246,.3)'
												}, {
													offset : 1,
													color : 'rgba(0,146,246,0)'
												} ,
											]),  
											lineStyle: {
												color: "#0092f6",
												width:1  
											},
										}
									}
								},
								{
									data: yDateIn,
									type: 'line',
									showAllSymbol: true,
									areaStyle: {},
									smooth:true,    //曲线平滑
									label: {
										normal: {
											show: true,
											color:"#00d4c7"
										},
									},
									symbolSize: 8,
									itemStyle: {
										normal: {
											// color:'rgba(0,212,199,.3)',//'#00d4c7' 
											color: new echarts.graphic.LinearGradient(0, 0, 0, 1,//变化度
												//三种由深及浅的颜色
												[ {
													offset : 0,
													color : 'rgba(0,212,199,.7)'
												}, {
													offset : 0.5,
													color : 'rgba(0,212,199,.0)'
												}, {
													offset : 1,
													color : 'rgba(0,212,199,.0)'
												} ,
											]),  
											lineStyle: {
												color: "#00d4c7",
												width:1
											},
										}
									},
								}
							]
						}
					}
				})
			},
		}
	}
</script>



<style scoped>
	.echarts{
		width: 100%;
		height: 447.6rpx;
		position: absolute;
		top: -10%;
		left:2%;
		z-index: 99;
	}
	.statisteBlock{
		height: 373rpx;
		position: relative;
	}
	.wells .person-item>view:first-child{
		color: #00FFFF;
		font-size: 36rpx;
		margin-top: 44rpx;
	}
	.wells .person-item>view:last-child{
		color: #FFF;
		font-size: 28rpx;
	}
	.wells{
		width: 718rpx;
		display: flex;
		margin-left: 16rpx;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
	}
	.wells .person-item{
		width: 226rpx;
		height: 168rpx;
		text-align: center;
		overflow: hidden;
		margin-left: 0;
	}
	.statisteTime{
		font-size: 28rpx;
		margin-left: 38rpx;
		margin-top: 42rpx;
	}
</style>

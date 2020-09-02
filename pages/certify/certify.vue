<template>
	<view class="contrain">
		<view class="informs" v-for="(p,i) in news" @tap="readNews(p.id,p.content,p.newsSource,i)" :key='"p"+i'>
			<view class="itimes">{{p.times}}</view>
			<view class="person-item">
				<view class="ittles" :style="{background:p.read?'#014B84':'#f00'}">{{p.subject}}</view>
				<view class="iwords">{{p.content}}</view>
				<view class="ifroms">新闻来源：{{p.newsSource}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import date from '../../utils/date.js'
	export default {
		data() {
			return {
				news: [],
				pages: 1,
				pageNum: 1,
				isOnPullDown: false
			}
		},
		onLoad() {
			this.getNews()
		},
		onShow() {
			// this.pageNum = 1;
			// this.getNews()
		},
		methods: {
			// 阅读信息
			readNews(n, content, newsSource, i) {
				let api = `/message/read/0`
				let data = {
					userId: uni.getStorageSync('userInfo').userId,
					id: n
				}
				this.http(api, "POST", data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.news[i].read = true
						uni.navigateTo({
							url: './certifyInfo?id=' + n
						})
					}
				})
			},
			// 获取当前信息
			getNews(n) {
				// uni.showLoading()
				let api = "/message/news";
				this.http(api, "GET", {
					pageNum: this.pageNum,
					pageSize: 6,
					userId: uni.getStorageSync('userInfo').userId
				}).then(res => {
					// uni.hideLoading()
					if (this.isOnPullDown) {
						uni.stopPullDownRefresh();
					}
					console.log(res)
					if (res.code == 200) {
						let news = res.data.rows;
						news.forEach((item, i) => {
							item.times = date.toDate(item.createTime)
						})
						this.pages = res.data.pages;
						if (n) {
							this.news = this.news.concat(news)
						} else {
							this.news = news
						}
					}
				})
			},
		},
		// 监听用户上拉加载
		onReachBottom() {
			if (this.pages > this.pageNum) {
				this.pageNum += 1
				let n = this.pageNum
				this.getNews(n);
			}
		},
		// 监听用户下拉刷新
		onPullDownRefresh() {
			this.pageNum = 1;
			this.isOnPullDown = true
			this.getNews();
		},
	}
</script>

<style scoped>
	.vtitles {
		width: 100%;
		text-align: center;
		font-size: 30rpx;
	}

	.contrain {
		padding-top: 0;
	}
 
	.informs {
		width: 100%;
		padding-top: 18rpx;
	}

	.itimes {
		color: #FFFFFF;
		font-size: 30rpx;
		width: 100%;
		text-align: center;
		
	}

	.ittles {
		width: 690rpx;
		height: 56rpx;
		color: #fff;
		font-size: 30rpx;
		padding-left: 12rpx;
		box-sizing: border-box;
		line-height: 56rpx;
		background: #014B84;
		margin: 12rpx 14rpx 0;
		padding: 0 20rpx;
		box-sizing: border-box;
		overflow: hidden; 
		text-overflow: ellipsis; 
		white-space: nowrap;
	}

	.iwords {
		width: 661rpx;
		white-space: pre-wrap;
		margin-left: 27rpx;
		margin-top: 23rpx;
		color: #fff;
		font-size: 28rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.ifroms {
		color: #fff;
		font-size: 24rpx;
		margin-top: 29rpx;
		margin-bottom: 29rpx;
		margin-left: 27rpx;
	}

	.person-item {
		overflow: hidden;
	}
</style>

<template>
	<view>
		<view class="citysubway-container">
			<view>
				<u-swiper
				            :list="swiperList"
				           indicator
				                       indicatorMode="line"
							:autoplay="true"	
							circular
				    ></u-swiper>
			</view>
			<view>
				<view>
					<view class="notice-item">
					  <u-grid :border="false" col="4">
							 <u-grid-item v-for="(item, index) in textBar" >
								<navigator :url="item.url" hover-class="none">
									<u-icon :name="item.icon"  :size="item.size" labelPos="bottom" :label="item.title"></u-icon>
								</navigator>
							 </u-grid-item>
						</u-grid>
					</view>
				</view>
			</view>
			<view>
				<view v-for="(item,index) in NewsList">
					<view class="notice-item" >
						<view @click="goNewsDetail(item.id)">
							<view>
								<u--text :text="item.title" :bold="true" size="16"></u--text>
							</view>
							<view>
								<view v-html="item.content" lines="2" class="text-overflow">
								</view>
							</view>
							<view>
								<u--image :showLoading="true" :src="$url+item.cover"  radius="5" :lazy-load="true" width="100%" mode="aspectFill" ></u--image>
							</view>
						</view>
						<br>
						<view>
							<u-row >
								<u-col span="4" style="align-items: center;">
									<u-icon name="share-square"  size="24" :label="(item.readNum*0.1).toFixed(0)"></u-icon>
								</u-col>
								<u-col span="4" style="align-items: center;">
									<u-icon name="chat" size="24" :label="item.commentNum"></u-icon>
								</u-col>
								<u-col span="4" style="align-items: center;" @click="NewsLike(item.id,index)">
									<u-icon :name="item.remark?'thumb-up-fill':'thumb-up'"  size="24" :label="item.likeNum"></u-icon>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				noticeList:[],
				NewsList:[],
				textBar:[
					{
						title:'查询列车',
						icon:'search',
						size:'24',
						url:'/component/citysubway/queryline'
					},
					{
						title:'通知公告',
						icon:'calendar',
						size:'24',
						url:'/component/citysubway/notice'
					},
					{
						title:'我的车卡',
						icon:'coupon',
						size:'24',
						url:'/component/citysubway/carCard'
					},
					{
						title:'失物招领',
						icon:'camera',
						size:'24',
						url:'/component/citysubway/lostfound',
					}
					
				]
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.getswiperList(),
			
			this.getNoticeList();
			this.getNewsList()
			// this.getNoticeList()
		},
		methods: {
			/* 获取轮播图 */
			getswiperList(){
				this.$request.get('prod-api/api/metro/rotation/list')
				.then(res=>{
					if(res.code==200){
						res.rows.forEach(item=>{
							this.swiperList.push(this.$url+item.advImg);
						})
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			getNewsList(){
				this.$request.get('prod-api/api/metro/press/press/list')
				.then(res=>{
					if(res.code==200){
						this.NewsList=res.rows;
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			NewsLike(id,index){
				if(this.NewsList[index].remark=true){
					return false;
				}
				this.$request.put('prod-api/api/metro/press/press/like/'+id)
				.then(res=>{
					if(res.code==200){
						this.NewsList[index].remark=true
						this.NewsList[index].likeNum+=1
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			getNoticeList(){
				this.$request.get('/prod-api/api/metro/notice/list')
				.then(res=>{
					if(res.code==200){
						this.noticeList=res.rows;
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
				
			},
			goNewsDetail(id){
				uni.navigateTo({
					url: '/component/citysubway/newsdetail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
</script>

<style lang="scss">
	
	.citysubway-container{
		padding: 1rem;
		.notice-item{
			padding: 1rem;
			margin: 1rem 0;
			background-color: #fff;
			border-radius: 10rpx;
		}
		.text-overflow{
			margin: .5rem 0;
			 overflow: hidden;
			  display: -webkit-box;
			  -webkit-line-clamp: 2; /* 设置最大显示行数 */
			  -webkit-box-orient: vertical;
		}
	}
	
</style>

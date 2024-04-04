<template>
	<view style="padding: 1rem;">
		<view>
			<u-swiper
			            :list="swiper"
			           indicator
			                       indicatorMode="line"
								   circular
						:autoplay="true"	
			    ></u-swiper>
		</view>
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
</template>

<script>
	export default {
		data() {
			return {
				swiper:[],
				NewsList:[],
				textBar:[
					{
						title:'找停车场',
						icon:'search',
						size:'24',
						url:'/component/stopcar/parking'
					},
					{
						title:'快速充值',
						icon:'order',
						size:'24',
						url:'/component/stopcar/recharge'
					},
					{
						title:'我的车辆',
						icon:'car',
						size:'24',
						url:'/component/stopcar/mycar'
					},
					{
						title:'我的积分',
						icon:'level',
						size:'24',
						url:'/component/stopcar/integral',
					}
					
				]
			}
		},
		mounted() {
			this.getSwiper();
			this.getNewsList()
		},
		methods: {
			getSwiper(){
				this.$request.get('prod-api/api/park/rotation/list')
				.then(res=>{
					if(res.code==200){
						res.rows.forEach(item=>{
							this.swiper.push(this.$url+item.advImg);
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
				this.$request.get('/prod-api/api/park/press/press/list')
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
				this.$request.put('prod-api/api/park/press/press/like/'+id)
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
	.notice-item{
		padding: 1rem;
		margin: 1rem 0;
		background-color: #fff;
		border-radius: 10rpx;
		.text-overflow{
			margin: .5rem 0;
			 overflow: hidden;
			  display: -webkit-box;
			  -webkit-line-clamp: 2; /* 设置最大显示行数 */
			  -webkit-box-orient: vertical;
		}
	}
</style>

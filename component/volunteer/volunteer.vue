<template>
	<view>
		<view style="padding: .5rem;">
			<u-swiper :list="swiper"  indicatorMode="line"   previousMargin="30"
			        nextMargin="30"
			        circular
			        :autoplay="true"
			        radius="5"
					showTitle
					
			       ></u-swiper>
		</view>
		<view class="News">
			<view class="figure" v-for="n in News" @click="goNewsdetail(n.id)">
					<view class="news-images">
						<u--image  :showLoading="true" :src="$url+n.imgUrl" width="100%" :lazy-load="true" shape="square" radius="5" height="100%"  mode="widthFix" ></u--image>
					</view>
					<view class="content">
						<u--text  class="title" :text="n.title" size="16"  :bold="true" lines="2"></u--text>
						<u--text :text="n.summary" margin="10px 0" lines="3" size="14"></u--text>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				News:[],
				swiper:[],
			}
		},
		mounted() {
			this.getImages();
			this.getNews();
		},
		methods: {
			getImages(){
				this.$request.get("prod-api/api/volunteer-service/ad-banner/list")
				.then(res=>{
					if(res.code==200){
						res.data.forEach(item=>{
							
							this.swiper.push(this.$url+item.imgUrl);
						})
						
						
					}
				})
			},
			getNews(){
				this.$request.get("prod-api/api/volunteer-service/news/list")
				.then(res=>{
					if(res.code==200){
						
						this.News=res.rows;
					}else{
						
					}
				})
				
			},
			goNewsdetail(id){
				uni.navigateTo({
					url: '/pages/newsdetail/newsdetail?newsid='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	
	.News{
		padding:0 .8rem;
		
		.figure{
			border-radius: 5px;
			margin: 1rem 0;
			background-color: #fff;
			font-size: .8rem;
			box-shadow:  0px 0px 5px  rgba(0, 0,0, .1);
		}
		.content{
			padding: 1rem;
			color: red;
			.title{
				color: red;
				font-size: 50rpx;
				font-weight: 300;
				
			}
		}
		
	}
</style>

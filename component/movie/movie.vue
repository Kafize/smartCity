<template>
	<view>
		<view style="padding: 1rem;">
			<u-swiper :list="swiper"  
			       
					indicator
					            indicatorMode="line"
					            circular
			        bgColor="#ffffff"></u-swiper>
		</view>
		
		<view class="movie-container">
			<u-notice-bar text="开学快乐!" mode="closable"></u-notice-bar>
			<u--text text="正在热映" class="movie-title" size="16" margin=".5rem 0"></u--text>
			<u-skeleton 
				    rows="10"
				    title
					:loading="loading"
				></u-skeleton>
			 <u-row customStyle="margin-bottom: 10px"  v-for="item in movie" align="top" gutter="10" class="movie-item" @click="gomovieDetail(item.id)">
				<u-col span="4">
					<u--image :src="$url+item.cover" :lazy-load="true" shape="square" width="100%" :height="155" mode="aspectFill"  ></u--image>
				</u-col>
				<u-col span="8">
					<view>
						<u--text :text="item.name" :bold="true" :size="16" margin=".1rem 0 .5rem 0"></u--text>
					</view>
					<u--text :text="'片长：'+item.duration+'分钟'" margin=".1rem 0"></u--text>
					<u--text :text="'上映时间：'+item.playDate" margin=".1rem 0"></u--text>
					<u--text :text="'语言：'+item.language" margin=".1rem 0"></u--text>
					<u--text :text="'评分：'+item.score.toFixed(1)" margin=".1rem 0"></u--text>
					<u--text :text="'喜欢：'+(item.favoriteNum/10000).toFixed(1)+'w'"></u--text>
				</u-col>
			</u-row>
			<u-loadmore v-if="!loading"
							:loadmoreText="'共'+total+'条记录'"
							color="#1CD29B"
							lineColor="#1CD29B"
							dashed
							line
			    />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper:[],
				movie:[],
				total:'',
				imgUrl:this.$url,
				loading:true
			}
		},
		mounted() {
			this.getImages();
			setTimeout(this.getMovie,1000);
		},
		onLoad() {
			
		},
		methods: {
			
			getImages(){
				this.$request.get("prod-api/api/movie/rotation/list")
				.then(res=>{
					if(res.code==200){
						res.rows.forEach(item=>{
							this.swiper.push(this.$url+item.advImg);
						})
					}
				})
			},
			getMovie(){
				this.$request.get("prod-api/api/movie/film/list")
				.then(res=>{
					if(res.code==200){
						this.movie=res.rows
						this.total=res.total
						this.loading=false;
						
					}
				})
			},
			gomovieDetail(id){
				uni.navigateTo({
					url: '/component/movie/moviedetail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	.movie-container{
		margin: .5rem 1rem;
		padding: 1rem;
		border-radius: 40rpx;
		background-color: #fff;
		.movie-item{
			padding: .8rem 0;
		}
		.movie-title{
			font-weight: 300;
			border-left: 10rpx solid #ccc;
			padding-left: 8px;
		}
	}
</style>

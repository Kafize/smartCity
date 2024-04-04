<template>
	<view style="background-color: #f3f4f6;padding: 1rem;">
	
		<view>
			<u-swiper
			            :list="imagesList"
			           indicator
			                       indicatorMode="line"
								   circular
						:autoplay="true"	
						
			       
			        radius="5"
			      
			    ></u-swiper>
		</view>
		<view style="padding: .5rem 0;">
			 <u-notice-bar :text="'你好，请不要乱扔垃圾，谢谢你。  ———小垃圾'" bgColor="#e45656"  color="#fff" speed="50" style="border-radius: 5px;" ></u-notice-bar>
		</view>
		<view >
			<view v-for="i in garbage_classification_data"  class="card" @click="gorubbish(i.id)" > 
				<u--text :text="i.name" class="title" :bold="true" size="18"></u--text>
				<view style="padding:.5rem  1rem;">
					 <u--image :showLoading="true" style="transform: scale(.75);"  :src="$url+i.imgUrl"  width="100%"  :lazy-load="true"   mode="widthFix" ></u--image>
				</view>
				<view>
					<u--text :text="i.introduce"></u--text>
				</view>
				<view>
					<u--text :text="i.guide"></u--text>
				</view>
				<u-divider></u-divider>
			</view>
		</view>
		<view style="padding: .5rem 0;">
			<view class="card" v-for="i in poster_list">
				<view>
					<u--text :text="i.title" :bold="true"> </u--text>
				</view>
				<u-divider></u-divider>
				<view>
					<u-image :src="$url+i.imgUrl" mode="" width="100%"></u-image>
				</view>
			</view>
		</view>
		<view style="padding: .5rem 0;">
			<u-subsection :list="classification" :current="current" activeColor="#e45656" @change="sectionChange"></u-subsection>
		</view>
		<view>
			<view class="card" v-for="i in garbage_classification_news_data" @click="gonewDetail(i.id)">
				<view >
					<u--text :text="i.title" :bold="true"> </u--text>
				</view>
				<u-divider></u-divider>
				<view >
					<u-image :src="$url+i.imgUrl" mode="" width="100%"></u-image>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>

	export default {
		data() {
			return {
				detail:[],
				current: 0,
				imagesList:[],
				classification:[],
				garbage_classification_news_data:[],
				garbage_classification_data:[],
				poster_list:[]
			}
		},
		onLoad(option) {
			this.id=option.id;
			
		},
		mounted() {
			this.poster();
			this.getImage();
			this.garbage_classification();
			this.garbage_classification_();
			this.garbage_classification_news(7);
		},
		methods: {
			sectionChange(index){
				this.current=index;
				this.garbage_classification_news(this.classification[index].id)
			},
			/* 垃圾分类  */
			garbage_classification_(){
				this.$request.get('prod-api/api/garbage-classification/garbage-classification/list')
				.then(res=>{
					if(res.code==200){
						this.garbage_classification_data=res.rows;
						
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
			},
			poster(){
				this.$request.get('prod-api/api/garbage-classification/poster/list')
				.then(res=>{
					if(res.code==200){
						
						this.poster_list=res.data;
						
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
			},
			
			garbage_classification_news(id){
				this.$request.get('prod-api/api/garbage-classification/news/list?type='+id)
				.then(res=>{
					if(res.code==200){
						this.garbage_classification_news_data=res.rows;
						
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
			},
			garbage_classification(){
				this.$request.get('prod-api/api/garbage-classification/news-type/list')
				.then(res=>{
					if(res.code==200){
						
						this.classification=res.rows;
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
			},
			getImage(){
				this.$request.get('prod-api/api/garbage-classification/ad-banner/list')
				.then(res=>{
					if(res.code==200){
						res.data.forEach(item=>{
							this.imagesList.push(this.$url+item.imgUrl)
							
						})
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
			},
			gonewDetail(id){
				uni.navigateTo({
					url: '/component/rubbish/newsdetail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			gorubbish(id){
				uni.navigateTo({
					url: '/component/rubbish/garbage-example?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.card{
		 margin-bottom: 1rem;
		box-shadow: 0px 0px 2px rgba(0, 0, 0, .1);
		 border-radius: 15px;
		 background-color: #fff;
		 padding: 1rem;
	}
	.title{
		font-weight: 300;
		border-left: 10rpx solid #e45656;
		padding-left: 8px;
	}
</style>

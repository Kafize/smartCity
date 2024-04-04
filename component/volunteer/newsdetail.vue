<template>
	<view class="container">
		<u--text :text="newsDetail.title" class="title" :bold="true" :size="18"></u--text>
		<u--text :text="newsDetail.summary" class="summary" ></u--text>
		<u--image  :src="$url+newsDetail.imgUrl" :lazy-load="true" shape="square" width="100%" ></u--image>
		<view v-html="newsDetail.content"></view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				newsDetail:{},
				
			}
		},
		onLoad (option) {
			this.getNewsdetail(option.newsid);
		},
		methods: {
			getNewsdetail(newsid){
				
				const newsUrl='prod-api/api/volunteer-service/news/'+newsid
				this.$request.get(newsUrl)
				.then(res=>{
					if(res.code=200){
						this.newsDetail=res.data;
					}else{
						uni.showToast({
							title:"查询失败",
							icon:'error',
							mark:true
						})
						
					}
				})
				
			},
			
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 1rem;
		.title{
			font-size: 1.2rem;
			font-weight: bold;
		}
		.summary{
			padding: 1rem 0;
		}
		 .summary::before {
		     height: 100%;
			 width: 20rpx;
			background-color: #efefef;
		      margin-right: 8px;
		    }
	}
</style>

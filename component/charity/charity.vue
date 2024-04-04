<template>
	<view style="padding: 1rem;">
		<u-swiper
		            :list="imagesList"
		           indicator
		                       indicatorMode="line"
							   circular
					:autoplay="true"	
					 previousMargin="30"
                nextMargin="30"
               
                radius="5"
              
		    ></u-swiper>
		<view style="padding: 1rem 0;">
			 <u-grid
			              :border="true"
			               
							col="4"
			        >
					<u-grid-item v-for="i in welfare" style="padding: .5rem;background-color: #fff;" @click="goCategory(i.id,i.name)">
						<view >
							<u--image :showLoading="true" :src="$url+i.imgUrl" width="28px" height="28px"  mode="widthFix" ></u--image>
						</view>
						 <u--text :text="i.name" :bold="true" align="center" size="12"></u--text>
					</u-grid-item>
			</u-grid>
			
		</view>
		<view>
			<view>
				<view v-for="i in commend_list" class="card" @click="goDetail(i.id)">
					<u-row justify="center" align="center">
						<u-col span="4">
							<view>
								<u--image :showLoading="true" :src="$url+i.imgUrl" width="95%" mode="aspectFill" height="80px"></u--image>
							</view>
						</u-col>
						<u-col span="8">
							<view>
								<u--text :text="i.name" :bold="true"></u--text>
								<u--text :text="i.author" color="#909399" size="12"></u--text>
								<view style="padding:.5rem 0;">
									
									<u--text :text="i.activityAt" color="#909399" size="12" align="end"></u--text>
									<u--text :text="i.donateCount+' 人捐款'" size="12" color="#909399" align="end"></u--text>
								</view>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				welfare:[],
				imagesList:[],
				commend_list:[]
			}
		},
		mounted() {
			this.getwelfare()
			this.getImage();
			this.getrecommend_list();
		},
		methods: {
			getwelfare(){
				this.$request.get('prod-api/api/public-welfare/public-welfare-type/list')
				.then(res=>{
					if(res.code==200){
						this.welfare=res.data;
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				.catch(err=>{
					console.log(err);
				})
			},
			getImage(){
				this.$request.get('prod-api/api/public-welfare/ad-banner/list')
				.then(res=>{
					if(res.code==200){
						res.data.forEach(item=>{
							this.imagesList.push(this.$url+item.imgUrl);
						})
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			getrecommend_list(){
				this.$request.get('prod-api/api/public-welfare/public-welfare-activity/recommend-list')
				.then(res=>{
					if(res.code==200){
						this.commend_list=res.rows
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
				
			},
			goDetail(id){
				uni.navigateTo({
					url: '/component/charity/detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			goCategory(id,title){
				uni.navigateTo({
					url: `/component/charity/category?id=${id}&title=${title}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	.card{
		box-shadow: 0px 0px 2px rgba(0, 0, 0, .1);
		margin-bottom: 1rem;
		padding: 1rem;
		border-radius: 15px;
		background-color: #fff;
	}
</style>

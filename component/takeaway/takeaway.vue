<template>
	<view>
		<view class="takeaway-container">
			<view>
				<u-swiper
				            :list="takeawaySwiperList"
				           indicator
				                       indicatorMode="line"
									   circular
							:autoplay="true"	
				    ></u-swiper>
			</view>
			<view style="padding: 1rem 0;" >
				<u-grid :col="5">
					<u-grid-item v-for="c in takeawayCategory" @click="goShopThemeid(c.id,c.themeName)">
						<u-icon :name="$url+c.imgUrl" :label="c.themeName" labelPos="bottom" size="28"></u-icon>
					</u-grid-item>
				</u-grid>
			</view>
			<view>
				<view>
					<takeawayItem :shopArray="nearbyShop"></takeawayItem>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import takeawayItem from './component/takeawayItem.vue'
	export default {
		components:{
			'takeawayItem':takeawayItem
		},
		data() {
			return {
				takeawaySwiperList:[],
				takeawayCategory:[],
				nearbyShop:[], 
			}
		},
		mounted() {
			this.getTakeawayImage();
			this.getakeawayCategory();
			this.getNearShop();
			
		},
		methods: {
			/* 获取轮播图 */
			getTakeawayImage(){
				this.$request.get('prod-api/api/takeout/rotation/list')
				.then(res=>{
					if(res.code==200){
						res.rows.forEach(item=>{
							this.takeawaySwiperList.push(this.$url+item.advImg);
						})
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
						
					}
				})
			},
			getakeawayCategory(){
				this.$request.get('/prod-api/api/takeout/theme/list')
				.then(res=>{
					this.takeawayCategory=res.data;
					
				})
			},
			getNearShop(){
				this.$request.get('/prod-api/api/takeout/seller/near')
				.then(res=>{
					
					if(res.code==200){
						this.nearbyShop=res.rows;
						
					}
				})
			},
			goShopThemeid(themeid,name){
				uni.navigateTo({
					url: `/component/takeaway/shopThemeid?id=${themeid}&name=${name}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	
	.takeaway-container{
		padding: 1rem;
		.tag-error{
			border: solid 1.2px #e45656;
			color: $u-error-dark;
			font-size: .6rem;
			padding: 1rpx;
		}
	}

</style>

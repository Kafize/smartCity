<template>
	<view >
		<view style="padding: 1rem;">
			<u-swiper
			            :list="imagesList"
			           indicator
			                       indicatorMode="line"
								   circular
						:autoplay="true"	
			    ></u-swiper>
		</view>
		<view>
			<view>
				 <u-grid
				              :border="true"
				               
								col="2"
				        >
						<u-grid-item v-for="i in logistics_company" style="padding: 1rem;background-color: #fff;">
							<view >
								<u--image :showLoading="true" :src="$url+i.imgUrl" width="80px" height="80px"  mode="widthFix" ></u--image>
							</view>
							 <u--text :text="i.name" :bold="true" align="center"></u--text>
						</u-grid-item>
				</u-grid>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagesList:[],
				logistics_company:[]
			}
		},
		mounted() {
			this.getImage();
			this.getlogistics_company()
		},
		methods: {
			getImage(){
				this.$request.get('prod-api/api/logistics-inquiry/ad-banner/list')
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
			getlogistics_company(){
				this.$request.get('prod-api/api/logistics-inquiry/logistics_company/list')
				.then(res=>{
					if(res.code==200){
						this.logistics_company=res.data;
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
						
					}
				})
			},
			
		}
	}
</script>

<style>

</style>

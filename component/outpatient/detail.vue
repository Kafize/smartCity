<template>
	<view style="padding: 1rem;">
		<view>
			<u-navbar
			           title="医院详细"
			          :border="true"
			           :autoBack="true"
								:placeholder="true"
			       >
			       </u-navbar>
		</view>
		<view>
			<u-swiper :list="swiper"
			       
					indicator
					            indicatorMode="line"
					            circular
			        bgColor="#ffffff"></u-swiper>
		</view>
		<view>
			<view class="company-item" >
				<view>
					<u--text :text="detail.hospitalName" size="18" :bold="true"></u--text>
				</view>
				<u-divider></u-divider>
				<view style="padding-bottom: 1rem;">
					<u--text v-html="detail.brief" lines="2" class="text-overflow"></u--text>
				</view>
				<view>
					<u--image :showLoading="true" width="100%" :src="$url+detail.imgUrl" :lazy-load="true"  mode="widthFix" ></u--image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				swiper:[],
				detail:''
			}
		},
		onLoad(option) {
			this.id=option.id;
		},
		mounted() {
			this.getImages()
			this.getDetail();
		},
		methods: {
			getImages(){
				this.$request.get("prod-api/api/hospital/banner/list?hospitalId="+this.id)
				.then(res=>{
					if(res.code==200){
						res.data.forEach(item=>{
							this.swiper.push(this.$url+item.imgUrl);
						})
					}
				})
			},
			getDetail(){
				this.$request.get("/prod-api/api/hospital/hospital/"+this.id)
				.then(res=>{
					if(res.code==200){
						this.detail=res.data;
					}
				})
			}
		}
	}
</script>

<style>
.company-item{
		border-radius: 10rpx;
		background-color: #fff;
		margin-top: 1rem;
		padding: 1rem;
	}
	
</style>

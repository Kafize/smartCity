<template>
	<view style="padding: 1rem;">
		<view>
			<u-swiper :list="images"
			
					
					indicator
					
					            indicatorMode="line"
					            circular
			        bgColor="#ffffff"></u-swiper>
					<br>
		</view>
		<view>
			<view>
				<u--text class="title" text="检车地址" :bold="true"></u--text>
			</view>
			<view v-for="i in place_list" class="card">
				<u--text :text="i.placeName" :bold="true"></u--text>
				<u--text :text="i.remarks"></u--text>
				<u--text :text="i.address"></u--text>
				<u--text :text="i.phone"></u--text>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images:[] ,
				place_list:[]
			}
		},
		mounted() {
			this.getImages();
			this.get_place_list()
		},
		methods: {
			getImages(){
				this.$request.get("prod-api/api/traffic/rotation/list")
				.then(res=>{
					if(res.code==200){
						res.rows.forEach(i=>{
							this.images.push(this.$url+i.advImg)
						})
						
					}
				})
			},
			get_place_list(){
				this.$request.get("prod-api/api/traffic/checkCar/place/list")
				.then(res=>{
					if(res.code==200){
					
						this.place_list=res.rows;
					}
				})
			},
			
		}
	}
</script>

<style>
.card{
	padding: 1rem;
	background-color: #fff;
	margin: .5rem 0;
}
.title{
 	font-weight: 300;
 	border-left: 10rpx solid #3c9cff;
 	padding-left: 8px;
 }
</style>

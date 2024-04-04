<template>
	<view style="padding: 1rem;">
		<view>
			<u-swiper :list="swiper"
					keyName="image"
					indicator
					showTitle
					            indicatorMode="line"
					            circular
			        bgColor="#ffffff"></u-swiper>
		</view>
		<br>
		<view>
			<swiper :indicator-dots="true"  class="swiper" style="background-color: #fff;height: 170px;">
				<swiper-item>
					<u-grid :border="true" col="4">
						<u-grid-item
								v-for="(item, index) in legal_expertise_data1"
								@click="godetail(item.id)"
							style="padding: 1rem;"
						>
							<u-icon
									
									:name="$url+item.imgUrl"
									:size="22"
							></u-icon>
							<u--text :text="item.name" size="14" align="center"></u--text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :border="true" col="4">
						<u-grid-item
						@click="godetail(item.id)"
								v-for="(item, index) in legal_expertise_data2"
							style="padding: 1rem;"
						>
							<u-icon
									
									:name="$url+item.imgUrl"
									:size="22"
							></u-icon>
							<u--text :text="item.name" size="14" align="center"></u--text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
			            
			</swiper>
			<br>
			<view class="card" v-for="i in top10data">
				<view>
					<u-icon :name="$url+i.avatarUrl" color="" size="30" :label="i.name"></u-icon>
				</view>
				<u-divider></u-divider>
				<view>
					<u--image :showLoading="true" :src="$url+i.certificateImgUrl" width="100%" :lazy-load="true" ></u--image>
				</view>
				<view>
					<u--text lines="4" :text="i.baseInfo"></u--text>
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
				/* 法律转长*/
				legal_expertise_data:[],
				legal_expertise_data1:[],
				legal_expertise_data2:[],
				top10data:[]
			}
		},
		onLoad() {
			this.get_legal_expertise()
		},
		mounted() {
			this.get_legal_expertise()
			this.getImages()
			this.top10()
		},
		methods: {
			getImages(){
				this.$request.get("prod-api/api/lawyer-consultation/ad-banner/list")
				.then(res=>{
					if(res.code==200){
						res.data.forEach(i=>{
							this.swiper.push({
								'image':this.$url+i.imgUrl,
								'title':i.title
							})
						})
					}
					
				})
			},
			get_legal_expertise(){
				this.$request.get("prod-api/api/lawyer-consultation/legal-expertise/list")
				.then(res=>{
					if(res.code==200){
						this.legal_expertise_data=res.rows;
						this.legal_expertise_data1=this.legal_expertise_data.splice(0,8)
						this.legal_expertise_data2=this.legal_expertise_data.splice(0,8)
					}
					
				})
			},
			top10(){
				this.$request.get("prod-api/api/lawyer-consultation/lawyer/list-top10")
				.then(res=>{
					if(res.code==200){
						this.top10data=res.data;
					}
				})
				
			},
			godetail(id){
				uni.navigateTo({
					url: '/component/law/detail?id='+id,
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
		padding:1rem;
	}
</style>

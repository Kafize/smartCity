<template>
	<view style="padding: 1rem;">
		<u-swiper :list="ad_banner"
		
				keyName="image"
				indicator
				showTitle
				            indicatorMode="line"
				            circular
		        bgColor="#ffffff"></u-swiper>
				<br>
		<view>
			<swiper :indicator-dots="true"  class="box-shadow" style="height: 175px;border-radius: 15px;">
				<swiper-item>
					<u-grid :border="true" col="4">
						<u-grid-item
								v-for="(item, index) in legal_expertise_data1"
								@click="godetail(item.id)"
							style="padding: 1rem .5rem;"
						>
							<u-icon
									
									:name="$url+item.imgUrl"
									:size="22"
							></u-icon>
							<u--text :text="item.name" size="12" align="center"></u--text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :border="true" col="4">
						<u-grid-item
						@click="godetail(item.id)"
								v-for="(item, index) in legal_expertise_data2"
							style="padding: 1rem .5rem;"
						>
							<u-icon
									
									:name="$url+item.imgUrl"
									:size="22"
							></u-icon>
							<u--text :text="item.name" size="12" align="center"></u--text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
			            
			</swiper>
		</view>
		<br>
		<view>
			<view style="padding: .5rem 0;">
				<u-subsection :list="list" :current="current" activeColor="#e45656" @change="sectionChange"></u-subsection>
			</view>
			<view>
				<view v-for="i in housing" class="card">
					<u-row justify="start" gutter="10">
						<u-col span="5">
							<u--image :showLoading="true" :src="$url+i.pic" width="100%" height="auto"  :lazy-load="true"  mode="widthFix" ></u--image>
						</u-col>
						<u-col span="7">
							<u--text :text="i.address" size="14" :bold="true"></u--text>
							<view>
								
							</view>
							<view style="padding: .5rem 0;">
								<u--text :text="i.description" lines="2" size="12"></u--text>
								
							</view>
							<u--text :text="i.price" lines="2" align="end" size="12"></u--text>
						</u-col>
					</u-row>
					<view>
					
				</view>
			</view>
		</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				ad_banner:[],
				legal_expertise_data:[],
				legal_expertise_data1:[],
				legal_expertise_data2:[],
				housing:[],
				current:0,
				list:['二手','中介','租房']
			}
		},
		mounted() {
			this.getImages()
			this.get_legal_expertise()
			this.getHouse(0)
		},
		methods: {
			getImages(){
				this.$request.get("prod-api/api/gov-service-hotline/ad-banner/list")
				.then(res=>{
					if(res.code==200){
						res.data.forEach(i=>{
							this.ad_banner.push({
								'image':this.$url+i.imgUrl,
								'title':i.title
							})
						})
					}
				})
			},
			get_legal_expertise(){
				this.$request.get("prod-api/api/gov-service-hotline/appeal-category/list")
				.then(res=>{
					if(res.code==200){
						this.legal_expertise_data=res.rows;
						this.legal_expertise_data1=this.legal_expertise_data.splice(0,8)
						this.legal_expertise_data2=this.legal_expertise_data.splice(0,8)
					}
					
				})
			},
			godetail(id){
				uni.navigateTo({
					url: '/component/government/detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getHouse(value){
				this.$request.get("prod-api/api/house/housing/list?houseType="+this.list[value])
				.then(res=>{
					if(res.code==200){
						this.housing=res.rows
					}
				})
			},
			sectionChange(index){
				this.current=index;
				this.getHouse(index)
			}
			
		}
	}
</script>

<style>
 .box-shadow{
	box-shadow: 0px 0px 10px rgba(0, 0, 0, .2);
	background-color: #fff;
 }
 .card{
 	 padding: 1rem;
 	 background-color: #fff;
 	 margin-bottom: .5rem;
 	 border-radius: 15px;
 	 box-shadow: 0 0 5px rgba(0, 0, 0, .2);
 }
</style>

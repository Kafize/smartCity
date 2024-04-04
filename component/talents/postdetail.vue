<template>
	<view style="background-color: #f3f4f6;padding: 1rem;">
		<view>
			<u-navbar 
			            title="驿站详细"
					 :placeholder="true"
					  :border="true"
			            :autoBack="true"
			        >
			        </u-navbar>
		</view>
		<view>
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
		</view>
		<br>
		
		<view>
			<view class="card">
				<view >
					<view>
						<u--text class="title" :text="'驿站介绍'"></u--text>
					</view>
					<br>
					<view>
						<image :src="$url+detail.coverImgUrl"  style="border-radius: 15px 15px 0 0;width: 100%;"></image>
					</view>
					<view class="content" style="padding: .5rem 1rem ;">
						<view style="padding: .5rem 0;">
							<u--text :text="detail.name" size="18" :bold="true" ></u--text>
							<u--text :text="detail.introduce" size="14" lines="4" ></u--text>
							
						</view>
						<view>
							<u-icon name="map" :label="detail.address"></u-icon>
							<u-icon name="phone" :label="detail.phone"></u-icon>
						</view>
						<br>
						<view>
							<u-row>
								<u-col span="6">	
									<u--text :text="detail.bedsCountBoy" size="14" align="center"  ></u--text>
									<u--text :text="'剩余男床位'" size="16" align="center"></u--text>			
								</u-col>
								<u-col span="6">
									<u--text :text="detail.bedsCountGirl" size="14" align="center"  ></u--text>
									<u--text :text="'剩余女床位'" size="16" align="center"></u--text>			
								</u-col>
							</u-row>
						</view>
						<u-divider></u-divider>
						<u--text :text="detail.specialService"></u--text>
						<u--text :text="detail.workTime"></u--text>
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
				detail:[],
				imagesList:[]
			}
		},
		onLoad(option) {
			this.id=option.id;
			
			this.getDetail()
		},
		mounted() {
			
		},
		methods: {
			getDetail(){
				this.$request.get('prod-api/api/youth-inn/youth-inn/'+this.id)
				.then(res=>{
					if(res.code==200){
						this.detail=res.data;
						this.detail.imageUrlList.forEach(item=>{
						
							this.imagesList.push(this.$url+item)
						})
						
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
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

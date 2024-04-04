<template>
	<view style="padding: 1rem;">
		
		<view class="card">
			<view>
				<u--text :text="'人才区域'" class="title"></u--text>
			</view>
			<br>
			
			<view  v-for="i in data" @click="goDetail(i.id)">
				<view>
					<image :src="$url+i.imgUrl"  style="border-radius: 15px 15px 0 0;width: 100%;"></image>
				</view>
				<view class="content" style="padding: .5rem;">
					<view>
						<u--text :text="i.name" size="18" :bold="true" ></u--text>
					</view>
				</view>
				<u-divider></u-divider>
			</view>
		</view>
		<view class="card">
			<view>
				<u--text :text="'青年驿站'" class="title"></u--text>
			</view>
			<br>
			
			<view  v-for="i in youth_list"  @click="goPost(i.id)">
				<view>
					<image :src="$url+i.coverImgUrl"  style="border-radius: 15px 15px 0 0;width: 100%;"></image>
				</view>
				<view class="content" style="padding: .5rem;">
					<view style="padding: .5rem 0;">
						<u--text :text="i.name" size="18" :bold="true" ></u--text>
						<u--text :text="i.introduce" size="14" lines="4" ></u--text>
						
					</view>
					<view>
						<u-icon name="map" :label="i.address"></u-icon>
						<u-icon name="phone" :label="i.phone"></u-icon>
					</view>
					<br>
					<view>
						<u-row>
							<u-col span="6">	
								<u--text :text="i.bedsCountBoy" size="14" align="center"  ></u--text>
								<u--text :text="'剩余男床位'" size="16" align="center"></u--text>			
							</u-col>
							<u-col span="6">
								<u--text :text="i.bedsCountGirl" size="14" align="center"  ></u--text>
								<u--text :text="'剩余女床位'" size="16" align="center"></u--text>			
							</u-col>
						</u-row>
					</view>
				</view>
				<u-divider></u-divider>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				data:[],
				youth_list:[]
			}
		},
		mounted() {
			this.youth()
			this.getData()
		},
		methods: {
			getData(){
				this.$request.get('prod-api/api/youth-inn/talent-policy-area/list')
				.then(res=>{
					if(res.code==200){
						this.data=res.data;
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				
			},
			goDetail(id){
				uni.navigateTo({
					url: '/component/talents/detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goPost(id){
				uni.navigateTo({
					url: '/component/talents/postdetail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			youth(){
				this.$request.get('prod-api/api/youth-inn/youth-inn/list')
				.then(res=>{
					if(res.code==200){
						this.youth_list=res.rows;
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

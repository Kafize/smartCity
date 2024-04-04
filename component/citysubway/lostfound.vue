<template>
	<view style="background-color: ;">
		<view>
			<u-navbar title="失物招领" bgColor="#fff" :placeholder="true"  :autoBack="true" :border="true">
				
			</u-navbar>
			
		</view>
		<view>
			<view class="lost-container">
				<view  v-for="m in lostList" class="lost-item">
					<u--text :text="m.publishDate"  size="18"></u--text>
					<u-divider ></u-divider>
					<view>
						<u-row style="margin: 1rem 0;" gutter="10" justify="start" align="start" v-for="t in m.metroFoundList">
							<u-col span="4">
								<u--image :showLoading="true" :src="$url+t.imgUrl" width="100%" height="auto" :radius="5" :lazy-load="true"  mode="widthFix" ></u--image>
							</u-col>
							<u-col span="8">
								<view>
									<u--text :text="'拾取地点：'+t.foundPlace"  color="#606266"></u--text>
								</view>
								<view>
									<u--text :text="'认领地点：'+t.claimPlace" color="#606266"></u--text>
								</view>
								<view>
									
									<u--text :text="'拾取时间：'+t.foundTime" color="#606266"></u--text>
								</view>
							</u-col>
						</u-row>
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
				lostList:[]
			}
		},
		mounted() {
			this.getLostList()
		},
		methods: {
			getLostList(){
				this.$request.get('prod-api/api/metro/found/list')
				.then(res=>{
					if(res.code==200){
						this.lostList=res.data;
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

<style lang="scss">
	.lost-container{
		padding: .5rem 1rem;
		background-color: $u-bg-color;
		.lost-item{
			padding: 1rem;
			background-color: #fff;
			border-radius: 10px;
			margin: 1rem 0;
			box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.1);  

		}
	}
</style>

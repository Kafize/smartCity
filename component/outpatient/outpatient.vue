<template>
	<view style="padding:0 1rem ;">
		<view>
			<view class="company-item" v-for="i in outpatient" @click="goDetail(i.id)">
				<view>
					<u--text :text="i.hospitalName" size="18" :bold="true"></u--text>
				</view>
				<u-divider></u-divider>
				<view style="padding-bottom: 1rem;">
					<u--text v-html="i.brief" lines="2" class="text-overflow"></u--text>
				</view>
				<view>
					<u--image :showLoading="true" width="100%" :src="$url+i.imgUrl" :lazy-load="true"  mode="widthFix" ></u--image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				outpatient:[]
			}
		},
		mounted() {
			this.getoutpatient();
		},
		methods: {
			getoutpatient(){
				this.$request.get('/prod-api/api/hospital/hospital/list')
				.then(res=>{
					if(res.code==200){
						
						this.outpatient=res.rows;
						
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				.catch(err=>{
				
				})
			},
			goDetail(id){
				uni.navigateTo({
					url: '/component/outpatient/detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
	.text-overflow{
		margin: .5rem 0;
		 overflow: hidden;
		  display: -webkit-box;
		  -webkit-line-clamp: 4; /* 设置最大显示行数 */
		  -webkit-box-orient: vertical;
	}
</style>

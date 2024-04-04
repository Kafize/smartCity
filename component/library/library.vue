<template>
	<view style="padding:1rem">
		<view>
			<view class="card" v-for="i in Data" @click="goDetail(i.id)">
				<view>
					<u--text :text="i.name" size="14" :bold="true" ></u--text>
					<u--text :text="i.address" size="12" ></u--text>
				</view>	
				<u-divider></u-divider>
				<view>
					<u--image :showLoading="true" :src="$url+i.imgUrl" width="100%" :lazy-load="true" mode="widthFix"></u--image>
				</view>	
				
			</view>
		</view>	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data:[]
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData(){
			
				this.$request.get('prod-api/api/digital-library/library/list')
				.then(res=>{
					if(res.code==200){
						this.Data=res.rows;
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
			},
			goDetail(id){
				uni.navigateTo({
					url: '/component/library/detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
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

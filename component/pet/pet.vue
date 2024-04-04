<template>
	<view style="background-color: #fff;">
		<view>
			 <u-grid
			              :border="true"
			               
							col="2"
			        >
					<u-grid-item v-for="i in images" style="padding: 1rem;" @click="goDoctor(i.id)">
						<view >
							<u--image :showLoading="true" :src="$url+i.imgUrl" width="80px" height="80px"  mode="widthFix" ></u--image>
						</view>
						 <u--text :text="i.name" :bold="true" align="center"></u--text>
					</u-grid-item>
			</u-grid>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images:[]
			}
		},
		mounted() {
			this.getcategory();
		},
		methods: {
			goDoctor(id){
				uni.navigateTo({
					url: '/component/pet/petdoctor?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getcategory(){
				this.$request.get('prod-api/api/pet-hospital/pet-type/list')
				.then(res=>{
					if(res.code==200){
						
						this.images=res.data
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				
			}
		}
	}
</script>

<style>

</style>

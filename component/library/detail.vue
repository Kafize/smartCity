<template>
	<view style="padding: 1rem;">
		<u-navbar
		            title="图书馆详细"
				 :placeholder="true"
				  :border="true"
		            :autoBack="true"
		        >
		        </u-navbar>
		<view class="card">
			<view>
				<u--text :text="detail.name" size="14" :bold="true" ></u--text>
				<u--text :text="detail.address" size="12" ></u--text>
			</view>	
			<u-divider></u-divider>
			<view>
				<u--image :showLoading="true" :src="$url+detail.imgUrl" width="100%" :lazy-load="true" mode="widthFix"></u--image>
			</view>	
			<view style="padding: 1rem 0;">
				<u--text :text="detail.description"></u--text>
			</view>	
			<view>
				<u--text :text="detail.businessHours" align="end"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detail:[]
			}
		},
		onLoad(option) {
			this.id=option.id
		},
		mounted() {
			this.getDetail();
		},
		methods: {
			getDetail(){
				this.$request.get('prod-api/api/digital-library/library/'+this.id)
				.then(res=>{
					if(res.code==200){
						this.detail=res.data;
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
			},
			
		}
	}
</script>

<style>

</style>

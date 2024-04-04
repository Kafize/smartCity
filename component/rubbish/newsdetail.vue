<template>
	<view style="padding: 1rem;">
		<view>
			<u-navbar 
			            title="新闻详细"
					 :placeholder="true"
					  :border="true"
			            :autoBack="true"
			        >
			        </u-navbar>
		</view>
		
		<view>
			<view>
				<view>
					<u--text :text="data.title" size="16" :bold="true" ></u--text>
					<u--text :text="data.author" size="14" color="#909399" ></u--text>
				</view>
				<br>
				<view>
					<u--image :showLoading="true" :src="$url+data.imgUrl" width="100%" :lazy-load="true" mode="widthFix" ></u--image>
				</view>
				<br>
				<view v-html="data.content">
					
				</view>
			</view>
		</view>
	</view>
</template>
<script>

	export default {
		data() {
			return {
				data:[],
				
			}
		},
		onLoad(option) {
			this.id=option.id;
			this.getData();
			
		},
		mounted() {
			
		},
		methods: {
			getData(){
				this.$request.get('prod-api/api/garbage-classification/news/'+this.id)
				.then(res=>{
					if(res.code==200){
						this.data=res.data;
						
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

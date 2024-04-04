<template>
	<view style="padding: 1rem;background-color: #f3f4f6;">
		<view>
			<u-navbar 
			            title="垃圾示例"
					 :placeholder="true"
					  :border="true"
			            :autoBack="true"
			        >
			        </u-navbar>
		</view>
		
		<view>
			<view class="card" v-for="i in data">
				<view>
					<u--text :text="i.name" size="16" :bold="true" ></u--text>
					<u-divider></u-divider>
					<u--image :showLoading="true" :src="$url+i.imgUrl" width="100%" :lazy-load="true" mode="widthFix" ></u--image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>

	export default {
		data() {
			return {
				data:[]
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
				this.$request.get('prod-api/api/garbage-classification/garbage-example/list?type='+this.id)
				.then(res=>{
					if(res.code==200){
						this.data=res.rows;
						
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
	.card{
		 margin-bottom: 1rem;
		box-shadow: 0px 0px 2px rgba(0, 0, 0, .1);
		 border-radius: 15px;
		 background-color: #fff;
		 padding: 1rem;
	}
</style>

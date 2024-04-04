<template>
	<view>
		<view>
			<u-navbar 
			            title="捐款详细"
			          
					 :placeholder="true"
					  :border="true"
			            :autoBack="true"
			        >
			        </u-navbar>
		</view>
		<view>
			<view>
				<view v-for="i in data1" class="card">
					<u--text :text="'捐款人:'+i.userName" type="primary"></u--text>
					<u--text :text="'捐款金额'+i.donateMoney"></u--text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>

	export default {
		data() {
			return {
				data1:[]
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
				
				this.$request.get('/prod-api/api/public-welfare/donate-record/list?activityId='+this.id)
				.then(res=>{
					
					if(res.code==200){
						this.data=res.rows;
						
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
	.card{
		background-color: #fff;
		padding: 1rem;
		
	}
</style>

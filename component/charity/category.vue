<template>
	<view>
		<view>
			<u-navbar
			            :title="title"
			          
					 :placeholder="true"
					  :border="true"
			            :autoBack="true"
			        >
			        </u-navbar>
			<view>
				<view>
					<view v-for="i in commend_list" class="card" @click="goDetail(i.id)">
						<u-row justify="center" align="center">
							<u-col span="4">
								<view>
									<u--image :showLoading="true" :src="$url+i.imgUrl" width="95%" mode="aspectFill" height="80px"></u--image>
								</view>
							</u-col>
							<u-col span="8">
								<view>
									<u--text :text="i.name" :bold="true"></u--text>
									<u--text :text="i.author" color="#909399" size="12"></u--text>
									<view style="padding:.5rem 0;">
										<u--text :text="i.activityAt" color="#909399" size="12" align="end"></u--text>
										<u--text :text="i.donateCount+' 人捐款'" size="12" color="#909399" align="end"></u--text>
									</view>
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
				commend_list:[],
				id:0,
				title:''
			}
		},
		onLoad(option) {
			this.id=option.id
			this.title=option.title;
		},
		mounted() {
			this.getcommend_list()
		},
		methods: {
			goDetail(id){
				uni.navigateTo({
					url: '/component/charity/detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getcommend_list(){
				this.$request.get('prod-api/api/public-welfare/public-welfare-activity/list?typeId='+this.id)
				.then(res=>{
					if(res.code==200){
						this.commend_list=res.rows;
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
		box-shadow: 0px 0px 2px rgba(0, 0, 0, .1);
		margin-bottom: 1rem;
		padding: 1rem;
		border-radius: 15px;
		background-color: #fff;
	}
</style>

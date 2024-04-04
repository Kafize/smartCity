<template>
	<view>
		<view style="padding: 1rem;">
			<view class="">
				<view v-for="i in companyList" class="company-item" @click="goCompany(i.id)">
					<u-row>
						<u-col span="6">
							<u--text :text="i.companyName" size="18" :bold='true'></u--text>
						</u-col>
						<u-col span="6" align="end">
							<u--image :showLoading="true" src="/static/images/company.png" width="30px" height="30px" :lazy-load="true" shape="circle" mode="widthFix" ></u--image>
						</u-col>
					</u-row>
					<u-divider></u-divider>
					<u--text :text="i.introductory" lines="3"></u--text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyList:[]
			}
		},
		mounted() {
			this.getcompanyList();
		},
		methods:{
			getcompanyList(){
				this.$request.get('prod-api/api/job/company/list')
				.then(res=>{
					if(res.code==200){
						this.companyList=res.rows;
						
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				
			},
			goCompany(id){
				uni.navigateTo({
					url:'/component/job-hunting/company-detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	.company-item{
		border-radius: 10rpx;
		background-color: #fff;
		margin-top: 1rem;
		padding: 1rem;
	}
</style>

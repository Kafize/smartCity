<template>
	<view>
		 <u-navbar
		            title="公司详细"
		           :border="true"
		            :autoBack="true"
					:placeholder="true"
		        >
		        </u-navbar>
				
		<view class="page">
			<view class="company-item">
				<u-row>
					<u-col span="6">
						<u--text :text="company.companyName" size="18" :bold='true'></u--text>
					</u-col>
					<u-col span="6" align="end">
						<u--image :showLoading="true" src="/static/images/company.png" width="30px" height="30px" :lazy-load="true" shape="circle" mode="widthFix" ></u--image>
					</u-col>
				</u-row>
				<u-divider></u-divider>
				<u--text :text="company.introductory" lines="3"></u--text>
			</view>
			<view style="height: 10px;"></view>
			<view class="company-item">
				<view class="work-card" v-for="j in list">
					<u-row>
						<u-col span="6">
							<view class="tag-title">
								<u--text :text="j.professionName"size="16" ></u--text>
								
							</view>
							
						</u-col>
						<u-col span="6" align="end">
							<u--text :text="j.salary+'￥'"size="16" align="end" ></u--text>
							
						</u-col>
					</u-row>
					<u-divider></u-divider>
					<view style="padding: 1rem 0;">
						<u--text :text="j.obligation"size="16" align="center" ></u--text>
						<u--text :text="j.need"size="16" align="center" ></u--text>
					</view>
					
					<u-button type="primary" @click="send(j.id)" text="投递"></u-button>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				company:[],
				list:[]
			}
		},
		onLoad(option) {
			this.id=option.id;
			
		},
		mounted() {
			this.getDetail();
			this.getList()
		},
		methods: {
			getDetail(){
				this.$request.get('prod-api/api/job/company/'+this.id)
				.then(res=>{
					if(res.code==200){
						this.company=res.data;
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				
			},
			getList(){
				this.$request.get('prod-api/api/job/post/list?companyId='+this.id)
				.then(res=>{
					if(res.code==200){
						this.list=res.rows;
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				
			},
			send(postId){
				const ob={
				 "companyId":this.id,
				 "id":0,
				 "postId":postId,
				 "userId":0,
				 "userName":""
				 }
				this.$request.post('prod-api/api/job/deliver',ob)
				.then(res=>{
					if(res.code==200){
						uni.showToast({
							icon:'success',
							title: '投递成功'
						});
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #efefef;
	}
	.page{
		padding: 1rem;
	}
	.company-item{
		border-radius: 10rpx;
		background-color: #fff;
		
		padding: 1rem;
	}
	.tag-title{
			font-weight: 300;
			border-left: 10rpx solid #e45656;
			padding-left: 8px;
		}
</style>

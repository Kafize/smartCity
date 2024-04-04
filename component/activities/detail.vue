<template>
	<view style="background-color: #fff;padding: 1rem;">
		<u-navbar
		            title="活动详情"
				 :placeholder="true"
				  :border="true"
		            :autoBack="true">
		        </u-navbar>
		<view>
			<view >
				<view>
					<u--text  :text="data.name" :bold="true" size="18"></u--text>
					<view v-html="data.content">
						
					</view>
					<view class="" style="display: flex;padding: .5rem 0;">
						<u-icon name="heart" size="20" :label="data.likeNum" style="padding-right: 1rem;"></u-icon>
						<u-icon name="account" size="20" :label="data.signupNum"></u-icon>
					</view>
				</view>
				<view>
					<br>
					<u--text text="评论列表" class="title"></u--text>
					<br>
					<view v-for="(c,index) in common" style="margin: 1.5rem 0; ">
						<u-row gutter="8" align="top">
							<u-col span="2">
								<view >
									<u--image :src="c.avatar"
											  :radius="5" width="100%" mode="widthFix" height="auto">
											  </u--image>
								</view>
							</u-col>
							<u-col span="10">
								<view >
									<u--text
											:text="c.nickName"
											
											bold
											size="17"
									></u--text>
									<u--text margin="0 0 8px 0" :text="c.userName"
									></u--text>
									<u-rate :value="c.score" readonly></u-rate>
									<view v-html="c.content" ></view>
									<br>
									
								</view>
							</u-col>
						</u-row>
						
					<u-divider ></u-divider>
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
				data:[],
				id:0,
				common:''
			}
		},
		onLoad(option) {
			this.id=option.id
			this.getData();
			this.getCommon()
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData(){
				this.$request.get("prod-api/api/activity/activity/"+this.id)
				.then(res=>{
					if(res.code==200){
						this.data=res.data;
					}
				})
			},
			getCommon(){
				this.$request.get(`prod-api/api/activity/comment/list?activityId=${this.id}&pageNum=1&pageSize=8`)
				.then(res=>{
					if(res.code==200){
						this.common=res.rows;
					}
				})
				
			}
		}
	}
</script>

<style>
 .card{
	 padding: 1rem;
	 background-color: #fff;
	 margin-bottom: 1rem;
	 border-radius: 15px;
	 box-shadow: 0 0 5px rgba(0, 0, 0, .2);
 }
 .title{
 	font-weight: 300;
 	border-left: 10rpx solid #3c9cff;
 	padding-left: 8px;
 }
</style>

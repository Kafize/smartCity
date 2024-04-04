<template>
	<view style="background-color: #fff;">
		<u-navbar
		            title="新闻详情"
				 :placeholder="true"
				  :border="true"
		            :autoBack="true">
		        </u-navbar>
		<view style="padding: 1rem;padding-bottom: 100px;">
			<view >
				<view>
					<u--text  :text="data.title" :bold="true" size="18"></u--text>
					<view style="padding: 1rem;">
						<u--image :showLoading="true" :src="$url+data.cover" width="100%" :lazy-load="true"  mode="widthFix" ></u--image>
					</view>
					<view v-html="data.content">
						
					</view>
					<view class="" style="display: flex;padding: .5rem 0;">
						<u-icon name="heart" size="20" :label="data.likeNum" style="padding-right: 1rem;"></u-icon>
						<u-icon name="account" size="20" :label="data.readNum"></u-icon>
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
									<u--image :src="'/static/images/avatar/avatar'+(index%4+1)+'.png'"
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
		<view class="common-input">
			<view style="padding: 1rem;">
				<u-row gutter="10">
					<u-col span="8">
						<u--input
						    placeholder="请输入内容"
						    border="bottom"
						    v-model="commonvalue"
						  ></u--input>
					</u-col>
					<u-col span="4">
						<u-button type="primary"   :hairline="true" text="评论" @click="savecommon"></u-button>
					</u-col>
				</u-row>
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
				common:'',
				commonvalue:''
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
				this.$request.get("/prod-api/api/living/press/press/"+this.id)
				.then(res=>{
					if(res.code==200){
						this.data=res.data;
					}
				})
			},
			getCommon(){
				this.$request.get(`prod-api/api/living/press/comments/list?newsId=${this.id}&pageNum=1&pageSize=8`)
				.then(res=>{
					if(res.code==200){
						this.common=res.rows;
					}
				})
				
			},
			savecommon(){
				 const ob={
					 "newsId":this.id,
					 "content":this.commonvalue
				 }
				this.$request.post(`prod-api/api/living/press/pressComment`,{...ob})
				.then(res=>{
					if(res.code==200){
						uni.showToast({
							icon:'success',
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
 .common-input{
	 position: fixed;
	 background-color: #f3f4f6;
	 width: 100%;
	bottom: 0;
	
 }
</style>

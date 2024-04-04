<template>
	<view>
		<u-navbar bgColor="#fff"
		            title="新闻详细"
		            :autoBack="true"
					:placeholder="true"
					:border="true"
		        >
		        </u-navbar>
		<view>
			<view>
				<view style="padding-bottom: 1rem;">
					<view class="notice-item" >
						<view >
							<view>
								<u--text :text="newsDetail.title" :bold="true" size="18"></u--text>
							</view>
							<br>
							<view>
								<u--image :showLoading="true" :src="$url+newsDetail.cover"  radius="5" :lazy-load="true" width="100%" mode="aspectFill" ></u--image>
							</view>
							<br>
							<view>
								<view v-html="newsDetail.content"  >
								</view>
							</view>
							<br>
							
							
						</view>
						<br>
						<view>
							<u-row >
								<u-col span="4" style="align-items: center;">
									<u-icon name="share-square"  size="24" :label="(newsDetail.readNum*0.1).toFixed(0)"></u-icon>
								</u-col>
								<u-col span="4" style="align-items: center;">
									<u-icon name="chat" size="24" :label="newsDetail.commentNum"></u-icon>
								</u-col>
								<u-col span="4" style="align-items: center;" @click="NewsLike()">
									<u-icon :name="newsDetail.remark?'thumb-up-fill':'thumb-up'" :color="newsDetail.remark?'#e45656':'#606266'" size="24" :label="newsDetail.likeNum"></u-icon>
								</u-col>
							</u-row>
						</view>
					</view>
					<view>
						
						<view style="padding: 1.5rem;">
							<u-skeleton
								     rows="10"
									:loading="commonLoading"
									avatar
									
									style="margin-top: 1rem;"
									:title="false"
								></u-skeleton>
							<u--text text="评论列表" bold size="18"></u--text>
							<view v-for="(c,index) in newsCommon" style="margin: 1.5rem 0; ">
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
											
											<u--text margin="0 0 8px 0" :text="c.userName"
											></u--text>
											
											<view v-html="c.content" ></view>
											<br>
											<u-row justify="space-between">
												<u-col span="6">
													<u--text :text="c.commentDate"></u--text>
												</u-col>
												<u-col span="3" justify="between" textAlign="right">
													<u-icon @click="commonLike(c.id,index)"  :name="c.remark?'thumb-up-fill':'thumb-up'" color="#e45656" size="28" :label="c.likeNum"></u-icon>
												</u-col>
											</u-row>
										</view>
									</u-col>
								</u-row>
								
							<u-divider ></u-divider>
							</view>
							<view>
								<u--text text="发表评论" class="movie-detail-title" size="18" :bold="true" margin="1rem 0"  ></u--text>
								<u--textarea  placeholder="请输入内容" v-model="commonContent"></u--textarea>
								<br>
								<br>
								<u-button type="primary" @click="submitCommon()">发送评论</u-button>
								</u-row>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:undefined,
				newsDetail:{},
				newsCommon:[],
				commonContent:'',
				commonLoading:true
			}
		},
		onLoad(options) {
			this.id=options.id
			
		},
		mounted() {
			this.getNewsDetail(),
			this.getComment()
		},
		methods: {
			getNewsDetail(){
				this.$request.get('prod-api/api/park/press/comments/list/'+this.id)
				.then(res=>{
					this.newsDetail=res.data;
				})
			},
			NewsLike(){
				if(this.newsDetail.remark=true){
					return false;
				}
				this.$request.put('/prod-api/api/park/press/press/like/'+this.id)
				.then(res=>{
					if(res.code==200){
						this.newsDetail.remark=true
						this.newsDetail.likeNum+=1
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			getComment(){
				this.$request.get('prod-api/api/park/press/comments/list?newsId='+this.id)
				.then(res=>{
					if(res.code==200){
						this.newsCommon=res.rows
						this.commonLoading=false
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			commonLike(id,index){
				this.$request.put('/prod-api/api/park/press/pressComment/like'+id)
				.then(res=>{
					if(res.code==200){
						this.newsCommon[index]['likeNum']+=1;
						this.newsCommon[index]['remark']=true
						this.$refs.uToast.show({
							icon:"success",
							message:"点赞成功！",
							type:'success'
						})
					}else{
						this.$refs.uToast.show({
							icon:"error",
							message:res.msg,
							type:'error'
						})
					}
				})
			},
			submitCommon(){
				this.$request.post('/prod-api/api/park/press/pressComment',{"content":this.commonContent,'newsId':this.id})
				.then(res=>{
					this.commonContent='';
					if(res.code==200){
						this.$refs.uToast.show({
							icon:"success",
							message:"评论成功！",
							type:'success'
						})
						this.getCommon();
					}else{
						this.$refs.uToast.show({
							icon:"error",
							message:"评论失败",
							type:'error'
						})
					}			
				})
			}
		}
	}
</script>

<style lang="scss">
	.notice-item{
		padding: 1rem;
		margin: 1rem 0;
		background-color: #fff;
		border-radius: 10rpx;
		.text-overflow{
			margin: .5rem 0;
			 overflow: hidden;
			  display: -webkit-box;
			  -webkit-line-clamp: 2; /* 设置最大显示行数 */
			  -webkit-box-orient: vertical;
		}
	}
</style>

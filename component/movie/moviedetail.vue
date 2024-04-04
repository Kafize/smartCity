<template>
	<view class="movie-detail-container">
		
		<u-navbar bgColor="#181d30"
		            title="电影详细"
		           leftIconColor="#fff"
				   :titleStyle="{'color':'#fff'}" 
				  
		            :autoBack="true"
		        >
		        </u-navbar>
		<view style="padding: 1rem;">
			<u-row   align="top" gutter="10" class="movie-item" >
				<u-col span="4">
					<u--image :src="$url+movieDetail.cover" :lazy-load="true" shape="square" width="100%" :height="155" mode="aspectFill"  ></u--image>
				</u-col>
				<u-col span="8">
					<view>
						<u--text  :text="movieDetail.name" color="#fff" :bold="true" :size="18" margin=".1rem 0 .5rem 0"></u--text>
					</view>
					<u--text color="#9098a3" :text="'片长：'+movieDetail.duration+'分钟'" margin=".1rem 0"></u--text>
					<u--text  color="#9098a3" :text="'上映时间：'+movieDetail.playDate" margin=".1rem 0"></u--text>
					<u--text  color="#9098a3" :text="'语言：'+movieDetail.language" margin=".1rem 0"></u--text>
					<u--text  color="#9098a3" :text="'评分：'+(movieDetail.score)+'.0'" margin=".1rem 0"></u--text>
					<u--text  color="#9098a3" :text="'喜欢：'+(movieDetail.favoriteNum/10000).toFixed(1)+'w'"></u--text>
				</u-col>
			</u-row>
			<view>
				<u--text  text="简要介绍" size="18" margin="1rem 0" :bold="true" color="#fff" class="movie-detail-title"></u--text>
				<view class="movie-introduce" v-html="movieDetail.introduction"></view>
			</view>
			<view>
				<u-toast ref="uToast"></u-toast>
				<view style="padding: 1rem;">
					<u-row gutter="10">
						<u-col span="6">
							<u-button :icon="wantSee?'heart-fill':'heart'" :disabled="wantSee" iconColor="#e45656" @click="getWantSee()">想看</u-button>
						</u-col>
						<u-col span="6">
							<u-button :icon="seenIt?'star-fill':'star'" :disabled="seenIt" iconColor="#e45656" @click="getSeeIt()">看过</u-button>
						</u-col>
					</u-row>
				</view>
			
			</view>
		</view>
		<view class="common-container">
			<u--text text="评论列表" class="movie-detail-title" size="18" :bold="true" margin="1rem 0"  ></u--text>
			<u-row gutter="10">
				<u-col span="3">
					<u-action-sheet :actions="rateList" :closeOnClickOverlay="true" :closeOnClickAction="true"  title="筛选评分" :show="rateShow" @close="rateShow=false" @select="(t)=>(rateNumber=t.name,getCommon())"></u-action-sheet>
					<u-tag :text="'评分 >:'+rateNumber" type="error"    @click="rateShow=true"></u-tag>
				</u-col>
				<u-col span="3">
					<u-action-sheet :actions="rateList" :closeOnClickOverlay="true" :closeOnClickAction="true"  title="筛选页数" :show="pageShow" @close="pageShow=false" @select="(t)=>(pageNumber=t.name,getCommon())"></u-action-sheet>
					<u-tag :text="'页数 >:'+pageNumber"   type="warning"  @click="pageShow=true" ></u-tag>
				</u-col>
			</u-row>
			<view >
				<u-skeleton
					     rows="10"
						:loading="commonLoading"
						avatar
						:title="false"
					></u-skeleton>
					<view v-if="!commonLoading">
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
										<u-row justify="space-between">
											<u-col span="6">
												<u--text :text="c.commentDate"></u--text>
											</u-col>
											<u-col span="3" justify="between" textAlign="right">
												<u-icon @click="Like(c.id,index)"  :name="c.remark?'thumb-up-fill':'thumb-up'" color="#e45656" size="28" :label="c.likeNum"></u-icon>
											</u-col>
										</u-row>
									</view>
								</u-col>
							</u-row>
							
						<u-divider ></u-divider>
						</view>
					</view>
				<view>
					<u--text text="发表评论" class="movie-detail-title" size="18" :bold="true" margin="1rem 0"  ></u--text>
					<u--textarea  placeholder="请输入内容" v-model="commonContent"></u--textarea>
					<br>
					
					<view>
						<u--text text="评分:" :bold="true" margin="5rpx 0"></u--text>
						<u-rate :value="commonRate" ></u-rate>
					</view>
					<br>
					<u-button type="primary" @click="submitCommon()">发送评论</u-button>
					</u-row>
				</view>
			</view>
			
		</view>
		<u-back-top :scroll-top="scrollTop" :iconStyle="{'color':'#fff'}" :customStyle="{'background-color':'#2979ff'}"></u-back-top>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				movieDetail:{},
				id:0,
				rateList:[
					{
						name:'1',
						
					},
					{
						name:'2',
						
					},
					{
						name:'3'
					},
					{
						name:'4'
					},
					{
						name:'5',
						
					}
				],
				rateNumber:1,
				pageNumber:1,
				rateShow: false,
				pageShow:false,
				/* 想看 */
				wantSee:false,
				seenIt:false,
				common:[],
				commonContent:'',
				commonLoading:true,
				commonRate:2,
				isLike:false,
				scrollTop: 0
			}
		},
		onLoad(option) {
			this.id=option.id;
			this.getMovieDetail()
			this.getCommon()
		},
		methods: {
			onPageScroll(e) {
					this.scrollTop = e.scrollTop;
				},
			getMovieDetail(){
				this.$request.get('prod-api/api/movie/film/detail/'+this.id)
				.then(res=>{
					if(res.code==200){
						this.movieDetail=res.data;
						
					}else{
						
					}
				})
				
			},
			getCommon(){
				this.commonLoading=true;
				this.$request.get(`prod-api/api/movie/film/comment/list?movieId=${this.id}&score=${this.rateNumber}&pageNum=${this.pageNumber}&pageSize=50`)
				.then(res=>{
					this.common=res.rows
					this.commonLoading=false
				})
			},
			getWantSee(){
				this.$request.post('prod-api/api/movie/film/like/'+this.id)
				.then(res=>{
					if(res.code==200){
						this.wantSee=true
						this.$refs.uToast.show({
							icon:"success",
							message:"想看成功",
							type:'success'
						})
					}else{
						this.$refs.uToast.show({
							icon:"error",
							message:"想看失败",
							type:'error'
						})
					}
				})
			},
			getSeeIt(){
				this.$request.post('prod-api/api/movie/film/favorite/'+this.id)
				.then(res=>{
					if(res.code==200){
						this.seenIt=true;
						this.$refs.uToast.show({
							icon:"success",
							message:"看过成功",
							type:'success'
						})
					}else{
						this.$refs.uToast.show({
							icon:"error",
							message:"看过失败",
							type:'error'
						})
					}
				})
			},
			Like(id,index){
				this.$request.post('/prod-api/api/movie/film/comment/like/'+id)
				.then(res=>{
					if(res.code==200){
						this.common[index]['likeNum']+=1;
						this.common[index]['remark']=true
						this.$refs.uToast.show({
							icon:"success",
							message:"点赞成功！",
							type:'success'
						})
					}else{
						this.$refs.uToast.show({
							icon:"error",
							message:"点赞失败",
							type:'error'
						})
					}
				})
			},
			submitCommon(){
				this.$request.post('prod-api/api/movie/film/comment',{"content":this.commonContent,'movieId':this.id,'score':this.commonRate})
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
	.movie-detail-container{
		background-color: #181d30;
		.movie-item{
			margin-top: 44rpx;
			padding: 5rem 0 0 0;
		}
		.movie-introduce {
			color: #fff!important;
			p{
				text-indent: 2em!important;
				color: #fff!important;
			}
			span{
				
				color: #fff!important;
			}
		}
		.movie-detail-title{
			font-weight: 300;
			
			border-left: 10rpx solid #909399;
			padding-left: 8px;

		}
		.common-container{
			background-color: #fff;
			border-radius: 10px;
			padding: 1rem;
		}
		
	}
	
</style>

<template>
	<view style="padding: 1rem;">
		<view>
			<u-swiper :list="swiper"
					
					indicator
					
					            indicatorMode="line"
					            circular
			        bgColor="#ffffff"></u-swiper>
		</view>
		<view class="card">
			<u-grid :col="4">
				<u-grid-item v-for="c in category_list" @click="go_category_detail(c.id)">
					<u-icon :name="$url+c.imgUrl" :label="c.liveName" labelPos="bottom" size="24" labelSize="12"></u-icon>
				</u-grid-item>
			</u-grid>
		</view>
		<view>
			<view style="padding: .5rem 0;">
				<u-subsection :list="u_subsection.list" :current="u_subsection.current" activeColor="#e45656" @change="sectionChange"></u-subsection>
			</view>
			<view class="card">
				<u--text text="新闻列表" class="title" :bold="true"></u--text>
			</view>
			<view>
				<view class="card" v-for="i in activity_list" @click="godetail(i.id)">
					<u-row gutter="10">
						<u-col span="9">
							<view>
								<u--text :text="i.title" :bold="true"></u--text>
							</view>
							<view class="" style="display: flex;padding: .5rem 0;">
								<u-icon name="heart" size="18" labelSize="14" :label="i.likeNum" ></u-icon>
								<u-icon name="account" size="18" labelSize="14" :label="i.readNum" style="padding: 1rem;"></u-icon>
								<u-icon name="chat" size="18" labelSize="14" :label="i.commentNum"></u-icon>
							</view>
						</u-col>
						<u-col span="3">
							<u--image :showLoading="true" :src="$url+i.cover" width="100%" height="auto" :lazy-load="true"  mode="widthFix"></u--image>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper:[],
				u_subsection:{
					list:[],
					current:0
				},
				activity_list:[],
				category_list:[],
				
			}
		},
		async mounted() {
			this.getImages();
			this.get_category_list()
			await this.get_u_subsection();
			 this.get_activity_list(0)
			
		},
		methods: {
			getImages(){
				
				this.$request.get("prod-api/api/living/rotation/list")
				.then(res=>{
					if(res.code==200){
					
						res.rows.forEach(i=>{
							this.swiper.push(this.$url+i.advImg)
						})
					}
					
				})
			},
			get_activity_list(index){
				 this.$request.get("prod-api/api/living/press/press/list?type="+this.u_subsection.list[index].id)
				.then(res=>{
					if(res.code==200){
						this.activity_list=res.rows;
					}
				})
			},
			 async get_u_subsection(){
				 await this.$request.get("prod-api/api/living/press/category/list")
				.then(res=>{
					if(res.code==200){
						this.u_subsection.list=res.data;
						
					}
				})
			},
			sectionChange(index){
				this.u_subsection.current=index;
				this.get_activity_list(index)
				// this.getHouse(index)
			},
			godetail(id){
				uni.navigateTo({
					url: '/component/livingment/detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			get_category_list(){
				this.$request.get("prod-api/api/living/category/list")
				.then(res=>{
					if(res.code==200){
						this.category_list=res.data;
					}
				})
			},
			go_category_detail(id){
				uni.navigateTo({
					url: '/component/livingment/category_detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
.card{
	padding: 1rem;
	background-color: #fff;
	margin: .5rem 0;
}
 .title{
 	font-weight: 300;
 	border-left: 10rpx solid #3c9cff;
 	padding-left: 8px;
 }
</style>

<template>
	<view style="padding: 1rem 0;">
		<view>
			<u-swiper :list="swiper"
					previousMargin="30"
					nextMargin="30"
					indicator
					indicatorMode="line"
					circular
			       ></u-swiper>
		</view>
		<view>
			<view style="padding: .5rem 0;">
				<u-subsection :list="u_subsection.list" :current="u_subsection.current" activeColor="#e45656" @change="sectionChange"></u-subsection>
			</view>
			<view>
				<view class="card" v-for="i in activity_list" @click="godetail(i.id)">
					<u-row gutter="10">
						<u-col span="9">
							<view>
								<u--text :text="i.name" :bold="true"></u--text>
							</view>
							<view class="" style="display: flex;padding: .5rem 0;">
								<u-icon name="heart" size="20" :label="i.likeNum" style="padding-right: 1rem;"></u-icon>
								<u-icon name="account" size="20" :label="i.signupNum"></u-icon>
							</view>
						</u-col>
						<u-col span="3">
							<u--image :showLoading="true" :src="$url+i.imgUrl" width="100%" height="auto" :lazy-load="true"  mode="widthFix"></u--image>
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
				activity_list:[]
			}
		},
		 async mounted() {
			this.getImages();
			await this.get_u_subsection();
			 this.get_activity_list(0)
		},
		methods: {
			getImages(){
				this.$request.get("prod-api/api/activity/rotation/list")
				.then(res=>{
					if(res.code==200){
						res.rows.forEach(i=>{
							this.swiper.push(this.$url+i.advImg)
						})
					}
					
				})
			},
			 get_activity_list(index){
				 this.$request.get("prod-api/api/activity/activity/list?categoryId="+this.u_subsection.list[index].id)
				.then(res=>{
					if(res.code==200){
						this.activity_list=res.rows;
					}
				})
			},
			 async get_u_subsection(){
				 await this.$request.get("prod-api/api/activity/category/list")
				.then(res=>{
					if(res.code==200){
						this.u_subsection.list=res.data;
						
					}
				})
			},
			godetail(id){
				uni.navigateTo({
					url: '/component/activities/detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			sectionChange(index){
				this.u_subsection.current=index;
				this.get_activity_list(index)
				// this.getHouse(index)
			}
		}
	}
</script>

<style >
.card{
	padding: 1rem;
	background-color: #fff;
	margin: .5rem 0;
}
</style>

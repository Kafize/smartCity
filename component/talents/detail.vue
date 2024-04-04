<template>
	<view style="background-color: #f3f4f6;padding: 1rem;">
		<view>
			<u-navbar 
			            title="区域详细"
					 :placeholder="true"
					  :border="true"
			            :autoBack="true"
			        >
			        </u-navbar>
		</view>
		<view>
			<view>
				<view class="card" >
					<view>
						<image :src="$url+detail.imgUrl"  style="border-radius: 15px 15px 0 0;width: 100%;"></image>
					</view>
					<view class="content" style="padding: 1rem;">
						<view>
							<u--text :text="detail.name" size="18" :bold="true" ></u--text>
						</view>
						<view>
							<u--text :text="detail.introduce" size="12" ></u--text>
						</view>
					</view>
				</view>
				<view>
					<view class="card" v-for="(i,index) in data" style="padding: .5rem;" @click="goDetail(i.id)">
						<u--text :text="i.title" size="14" :bold="true" ></u--text>
						<u--text :text="i.author" size="12" ></u--text>
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
				detail:[],
				data:[]
			}
		},
		onLoad(option) {
			this.id=option.id;
			this.getData();
			this.getDetail()
		},
		mounted() {
			
		},
		methods: {
			getDetail(){
				this.$request.get('/prod-api/api/youth-inn/talent-policy-area/'+this.id)
				.then(res=>{
					if(res.code==200){
						this.detail=res.data;
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
			},
			getData(){
				this.$request.get('prod-api/api/youth-inn/talent-policy/list?areaId='+this.id)
				.then(res=>{
					if(res.code==200){
						this.data=res.data;
						
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						});
					}
				})
				
				
			},
			goDetail(id){
				uni.navigateTo({
					url: '/component/talents/specific?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
	.card{
		 margin-bottom: 1rem;
		box-shadow: 0px 0px 2px rgba(0, 0, 0, .1);
		 border-radius: 15px;
		 background-color: #fff;
	}
</style>

<template>
	<view style="padding: 1rem;">
		<view>
			<u-navbar bgColor="#fff"
			            title="我的积分"
			            :autoBack="true"
						:placeholder="true"
						:border="true"
			        >
					<view
					              
					                slot="right"
									@click="upopupShow=true"
					            >
					                <u--text text="排行榜"></u--text>
					            </view>
			        </u-navbar>
		</view>
		<view>
			<view v-for="p in product" class="notice-item" @click="modalShow=true,productid=p.id">
				<view>
					<view>
						<u--image :showLoading="true" width="100%" src="/static/images/cheer.png"  height="auto" :lazy-load="true"  mode="widthFix" ></u--image>
					</view>
				</view>
				<u-divider></u-divider>
				<view>
					<u-row justify="space-between" align="center">
						<view>
							<u--text :text="p.name" :size="16" bold></u--text>
						</view>
						<view>
							<u--text :text="p.score+'积分'" :size="14"  color="#909193" ></u--text>
						</view>
					</u-row>
				</view>
			</view>
		</view>
		<u-popup :show="upopupShow" @close="upopupShow=false" @open="upopupShow=true"  round="35rpx" >
			<scroll-view scroll-y="false" style="height: 1100rpx;">
				<view>
					<view class="" style="padding: 1rem;" >
						<u--text text="排行榜"  bold align="center"></u--text>
						<u-divider></u-divider>
						<view v-for="c in charts" style="padding: 1rem;">
							<u-row gutter="10">
								<u-col span="2">
									<u--image :showLoading="true" :src="$url+c.avatar"  width="45px" height="45px" shape="circle"  :lazy-load="true"  mode="aspectFill"></u--image>
								</u-col>
								<u-col span="10">
									<u--text :text="c.nickName"></u--text>
									<u--text :text="c.score+'积分'" :size="14"  color="#909193" ></u--text>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
			</scroll-view>
		</u-popup>
		<u-modal :show="modalShow" @confirm="getPayment()" @cancel="modalShow=false" title="是否确认换购" :showCancelButton="true" :asyncClose="true"></u-modal>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				product:[],
				modalShow:false,
				productid:0,
				charts:[],
				upopupShow:false,
			}
		},
		mounted() {
			this.getProduct();
			this.getCharts();
		},
		methods: {
			getProduct(){
				this.$request.get('prod-api/api/park/product/list')
				.then(res=>{
					if(res.code==200){
						this.product=res.rows;
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			getPayment(){
				this.$request.post('prod-api/api/park/score/consume/'+this.productid)
				.then(res=>{
					if(res.code==200){
						uni.$u.toast('换购成功')
						this.modalShow=false;

					}else{
						uni.$u.toast(res.msg)
					}
				})
				
			},
			getCharts(){
				this.$request.get('prod-api/api/park/score/top/list?pageSize=20&pageNum=1')
				.then(res=>{
					if(res.code==200){
						
						this.charts=res.rows;
				
					}else{
						uni.$u.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $u-bg-color;
	}
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

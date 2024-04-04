<template>
	<view style="padding: 1rem;">
		<view>
			<view>
				<u-navbar bgColor="#fff"
				            title="停车场"
				            :autoBack="true"
							:placeholder="true"
							:border="true"
				        >
				        </u-navbar>
			</view>
		</view>
		<view>
			<view v-for="p in ParkingLot" class="notice-item">
				<u-row gutter="10" justify="start" align="start">
					<u-col span="5">
						<view>
							<u--image :showLoading="true" width="100%" src="/static/images/stop.jpeg" height="auto"  :lazy-load="true"  mode="widthFix" ></u--image>
						</view>
					</u-col>
					<u-col span="7">
						<view>
							<view>
								<u--text :text="p.address" :size="16" bold></u--text>
							</view>
							<view>
								<u--text :text="p.parkName" color="#909193" size="12"></u--text>
								<u--text :text="'距离你'+p.distance+'m'" size="12" color="#909193"></u--text>
							</view>
							<u-row>
								<u--text :text="'剩余'+p.vacancy+'个空位'" color="#909193" size="12"></u--text>
								<u--text :text="p.rates+'￥'" size="14" color="#e45656"></u--text>
							</u-row>
						</view>
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
				ParkingLot:[]
			}
		},
		mounted() {
			this.getParking();
		},
		methods: {
			getParking(){
				this.$request.get('prod-api/api/park/lot/list')
				.then(res=>{
					if(res.code==200){
						this.ParkingLot=res.rows;
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
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

<template>
	<view>
		<u-row v-for="(item) in shopArray" gutter="10" justify="top" class="takeaway-item" @click="goShopdetail(item.id)">
			<u-col span="4">
				<view>
					<u--image  :src="$url+item.imgUrl" width="100%" mode="aspectFill" radius="5px" height="110px" ></u--image>
				</view>
			</u-col>
			<u-col span="8">
				<view>
					<u--text :text="item.name" :bold="true" lines="1"></u--text>
					<view class="takeaway-article">
						<view class="takeaway-article-flex">
							<view>
								<span class="rate-font">{{item.score}}</span>
								<small class="rate-font" style="font-size: .7rem;">分</small>
							</view>
							<view>
								<span class="tag-error">{{item.recommend=="Y"?'推荐':"不推荐"}}</span>
							</view>
							<view>
								<span>{{'月销'+item.saleQuantity+"+"}}</span>
							</view>
							<view>
								<span>{{'人均'+item.avgCost+'￥'}}</span>
							</view>
						</view>
						
					</view>
					<view class="takeaway-article">
						<view class="takeaway-article-flex">
							<view>		
								<span>{{'配送约'+item.deliveryTime+'分钟'}}</span>
							</view>
							<view>
								<span>{{item.distance>1000?item.distance/1000+'km':item.distance+"m"}}</span>
							</view>
						</view>
						<view style="padding: .2rem 0;"><span>{{item.address}}</span></view>
					</view>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		props: {
		    shopArray: Array
		  },
		data() {
			return {
				
			}
		},
		methods: {
			goShopdetail(id){
				
				uni.navigateTo({
					url: '/component/takeaway/shopdetail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style lang="scss">
	@import url("../index.css");
</style>

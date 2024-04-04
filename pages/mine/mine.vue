<template>
	<view>
		<view>
			<view>
				<view style="" class="Overlay">
					<view></view>
					<u-image  :src="'https://img.touxiangwu.com/zb_users/upload/2022/12/202212191671413690400393.jpg'" width="100%" height="400px" ></u-image>
				</view>
				<view class="card" style="margin-top: 325px;">
					<view class="flex">
						<view>
							<u--text :text="info.userName" :bold="true" size="18" color="#303133"></u--text>
						</view>
						<u-icon name="integral" color="#e45656" size="28"></u-icon>
					</view>
					<view class="flex">
						<u-tag text="营养快线"  size="mini" type="primary"></u-tag>
						<view style="padding: 0 .3rem ;">
							<u-tag text="践行者"  size="mini" type="error"></u-tag>
						</view>
						<view>
							<u-tag text="KTiTiT"  size="mini" type="warning">
							</u-tag>
						</view>
						
						
					</view>
					<br>
					<view>
						<u-swiper :list="swiper"  indicatorMode="line"   
						      interval='5000'
						        circular
						        :autoplay="true"
						        radius="5"
								showTitle
								
						       ></u-swiper>
					</view>
					<br>
					<u-cell-group :border="false">
						<u-cell icon="gift" title="福利" url="/pages/logout/logout" :isLink="true" :border="false"></u-cell>	
						<u-cell icon="question-circle" title="问题反馈" url="/pages/feedback/feedback" :isLink="true" :border="false"></u-cell>	
						<u-cell icon="setting" title="个人设置"  :isLink="true"   url="/pages/setting/setting" :border="false"></u-cell>
					</u-cell-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:[],
				swiper:[
					'https://i1.hdslb.com/bfs/sycp/creative_img/202403/0d0d54d929d5320f6790e99610862d05.jpg@976w_550h_1c_!web-home-carousel-cover.jpg',
				'https://i1.hdslb.com/bfs/banner/a74786b7890ebdccb7ff642a6c7a7185b000b288.jpg@976w_550h_1c_!web-home-carousel-cover.jpg',
				'https://i1.hdslb.com/bfs/sycp/creative_img/202403/6b773cf905b4d5ed06291237b743b3a7.jpg@976w_550h_1c_!web-home-carousel-cover.jpg',
				'https://i1.hdslb.com/bfs/banner/3cf4be2d95821a8e0ef4721e09626ec61a235966.jpg@976w_550h_1c_!web-home-carousel-cover.jpg'
				]
			}
		},
		mounted() {
			this.getInfo()
			// this.getImages()
		},
		methods: {
			getInfo(){
				this.$request.get("prod-api/api/common/user/getInfo")
				.then(res=>{
					if(res.code==200){
						this.info=res.user;
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.Overlay{
		position: absolute;
		width: 100%;
		height: 400px;
		top: 0;
		view{
			background-color: #000;
			opacity: .8;
			height: 100%;
			position: absolute;
			width: 100%;
			z-index: 1;	
		}
		
	}
	.flex{
		display: flex;
	}
	.card{
		padding: 1rem;
		background-color: #fff;
		border-radius: 15px;
		z-index: 100;
		position: relative;	
	}
</style>

<template >
	<view>
		
		 <u-navbar style="z-index: 3;" :bgColor="scrollTop<45?'transparent':'#f4f4f5'"
		            :title="scrollTop<45?'':shopDetail.name"  
		           :leftIconColor="scrollTop<45?'#fff':'#000'"
		            :autoBack="true"
					:border="scrollTop>45"
		        >
				<view
				                class="u-nav-slot"
				                slot="right"
								@click="isCollect?cancalCollect():addCollect()"
				            >
				              
				                
				                <u-icon
								:color="scrollTop<45?'#fff':isCollect?'#f1a532':'#000'"
				                    :name="isCollect?'star-fill':'star'"
				                    size="22"
				                ></u-icon>
				            </view>
				 </u-navbar>
		
		   <!-- 页面内容 -->  
		   
		   <view  class="shop-detail-container">
		   	<view class=" " style="margin: 1rem;">
		   		<view>
		   			<u--text :text="shopDetail.name" size="22" :bold="true">
		   			</u--text>
		   			<view class="takeaway-article">
		   				<view class="takeaway-article-flex">
		   					<view>
		   						<span class="rate-font">{{shopDetail.score}}</span>
		   						<small class="rate-font" style="font-size: .7rem;">分</small>
		   					</view>
		   					<view>
		   						<span>{{'月销'+shopDetail.saleQuantity+"+"}}</span>
		   					</view>
		   					<view>
		   						<span>{{'人均'+shopDetail.avgCost+'￥'}}</span>
		   					</view>
		   					<view>
		   						<span>{{'配送约'+shopDetail.deliveryTime+'分钟'}}</span>
		   					</view>
		   					<view>
		   						<span>{{shopDetail.distance>1000?shopDetail.distance/1000+'km':shopDetail.distance+"m"}}</span>
		   					</view>
		   				</view>
		   			</view>
		   			<view>
		   				<u--text :text="shopDetail.introduction" size="12" color="#606266"></u--text>
		   			</view>
		   			<view>
		   				<view style="padding-bottom: 80rpx;">
		   					<u-row v-for="(item) in food" gutter="10" justify="top" class="takeaway-item" @click="">
		   						<u-col span="4">
		   							<view>
		   								<u--image  :src="$url+item.imgUrl" width="100%" mode="aspectFill" radius="5px" height="110px" ></u--image>
		   							</view>
		   						</u-col>
		   						<u-col span="8">
		   							<view>
		   								<u--text :text="item.name" color="#303133"  :bold="true" lines="1"></u--text>
		   								<view class="takeaway-article">
		   									<view class="takeaway-article-flex">
		   										<view>
		   											<span>{{'月销'+item.saleQuantity+"+"}}</span>
		   										</view>
		   										<view>
		   											<span>{{"%"+item.favorRate+"好评"}}</span>
		   										</view>
		   									</view>
		   									
		   								</view>
		   								<view>
		   									<u--text :text="item.detail" size="12" color="#909399"></u--text>
		   								</view>
		   								<br>
		   								<u-row justify="space-between" gutter="10">
		   									<u-col span="3" class="money-font">
		   										<view>
		   											<small style="font-size: .8rem;">￥</small>
		   											<span>{{item.price}}</span>
		   										</view>
		   									</u-col>
		   									<u-col span="4" style="align-items: flex-end;">
		   										<u-row gutter="10">
		   											<view class="add-button minus-button" style="background-color: #fff;" v-show="item.remark" @click="totalPrice-=item.price,item.remark-=1">
		   												<u--text text="➖" size="10" align="center" color="#000" ></u--text>
		   											</view>
		   											<view v-show="item.remark" style="padding: 0 .5rem;">
		   												<u--text :text="item.remark"></u--text>
		   											</view>
		   											<view class="add-button" @click="totalPrice+=item.price,item.remark==null||!isNaN(item.remark)?item.remark+=1:'0'" >
		   												<u--text text="➕" size="10" align="center" color="#000" ></u--text>
		   											</view>
		   										</u-row>
		   										
		   									</u-col>
		   								</u-row>
		   								
		   							</view>
		   						</u-col>
		   					</u-row>
		   				</view>
		   			</view>
		   		</view>
		   	</view>
		   </view>
		
		<view style="" class="Overlay">
			<view></view>
			<u-image :src="$url+shopDetail.imgUrl" width="100%" height="130px" ></u-image>
		</view>

		<view style="display: flex;justify-content: center;">
			<u-row class="tabbar">
				<u-col span="2"></u-col>
				<u-col span="6">
					<view>
						<small style="font-size: .8rem;">￥</small>
						<span>{{totalPrice.toFixed(2)}}</span>
					</view>
					<view>
						<span style="font-size: .8rem;">预计另需2.0元配送费</span>
					</view>
				</u-col>
				<u-col span="4" class="bg-yellow" justify="center" textAlign="center" @click="goPay()">
					
					<view >
						<span>{{upopupShow?"立即支付":"去结算"}}</span>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-popup :show="addressShow" :closeOnClickOverlay="false"  :overlayStyle="{'z-index':'10088'}" @close="addressShow=false" @open="addressShow=true"  round="35rpx" z-index="10089">
			<view class="address-popup">
				<u--text text="选择地址" size="20" ></u--text>
				<br>
				<view style="height: 650rpx;overflow: auto;">
					<view style="margin-bottom: .5rem;" class="border-yellow" :class="{'border-white':addressListIndex!=index}" @click="addressListIndex=index"  v-for="(item,index) in addressList">
						<view >
							<u-row  justify="end" align="center">
								<u-col span="12">
									<p style="font-size: .9rem;padding-bottom: 10rpx;">{{item.label+' '+item.name+' '+item.phone}}<p/>
									<p>{{item.addressDetail}}</p>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
				<br>
				<view >
					<u-button   text="确认地址" @click="address=addressList[addressListIndex],addressShow=false" type="warning" plain style="margin-bottom: .5rem;"></u-button>
					<u-button   text="添加地址" @click="goAddAddress()"  type="warning" ></u-button>
				</view>
			</view>
		</u-popup>
		<u-popup :show="upopupShow" @close="upopupShow=false" @open="upopupShow=true" zIndex="10070" round="35rpx" >
				<view class="u-popup-container" >
					<view  class="u-popup-fixed">
						<view style="margin: 1rem;">
							<view @click="addressShow=true">
								<u-row  justify="end" align="center">
									<u-col span="8">
										<u--text :text="address.addressDetail" size="20"></u--text>
										<u--text :text="address.label+' '+address.name+' '+address.phone" color="#212526" size="12"></u--text>
									</u-col>
									<u-col span="4" justify="end" textAlign="right" style="align-items: flex-end;">
										<u-icon name="arrow-right" color="#212526" size="12" ></u-icon>
									</u-col>
								</u-row>
							</view>
							<br>
							<view>
								<view style="margin-bottom: .5rem;" class="border-yellow" :class="{'border-white':deliverySwitch}" @click="deliverySwitch=false">
									<span style="padding-right: 1rem;">立即配送</span>
									<span>预计{{timAfter(shopDetail.deliveryTime)}}后送达</span>
								</view>
								<view class="border-yellow" :class="{'border-white':!deliverySwitch}" @click="deliverySwitch=true">
									<span style="padding-right: 1rem;">预约配送</span>
									<span>选取时间</span>
								</view>
							</view>
							<br>
							<u-divider text="分割线"></u-divider>
						</view>
					</view>
					<br>
					<view  style="margin-top: 440rpx;padding: 1rem;">
						<view>
							<u--text :text="shopDetail.name" size="20"></u--text>
							<u--text :text="shopDetail.introduction" size="16" color="#606266"></u--text>
						</view>
						<view>
							<u-row v-for="(item) in foodPayArray" gutter="10" justify="top" class="takeaway-item">
								<u-col span="4">
									<view>
										<u--image  :src="$url+item.imgUrl" width="100%" mode="aspectFill" radius="5px" height="110px" ></u--image>
									</view>
								</u-col>
								<u-col span="8">
									<view>
										<u--text :text="item.name" color="#303133"  :bold="true" lines="1"></u--text>
										<view class="takeaway-article">
											<view class="takeaway-article-flex">
												<view>
													<span>{{'月销'+item.saleQuantity+"+"}}</span>
												</view>
												<view>
													<span>{{"%"+item.favorRate+"好评"}}</span>
												</view>
											</view>
											
										</view>
										<view>
											<u--text :text="item.detail" size="12" color="#909399"></u--text>
										</view>
										<br>
										<u-row justify="space-between" gutter="10">
											<u-col span="3" class="money-font">
												<view>
													<small style="font-size: .8rem;">￥</small>
													<span>{{item.price*item.remark}}</span>
												</view>
											</u-col>
											
											<u-col span="4">
												<u--text :text="'×'+item.remark"></u--text>
												
											</u-col>
										</u-row>
										
									</view>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
		</u-popup>
		<u-modal :show="modalShow" @confirm="getPayment" @cancel="modalShow=false" title="是否确认支付" :showCancelButton="true" :asyncClose="true"></u-modal>
	</view>
</template>

<script>
	/* 在此抱歉 此页面我写的极其复杂😘 */
	/* 希望配合部分注释你能看懂  */
	/* 2024-02-25 */
	export default {
		data() {
			return {
				/* 初始化id */
				id:undefined,
				/* 是否收藏 */
				isCollect:false,
				collectId:0,
				/* 店家详细 */
				shopDetail:[],
				/* 店家所有菜品 */
				food:[],
				/* Body的scrollTop 值 */
				scrollTop:0,
				/* 选取后的商品总价 */
				totalPrice:0,
				/* 结算的弹出框开关 */
				upopupShow:false,
				/* 结算选择的所有菜品 */
				foodPayArray:[],
				/* 立即配送和预约配送选择开关 */
				deliverySwitch:false,
				/* 配送地址与信息 */
				address:{
					
					},
				/* radio 值*/
				addressLabel:['学校','家中','故乡'],
				/*填写地址的弹出框开关*/
				addressShow:false,
				/* 地址信息列表 */
				addressList:[],
				addressListIndex:0,
				/* 地址信息校验规则 */

				/* 是否支付的确认模态框 */
				modalShow:false,
				/* 支付的订单号 */
				orderNo:0,
			}
		},
		onLoad(options) {
			this.id=options.id;
			this.getShopDetail();
		},
		mounted() {
			
			this.getShopDetail();
			this.getShopCollect();
			this.getFood();
			this.getAdressList();
		},
		
		computed:{
			timAfter(){
				return (minute)=>{
					const currentTime = new Date();
					currentTime.setMinutes(currentTime.getMinutes() + 30);
					return currentTime.getHours().toString().padStart(2,"0")+":"+currentTime.getMinutes().toString().padStart(2,"0")
					
				}
				
			}
		},
		methods: {
			onPageScroll(e) {
					this.scrollTop = e.scrollTop;
				},
			getShopDetail(){
				this.$request.get('prod-api/api/takeout/seller/'+this.id)
				.then(res=>{
					
					if(res.code==200){
						this.shopDetail=res.data;
					}
				})
			},
			getFood(){
				this.$request.get('prod-api/api/takeout/product/list?categoryId=0&sellerId='+this.id)
				.then(res=>{
					if(res.code==200){
					
						this.food=res.data;
					}
				})
			},
			getShopCollect(){
				this.$request.get('prod-api/api/takeout/collect/check?sellerId='+this.id)
				.then(res=>{
					if(res.code==200){
						if(res.isCollect){
							this.isCollect=true;
							this.collectId=res.id
						}else{
							this.isCollect=false;
						}
					}
				})
				
			},
			/* 添加收藏 */
			addCollect(){
				 this.$request.post('prod-api/api/takeout/collect',{'sellerId':this.id})
				 .then(res=>{
				 	if(res.code==200){
				 		uni.$u.toast('收藏成功')
						this.isCollect=true;
						/* 需要刷新收藏id */
						this.getShopCollect()
				 	}
				 })
			},
			/* 取消收藏 */
			cancalCollect(){
				this.$request.del('prod-api/api/takeout/collect/'+this.collectId)
				.then(res=>{
					if(res.code==200){
						uni.$u.toast('取消收藏成功')
						this.isCollect=false;
					}
				})
			},
			getAdressList(){
				this.$request.get('prod-api/api/takeout/address/list')
				.then(res=>{
					if(res.code==200){
						this.addressList=res.data;
						this.address=res.data[0]
						
					}else{
						uni.$u.toast(res.msg)
					}
				})
				
			},
			goAddAddress(){
				uni.navigateTo({
					url: '/component/takeaway/addAddress?id='+this.id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goPay(){
				if(this.upopupShow){
					this.createOrder()
					return 
				}
				if(this.totalPrice==0){
					uni.$u.toast('亲~什么都没选中😘')
					return
				}
				this.upopupShow=true;
				this.foodPayArray=[];
				this.food.forEach(item=>{
					
					if(item.remark!=null&&!isNaN(item.remark)&&item.remark!=0){
						this.foodPayArray.push(item);
					}
				})
				
			},
			/* 创建订单 */
			createOrder(){
				/* 先进行清空 */
				this.address.orderItemList=[]
				this.foodPayArray.forEach(i=>{
					this.address.orderItemList.push({
						'productId':i.id,
						'quantity':i.remark
					});
				})
				this.address.sellerId=this.id;
				this.address.amount=this.totalPrice
				this.$request.post('prod-api/api/takeout/order/create',this.address)
				.then(res=>{
					if(res.code==200){
						this.orderNo=res.orderNo
						this.modalShow=true;
					}else{
						uni.$u.toast(res.msg)
					}
				})
	
			},
			getPayment(){
				this.$request.post('prod-api/api/takeout/pay',{'orderNo':this.orderNo,"paymentType":"电子支付"})
				.then(res=>{
					if(res.code==200){
						uni.$u.toast('支付成功')
						this.modalShow=false;
						this.upopupShow=false;
					}else{
						uni.$u.toast(res.msg)
					}
				})
				
			}
			
			
		}
	}
</script>


<style lang="scss">
	@import url("./index.css");
	
	.Overlay{
		position: absolute;
		width: 100%;
		height: 130px;
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
	
	.shop-detail-container{
		position: absolute;
		 z-index: 2;
		top: 110px;
		width: 100%;
		border-radius: 35rpx;
		background-color: #fff;
	}
	.money-font{
		color: $u-error-dark;
	}
	
	.add-button{
		background-color: #fbde00;
		color: #000;
		border-radius: 50%;
		width: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50rpx;
	}
	.minus-button{
		border: solid 1px #fbde00;
		background-color: #fff;
	}
	.tabbar{
		color: #fff!important;
		border-radius: 55rpx;
		width: 90%;
		margin: 0 auto;
		position: fixed;
		bottom: 8rpx;
		height: 110rpx;
		z-index: 10071;
		background-color: #212526;
		.bg-yellow{
			height: 100%;
			color: #212526;
			background-color: #fee236;
			border-radius:0 55rpx 55rpx 0;
		}
	}
	
	/* 第一个弹出框 配送样式 */
	.u-popup-container{
		padding-bottom: 4rem;
		height: 1200rpx;
		overflow: auto;
		.u-popup-fixed{
			width: 100%;
			position: fixed;
			z-index: 10087;
			overflow: auto;
			background-color: #fff;
			border-radius: 35rpx ;
			
		}

	}
	.border-yellow{
		padding: .7rem;
		border-radius: 20rpx;
		border: solid 1.5px #ffaa7f ;
		color: #e18c2e;
	}
	.border-white{
		border-color: #f1f1f1;
		color: #212526;
	}
	/* 第二个弹出框 填写地址样式 */
	.address-popup{
		padding: 2rem;
		
	}
</style>

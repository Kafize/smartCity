<template>
	<view style="padding: 1rem;">
		
		<view>
			<u-navbar title="快速充值" bgColor="#fff" :placeholder="true"  :autoBack="true" :border="true">
				<view
				              
				                slot="right"
								@click="upopupShow=true,getPaymentRecord()"
				            >
				                <u--text text="充值记录"></u--text>
				            </view>
			</u-navbar>
		</view>
		
		<view>
			<view>
				<u--text :text="'选择金额'" bold size="16"></u--text>
			</view>
			
			 <u-radio-group
			 v-model="money"
			  >
			    <u-radio
			      :customStyle="{padding: '8px'}"
			      v-for="(item, index) in moneyList"
			      :key="index"
				  activeColor="red"
			      :label="item"
			      :name="item"
			     
			    >
			    </u-radio>
			  </u-radio-group>
			  <br>
			  <u-button type="primary" text="快速充值" @click="getPayment"></u-button>
		</view>
		<u-popup :show="upopupShow" @close="upopupShow=false" @open="upopupShow=true"  round="35rpx" >
			<scroll-view scroll-y="false" style="height: 1100rpx;">
				<view>
					<view class="" style="padding: 1rem;" >
						<u--text text="充值记录"  bold align="center"></u--text>
						<u-divider></u-divider>
						<view v-for="c in charts" style="padding: 1rem;">
							<view>
								<view>
									<u--text :text="c.money+'元'" bold size="16"></u--text>
								</view>
								<view>
									<u--text :text="c.rechargeDate" bold color="#909193" size="14"></u--text>
								</view>
							</view>
							<u-divider></u-divider>
						</view>
					</view>
				</view>
				
			</scroll-view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneyList:['50','200','500','1000'],
				money:'50',
				charts:[],
				upopupShow:false
			}
		},
		mounted() {
			this.getPaymentRecord()
		},
		methods: {
			getPayment(){
				this.$request.post(`prod-api/api/park/recharge/pay?money=${this.money}&payType=1`)
				.then(res=>{
					if(res.code==200){
						uni.$u.toast('支付成功')
					}else{
						uni.$u.toast(res.msg)
					}
				})
				
			},
			getPaymentRecord(){
				this.$request.get('/prod-api/api/park/recharge/list')
				.then(res=>{
					if(res.code==200){
						this.charts=res.rows;
					}else{
						uni.$u.toast(res.msg);
					}
				})
				
			}
			
		}
	}
</script>

<style lang="scss">
	.border-black{
		border: solid 1px #e45656;
		padding: .5rem;
	}
</style>

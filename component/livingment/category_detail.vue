<template>
	<view style="padding:1rem">
		<u-navbar
		            title="生活缴费"
				 :placeholder="true"
				  :border="true"
		            :autoBack="true">
		        </u-navbar>
		<view>
			<view>
				<u--text text="充值金额" color="#398ade" :bold="true"></u--text>
				<view style="height:10px"></view>		
				 <u-radio-group
				    v-model="radiovalue1"
				    placement="row"
				   
				  >
				    <u-radio
				      :customStyle="{marginRight: '8px'}"
				      v-for="(item, index) in radiolist1"
				      :key="index"
				      :label="item.name"
				      :name="item.name"
				      
				    >
				    </u-radio>
				  </u-radio-group>
				  <u-divider></u-divider>
			</view>	
			<view>
				<u--text text="充值方式" color="#398ade" :bold="true"></u--text>
				<view style="height:10px"></view>		
				 <u-radio-group
				    v-model="radiovalue2"
				    placement="row"
				   
				  >
				    <u-radio
				      :customStyle="{marginRight: '8px'}"
				      v-for="(item, index) in radiolist2"
				      :key="index"
				      :label="item.name"
				      :name="item.name"
				     
				    >
				    </u-radio>
				  </u-radio-group>
				  <u-divider></u-divider>
			</view>	
			<view>
				<u--text :text="'电话号码'"></u--text>
				<view style="height:10px"></view>	
				 <u--input
				    placeholder="输入电话号码:"
				    border="surround"
				    v-model="value"
				  ></u--input>
			</view>	
		</view>
		<br>
		<u-button type="primary" text="立即充值" shape="circle" @click="recharge"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				 radiolist1: [{
				            name: '100',
				            
				          },
				            {
				              name: '200',
				              
				            },
				            {
				              name: '300',
				              
				            }
				          ],
				          // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				          radiovalue1: '100',
						  radiovalue2:'微信支付',
						  radiolist2:[
							  {
								  name:'微信支付'
							  },
							  {
								  name:'电子支付',
							  },
							  {
								  name:"支付宝"
							  }
						  ]
						}
			},
		
		methods: {
			recharge(){
				const ob={
					paymentType:this.radiovalue2,
					phonenumber:this.value,
					rechargeAmount:this.radiovalue1,
					type:1
				}
				this.$request.post('prod-api/api/living/phone/recharge',{...ob})
				.then(res=>{
					
					uni.showToast({
						icon:'error',
						title:res.msg
					});
					
				})
				
			},
			
		}
	}
</script>

<style>

</style>

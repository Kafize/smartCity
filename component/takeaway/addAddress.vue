<template>
	<view>
		 <u-navbar title="修改地址" bgColor="#fff" :placeholder="true"  :autoBack="true">
			<view class="u-nav-slot" slot="right">         
				  <view @click="switchToggle=true,addressShow=true,Object.keys(address.info).forEach(k=>(address.info[k]=''))">
					   <u--text  text="新增地址" size="14"></u--text>
				  </view>
			</view>
		</u-navbar>
		<view>
			<view style="margin-bottom: .5rem;" class="border-white"   v-for="(item,index) in addressList">
				<view >
					<u-row  justify="space-around" align="center" >
						<u-col span="8">
							<p>{{item.addressDetail}}</p>
							<p  class="takeaway-article-flex">{{item.label+' '+item.name+' '+item.phone}}<p/>
						</u-col>
						<u-col span="3" align="end" >
							<view @click="address.info={...item},switchToggle=false,addressShow=true">
								<u-icon name="edit-pen" size="28" ></u-icon>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
		<u-popup :show="addressShow"   @close="addressShow=false" @open="addressShow=true"  round="35rpx" z-index="10089">
			<view class="address-popup">
				<u--text :text="switchToggle?'新增地址':'修改地址'" size="20"></u--text>
				<u--form ref="uForm" labelPosition="left" :model="address" :rules="rules"  errorType="message">
					<u-form-item label="姓名:" prop="info.name" borderBottom>
						<u--input
								v-model="address.info.name"
								border="none"
								type="text"
								placeholder="请输入姓名"
								maxlength="10"
						></u--input>
					</u-form-item>
					<u-form-item label="电话:" prop="info.phone" borderBottom >
						<u--input
								v-model="address.info.phone"
								border="none"
								maxlength="11"
								type="number"
								placeholder="输入电话"
						></u--input>
					</u-form-item>
					<u-form-item label="标签" >
						<u-radio-group v-model="address.info.label"
						  >
						    <u-radio
						    
						      v-for="(item) in addressLabel"
							style="padding-right: .5rem;"
						      :label="item"
						      :name="item" activeColor="red"
						      
						    >
						    </u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="地址:" prop="info.addressDetail" borderBottom >
						<u--input
								v-model="address.info.addressDetail"
								border="none"
								maxlength="20"
								type="text"
								placeholder="输入地址"
						></u--input>
					</u-form-item>
				</u--form>.
				<view>
					<u-button text="确认提交" @click="submit" style="margin-bottom: .5rem;" ></u-button>
					<u-button type="error" text="删除" v-show="!switchToggle" @click="deleteAdress"></u-button>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList:[],
				addressLabel:['学校','家中','故乡'],
				/*修改地址的弹出框开关*/
				addressShow:false,
				/* true为添加地址 false 为修改地址 */
				switchToggle:false,
				address:{
					'info':{
					
					},
					
					},
					rules: {
						'info.name': {
							min:1,
							max:10,
							type: 'string',
							required: true,
							message: '请填写姓名',
							trigger: ['blur', 'change']
						},
						'info.phone': {
							type: 'number',
							len:11,
							required: true,
							message: '请输入正确的手机号',
							trigger: ['blur', 'change']
						},
						'info.addressDetail':{
							type:'string',
							max:20,
							required: true,
							message: '请输入地址',
							trigger: ['blur', 'change']
						}
					},
			}
		},
		onLoad(option){
			
		},
		mounted() {
			this.getAdressList();
		},
		methods: {
			getAdressList(){
				this.$request.get('prod-api/api/takeout/address/list')
				.then(res=>{
					if(res.code==200){
						this.addressList=res.data;
					}else{
						uni.$u.toast(res.msg)
					}
				})
				
			},
			/* 修改地址提交 */
			submit() {
				this.$refs.uForm.validate().then(res => {
					this.addressShow=false;
					if(this.switchToggle){
						/* 清除 */
						this.addAddress();
					}else{
						this.updateAddress()
					}					
				}).catch(errors => {
					this.showToast(false,'校验失败')
					
				})
			},
			updateAddress(){
				this.$request.put('prod-api/api/takeout/address',this.address.info)
				.then(res=>{
					if(res.code==200){
						this.showToast(true,'修改成功');
						
					}else{
						this.showToast(res.msg)
						
					}
				})
			},
			addAddress(){
				this.$request.post('prod-api/api/takeout/address',this.address.info)
				.then(res=>{
					if(res.code==200){
						this.showToast(true,'添加成功');
						this.getAdressList()
					}else{
						uni.$u.toast(res.msg)
					}
				})
			},
			/* 删除地址 */
			deleteAdress(){
				this.$request.del('prod-api/api/takeout/address/'+this.address.info.id)
				.then(res=>{
					if(res.code==200){
						this.showToast(true,'删除成功')
						/* 重载 */
						this.addressShow=false
						this.getAdressList()
					}else{
						this.showToast(false,res.msg)
					}
				})
				
			},
			showToast(bool,text) {
				if(bool){
					this.$refs.uToast.show({
						type: 'success',
						message: text,
						icon: 'success',
						
					})
				}else{
					this.$refs.uToast.show({
						type: 'error',
						message: text,
						icon: 'error',
						
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	
	.border-yellow{
		padding: .7rem;
		border-radius: 20rpx;
		border: solid 1.5px #ffaa7f ;
		color: #e18c2e;
	}
	.border-white{
		padding: 1rem;
		border-bottom: #f1f1f1 solid 1px;
		border-color: #f1f1f1;
		color: #212526;
	}
	.takeaway-article-flex{
		
		
		font-size: .9rem;
		padding: .5rem 10rpx0;;
		color: #909193;
	}
	.address-popup{
		padding: 2rem;
		
	}
</style>

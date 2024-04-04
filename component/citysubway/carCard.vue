<template>
	<view>
		<view>
			<u-navbar title="我的车卡" bgColor="#fff" :placeholder="true"  :autoBack="true" :border="true"></u-navbar>
		</view>
		<view>
			<view class="card-container">
				<view class="card-item" v-show="!cardList">
					<u-row >
						<u-col span="12" align="center">
							<u-icon name="plus-circle" color="#c0c4cc" size="48" @click="addShow=true"></u-icon>
						</u-col>
					</u-row>
				</view>
				<view class="card-item" v-if="cardList">
					<view>
						<u-row gutter="10" justify="start" align="start">
							<u-col span="4">
								<view>
									<u--image :showLoading="true" src="/static/images/accout.png" width="100%" height="auto" :lazy-load="true"  mode="widthFix"></u--image>
								</view>
							</u-col>
							<u-col span="8">
								<u--text :text="'姓名：'+cardList.userName" color="#606266"></u--text>
								<u--text :text="'身份证：'+cardList.idCard" color="#606266"></u--text>
								<u--text :text="'电话：'+cardList.phonenumber" color="#606266"></u--text>
								<u--text :text="'卡号：'+cardList.cardNum" color="#606266"></u--text>
							</u-col>
						</u-row>
					</view>
					<br>
					<view>
						<u-button text="注销该卡" type="primary" @click="LogoffCard()"></u-button>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="addShow"   @close="addShow=false" @open="addShow=true"  round="35rpx" z-index="10089">
			<view style="padding: 1rem;">
				<u--text :text="'添加车辆'" size="20"></u--text>
				<u--form ref="uForm" labelPosition="left" :model="info" :rules="rules"  errorType="message">
					<u-form-item label="姓名:" prop="info.userName" borderBottom>
						<u--input
								v-model="info.info.userName"
								border="none"
								type="text"
								placeholder="请输入姓名"
								maxlength="10"
						></u--input>
					</u-form-item>
					<u-form-item label="电话:" prop="info.phonenumber" borderBottom >
						<u--input
								v-model="info.info.phonenumber"
								border="none"
								maxlength="11"
								type="number"
								placeholder="输入电话"
						></u--input>
					</u-form-item>
					<u-form-item label="身份证:" prop="info.idCard" borderBottom >
						<u--input
								v-model="info.info.idCard"
								border="none"
								maxlength="18"
								type="text"
								placeholder="输入身份证"
						></u--input>
					</u-form-item>
				</u--form>
				<view>
					<u-button text="确认提交" @click="submit" style="margin-bottom: .5rem;" ></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardList:null,
				addShow:false,
				info:{
					'info':{
						
					}
				},
				rules: {
					'info.userName': {
						min:1,
						max:10,
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'info.phonenumber': {
						type: 'number',
						len:11,
						required: true,
						message: '请输入正确的手机号',
						trigger: ['blur', 'change']
					},
					'info.idCard':{
						type:'string',
						len:18,
						required: true,
						message: '请输入正确身份证',
						trigger: ['blur', 'change']
					}
				},
			}
		},
		mounted() {
			this.getCardList()
		},
		methods: {
			submit() {
				this.$refs.uForm.validate().then(res => {
					
					this.getCard()
				}).catch(errors => {
					uni.showToast({
						icon:'error',
						title: errors
					});		
				})
			},
			getCardList(){
				this.$request.get('prod-api/api/metro/card')
				.then(res=>{
					if(res.code==200){
						this.cardList=res.data;
					}else if(res.code==404){
						this.cardList=null
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
				
			},
			LogoffCard(){
				this.$request.del('/prod-api/api/metro/card/'+this.cardList.id)
				.then(res=>{
					if(res.code==200){
						uni.showToast({
							icon:'success',
							title: '注销成功'
						});
						this.getCardList();
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			getCard(){
				this.$request.post('/prod-api/api/metro/card',this.info.info)
				.then(res=>{
					if(res.code==200){
						this.addShow=false;
						this.getCardList()
						uni.showToast({
							icon:'success',
							title: '领取成功'
						});		
					}else if(res.code==404){
						this.cardList=null
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.card-container{
		padding: 2rem;
		.card-item{
			background-color: #fff;
			border-radius: 10px;
			padding: 2rem 1rem;
			box-shadow:0px 0px 2px 2px  rgba(0, 0, 0, .1);
		}
	}
	
</style>

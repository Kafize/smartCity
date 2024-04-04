<template>
	<view class="card-container">
		<view>
			<u-navbar bgColor="#fff"
			            title="我的车辆"
			            :autoBack="true"
						:placeholder="true"
						:border="true"
			        ></u-navbar>
		</view>
		<view>
			<view>
				<view class="card-item" v-for="c in carList">
					<view>
						<u-row gutter="10" justify="start" align="start">
							<u-col span="4">
								<view>
									<u--image :showLoading="true" src="/static/images/car.jpg" width="100%" height="auto" :lazy-load="true"  mode="widthFix"></u--image>
								</view>
							</u-col>
							<u-col span="8">
								<u--text :text="'车牌：'+c.plateNo" color="#606266"></u--text>
								<u--text :text="'类型：'+c.type" color="#606266"></u--text>
								<u--text :text="'用户名：'+c.userId" color="#606266"></u--text>
							</u-col>
						</u-row>
					</view>
					<br>
					<view>
						<u-button text="删除车辆" type="primary" @click="LogoffCard(c.id)"></u-button>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="card-item" @click="addShow=true">
				<u-row >
					<u-col span="12" align="center">
						<u-icon name="plus-circle" color="#c0c4cc" size="48" @click="addShow=true"></u-icon>
					</u-col>
				</u-row>
			</view>
		</view>
		<view>
			<u-popup :show="addShow"   @close="addShow=false" @open="addShow=true"  round="35rpx" z-index="10089">
				<view style="padding: 1rem;">
					<u--text :text="'领取车卡'" size="20"></u--text>
					<u--form ref="uForm" labelPosition="left" :model="info" :rules="rules"  errorType="message">
						<u-form-item label="车牌号:" prop="info.plateNo" borderBottom>
							<u--input
									v-model="info.info.plateNo"
									border="none"
									type="text"
									placeholder="请输入车牌号"
									maxlength="10"
							></u--input>
						</u-form-item>
						<u-form-item label="类型:" prop="info.type" borderBottom >
							<u--input
									v-model="info.info.type"
									border="none"
									maxlength="11"
									type="text"
									placeholder="输入类型"
							></u--input>
						</u-form-item>
					</u--form>
					<view>
						<u-button text="确认提交" @click="submit" style="margin-bottom: .5rem;" ></u-button>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carList:[],
				info:{
					'info':{
						
					}
				},
				rules: {
					'info.plateNo': {
						min:1,
						max:10,
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'info.type': {
						type: 'string',
						required: true,
						message: '请输入正确的类型',
						trigger: ['blur', 'change']
					},
					
				},
				addShow:false
			}
		},
		mounted() {
			this.getMycar()
		},
		methods: {
			getMycar(){
				this.$request.get('prod-api/api/park/car/my')
				.then(res=>{
					if(res.code==200){
						this.carList=res.rows;
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			LogoffCard(id){
				this.$request.del('prod-api/api/park/car/'+id)
				.then(res=>{
					if(res.code==200){
						uni.showToast({
							icon:'success',
							title: '删除成功'
						});
						this.getMycar();
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					
					this.AddCar()
				}).catch(errors => {
					uni.showToast({
						icon:'error',
						title: errors
					});		
				})
			},
			AddCar(){
				this.$request.post('prod-api/api/park/car',this.info.info)
				.then(res=>{
					if(res.code==200){
						this.addShow=false;
						this.getMycar()
						uni.showToast({
							icon:'success',
							title: '添加成功'
						});		
					}else if(res.code==404){
						this.carList=null
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
		
		.card-item{
			background-color: #fff;
			border-radius: 10px;
			padding: 2rem 1rem;
			margin: 1rem;
			box-shadow:1px 1px 2px 2px  rgba(0, 0, 0, .1);
		}
	}
	page{
		background-color: $u-bg-color;
	}
</style>

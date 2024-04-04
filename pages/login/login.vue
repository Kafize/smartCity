<template>
	<view class="login-container">
		<view class="title">
			<view>
				<image src="../../static/logo.png" class="logo" style="width: 127px;height: 84px;"></image>
			</view>	
			<text>智慧城市系统平台项目</text>
		</view>
		<view  class="login-form">
			<u--input prefixIcon='account' placeholder='请输入账号:' va clearable border="bottom" prefixIconStyle='font-size:24px' v-model="loginForm.username"></u--input>
			<br>
			<br>
			<u--input prefixIcon='lock' placeholder='请输入密码:' ckearable border='bottom' prefixIconStyle='font-size:24px' v-model="loginForm.password"></u--input>
		</view>
		<view>
			<u-button type="primary" size="" text="登录" @click="Login()" ></u-button>
			<br>
			<u-button type="primary"  plain text="注册" @click="goRegister"></u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loginForm:{
					username:'admin01',
					password:'123456'
				}
			}
		},
		onLoad() {
			uni.setStorage({
				key: 'token',
				data: "",
				
			})
		},
		methods: {
			goRegister(){
				uni.redirectTo({
					url:'/pages/register/register'
				})
			},
			Login(){
				this.$request.post('/prod-api/api/login',this.loginForm)
				.then(res=>{
					if(res.code==200){
						uni.setStorage({
							key: 'token',
							data: res.token,
							success: (result) => {console.log("设置成功")},
							fail: (error) => {}
						})
						uni.showToast({
							title:'登录成功',
							icon:'success'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/index/index'
							})
						})
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none',
							mask: true
						})
					}
				})
				.catch(err=>{
					uni.showToast({
						title: res.msg,
						icon: 'none',
						mask: true
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.login-container{
		text-align: center;
		font-size: 1.4rem;
		font-weight: 300;
		padding: 8rem;
		.login-form{
			padding: 2rem 0;
		}
	}
	@media (max-width: 600px)  {
		.login-container{
			padding: 10rem 2rem ;
		}
	}
</style>

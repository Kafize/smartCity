<template>
	<view class="login-container">
		<view >
			<u--text text="用户名:" color="#3c9cff" :bold="true"></u--text>
			<u--input prefixIcon="account"
			    placeholder="请输入用户名"
			    border="surround"
			    v-model="info.userName"
			  ></u--input>
		</view>
		<br>
		<view >
			<u--text text="昵称:" color="#3c9cff" :bold="true"></u--text>
			<u--input
			prefixIcon="chat"	
			    placeholder="请输入昵称"
			    border="surround"
			    v-model="info.nickName"
			  ></u--input>
		</view>
		<br>
		<view >
			<u--text text="密码:" color="#3c9cff" :bold="true"></u--text>
			<u--input
			prefixIcon="lock"	
			    placeholder="请输入密码"
			    border="surround"
			    v-model="info.password"
			  ></u--input>
		</view>
		<br>
		<view >
			<u--text text="手机号码:" color="#3c9cff" :bold="true"></u--text>
			<u--input
			prefixIcon="phone"	
			    placeholder="请输入密码"
			    border="surround"
			    v-model="info.phonenumber"
			  ></u--input>
		</view>
		<br>
		<view >
			<u--text text="邮箱:" color="#3c9cff" :bold="true"></u--text>
			<u--input
			prefixIcon="email"	
			    placeholder="请输入邮箱"
			    border="surround"
			    v-model="info.email"
			  ></u--input>
		</view>
		<br>
		<view >
			<u--text text="唯一标识:" color="#3c9cff" :bold="true"></u--text>
			<u--input
				prefixIcon="tags"	
			    placeholder="请输入标识"
			    border="surround"
			    v-model="info.idCard"
			  ></u--input>
		</view>
		<br>
		<view>
			<u-button type="error"  :hairline="true" text="注册" @click="register"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
			 "avatar":"/profile/upload/2024/03/30/4807ca2e-c458-4f29-90b5-ab3fcd5ccb3b.jpg",
			 "userName":"",
			 "nickName":"",
			 "password":"",
			 "phonenumber":"",
			 "sex":"0",
			 "email":"",
			 "idCard":""
			 }
				
			}
		},
		methods: {
			register(){
				this.$request.post('prod-api/api/register',this.info)
				.then(res=>{
					if(res.code==200){
						uni.showToast({
							title:'注册成功',
							icon: 'success',
							mask: true
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},3000)
						
					}else{
						uni.showToast({
							title:res.msg,
							icon: 'error',
							mask: true
						})
					}
				})
			}
		}
	}
</script>

<style>
	.login-container{
		font-size: 1.4rem;
		
		font-weight: 300;
		padding:5rem  10rem ;
		
		
	}
	@media (max-width: 600px)  {
		.login-container{
			padding: 2rem 1rem;
		}
	}
</style>

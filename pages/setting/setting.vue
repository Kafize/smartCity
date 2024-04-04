
<template>
	<view style="padding: 1rem;">
		<u-navbar :title="'个人信息'" bgColor="#fff" :placeholder="true" :border="true" :autoBack="true">
			
		</u-navbar>
		<view>
			<view style="display: flex;justify-content: center;width: 100%;" @click="cameraOrPhoto">
				<u--image :showLoading="true" :src="$url+'/prod-api/'+info.avatar" width="80px" height="80px" :lazy-load="true" shape="circle" mode="widthFix" ></u--image>
				
			</view>
			<u--text :text="info.userName" :bold="true" align="center"></u--text>
		</view>
		<br>
		<view>
			<view >
				<u--text text="邮箱:"	 color="#3c9cff" :bold="true"></u--text>
				<u--input
				 prefixIcon="email"
				    placeholder="请输入内容"
				    border="surround"
				    v-model="info.email"
				  ></u--input>
			</view>
			<br>
			<view >
				<u--text text="号码:"  color="#3c9cff" :bold="true"></u--text>
				<u--input
				type="number"
				len="11"
				prefixIcon="phone"	
				    placeholder="请输入内容"
				    border="surround"
				    v-model="info.phonenumber"
				  ></u--input>
			</view>
			<br>
			<view >
				<u--text text="身份证号:"  color="#3c9cff" :bold="true"></u--text>
				<u--input
				type="number"
				prefixIcon="tags"
				    placeholder="请输入内容"
				    border="surround"
				    v-model="info.idCard"
				  ></u--input>
			</view>
			<br />
			<u-button type="error" :hairline="true" text="提交" @click="updateInfo"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
				info:[],
			}
		},
		mounted() {
			this.getInfo()
		},
		methods:{
			
			getInfo(){
				this.$request.get("prod-api/api/common/user/getInfo")
				.then(res=>{
					if(res.code==200){
						this.info=res.user;
					}
				})
			},
			
			updateInfo(){
				this.$request.put("prod-api/api/common/user",this.info)
				.then(res=>{
					if(res.code==200){
						this.info=res.user;
						uni.showToast({
							title:'修改成功',
							icon:'success'
						})
					}
				})
			},
			cameraOrPhoto() {
							uni.chooseImage({
								count: 1, //默认9
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'],
								//注意js中的this和箭头函数的this
								success: (res) => {
									this.uploadFilePromise(res.tempFilePaths[0]).then(res => {	
										
										this.updateAvatar(JSON.parse(res).fileName)
			
									}).catch(err => {
										console.log(err);
									});
								}
							});
						},
			updateAvatar(avatar){
				
				this.$request.put("prod-api/api/common/user",{'avatar':avatar})
				.then(res=>{
					if(res.code==200){
						
					}
				})
				
			},
			uploadFilePromise(url) {
					return new Promise((resolve, reject) => {
						let a = uni.uploadFile({
							url: this.$url+'prod-api/common/upload', // 仅为示例，非真实的接口地址
							filePath: url,
							header:{Authorization:uni.getStorageSync('token')},
							name: 'file',
							success: (res) => {
								
									resolve(res.data)
								
							}
						});
					})
					}
		}

	}
</script>
<style>
	.flex{
		display: flex;
	}
</style>

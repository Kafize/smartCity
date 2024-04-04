<template>
	<view style="padding: 1rem;">
		
		<view class="wh">
			<u-button type="error" :hairline="true" text="注销" @click="logout"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logout(){
				
						uni.reLaunch({
							url:'/pages/login/login'
						})
					
				}
			}
		}
	
</script>

<style>
	.wh{
		display: flex;
		height: 100vh;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
</style>

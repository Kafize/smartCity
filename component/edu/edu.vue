<template>
	<view>
		<view class="body">
			<u--text :text="title" :bold="true" align="center" size="18"></u--text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'教育没有提供任何api接口😊'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.body{
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

<template>
	<view style="padding: 1rem;">
		<view>
			<u-navbar :title="'问题反馈'" bgColor="#fff" :placeholder="true" :border="true" :autoBack="true">
				
			</u-navbar>
		</view>
		<view>
			<u--text text="问题反馈" class="title-tag"></u--text>
			<br>
			 <u--input
			    placeholder="请输入标题"
			    border="surround"
			    v-model="msg.title"
			  
			  ></u--input>
			  <br>
			<u--textarea v-model="msg.content" placeholder="请输入内容" ></u--textarea>
			<br>
			<u-button type="primary"  :hairline="true" text="提交" @click="submit"></u-button>
		</view>
		<br>
		<view>
			<u--text text="反馈列表" class="title-tag"></u--text>
			<br>
			<view v-for="i in list">
				<u--text :text="i.title" :bold="true"></u--text>
				<u--text :text="i.content" :bold="false"></u--text>
				<u-divider></u-divider>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:{
					title:'',
					content:''
				},
				list:[]
			}
		},
		mounted() {
			this.getList()
		},	
		methods: {
			submit(){
					this.$request.post(`prod-api/api/common/feedback`,msg)
					.then(res=>{
						
						if(res.code==200){
							uni.showToast({
								title:'提交成功',
								icon:'success'
							})
						}
					})
				
			},
			getList(){
				this.$request.get('prod-api/api/common/feedback/list')
				.then(res=>{
					
					if(res.code==200){
						this.list=res.rows;
						
					}
				})
			}
		}
	}
</script>

<style>
.title-tag{
			padding-left: .5rem;
			border-left: solid red 4px;
		}
</style>

<template>
	<view>
		<view>
			<u-navbar title="通知公告" bgColor="#fff" :placeholder="true"  :autoBack="true" :border="true">
			
			</u-navbar>
		</view>
		<view style="padding: 1rem;">
			<view>
				<u-notice-bar :text="noticeList" direction="column" bgColor="#e45656" color="#fff" speed="250" ></u-notice-bar>
			</view>
			<view>
				<view  v-for="s in statementList" class="lost-item">
					<u--text :text="s.title"  size="18"></u--text>
					<u-divider ></u-divider>
					<view>
						<view v-html="s.content">
							
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeList:[],
				statementList:[]
			}
		},
		mounted() {
			this.getnoticeList();
			for (let i = 1; i < 4; i++) {
				this.getstatement(i);
			}
		},
		methods: {
			getnoticeList(){
				this.$request.get('prod-api/api/metro/notice/list')
				.then(res=>{
					if(res.code==200){
						res.rows.forEach(item=>{
							this.noticeList.push(item.title);
						})
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			getstatement(i){
				this.$request.get('prod-api/api/metro/statement?type='+i)
				.then(res=>{
					if(res.code==200){
						this.statementList.push(res.data);
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
	.lost-item{
		padding: 1rem;
		background-color: #fff;
		border-radius: 10px;
		margin: 1rem 0;
		box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.1);  
	
	}
</style>

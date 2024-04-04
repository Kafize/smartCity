<template>
	<view>
		<view>
			<u-navbar
			           title="宠物医生"
			          :border="true"
			           :autoBack="true"
								:placeholder="true"
			       >
			       </u-navbar>
		</view>
		<view>
			<view class="card" v-for="i in doctorList">
				<u-row gutter="5">
					<u-col span="2">
						<u--image :showLoading="true" :src="$url+i.avatar" width="50px" height="50px" :lazy-load="true" shape="circle" mode="widthFix" ></u--image>
					</u-col>
					<u-col span="6">
						<u--text :text="i.name" :bold="true"></u--text>
						<u--text :text="i.practiceNo" color="#606266"></u--text>
					</u-col>
					<u-col span="4">
						<u--text :text="i.jobName" align="end" :bold="true" size="12"></u--text>
					</u-col>
				</u-row>
				<u-divider></u-divider>
				<view>
					<u--text :text="i.goodAt"></u--text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				doctorList:[]
			}
		},
		onLoad(option) {
			this.id=option.id
		},
		mounted() {
			this.getDoctor();
		},
		methods: {
			getDoctor(){
				this.$request.get('/prod-api/api/pet-hospital/pet-doctor/list?typeId='+this.id)
				.then(res=>{
					if(res.code==200){
						this.doctorList=res.rows
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #efefef;
		padding: 1rem 0;
	}
.card{
	padding: 1rem;
	background-color: #fff;
	margin:0 1rem 1rem;
}
</style>

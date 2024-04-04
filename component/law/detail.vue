<template>
	<view>
		<view>
			<u-navbar
			            title="专长详细"
					 :placeholder="true"
					  :border="true"
			            :autoBack="true"
			        >
			        </u-navbar>
		</view>
		<view class="card" v-for="i in legalExpertise">
			<view class="" style="display: flex;">
				<u-image :src="$url+i.avatarUrl" width="50px" height="50px" mode=""></u-image>
				<view style="padding: 1rem;">
					<u--text :text="i.name" :bold="true" size="14"></u--text>
					
				</view>
			</view>
			<u-divider></u-divider>
			<view>
				<u--image :showLoading="true" :src="$url+i.certificateImgUrl" width="100%" :lazy-load="true" ></u--image>
			</view>
			<br>
			<view>
				<u--text lines="4" :text="i.baseInfo"></u--text>
				<u--text :text="i.eduInfo" size="12" lines="4"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				legalExpertise:[]
			}
		},
		onLoad(o) {
			this.id=o.id;
			this.getlegalExpertise();
		},
		methods: {
			getlegalExpertise(){
				this.$request.get("prod-api/api/lawyer-consultation/lawyer/list?legalExpertiseId="+this.id)
				.then(res=>{
					if(res.code==200){
						this.legalExpertise=res.rows;
					}
				})
			}
			
		}
	}
</script>

<style>
.card{
		 margin-bottom: 1rem;
		box-shadow: 0px 0px 2px rgba(0, 0, 0, .1);
		 border-radius: 15px;
		 background-color: #fff;
		padding:1rem;
	}
</style>

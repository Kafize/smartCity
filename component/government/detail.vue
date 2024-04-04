<template>
	<view style="background-color: #f3f4f6;padding: 1rem;">
		<u-navbar
		            title="分类详情"
				 :placeholder="true"
				  :border="true"
		            :autoBack="true">
		        </u-navbar>
		<view>
			<view v-for="i in data" class="card">
				<view>
					<u--text lines="4" :text="i.title"></u--text>
					<u--text :text="i.content" size="12" lines="4"></u--text>
				</view>
				<view>
					<u-image v-if="i.imgUrl" :src="$url+i.imgUrl" width="100%" mode=""></u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
				id:0
			}
		},
		onLoad(option) {
			this.id=option.id
			this.getData();
			
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData(){
				this.$request.get("prod-api/api/gov-service-hotline/appeal/list?pageNum=1&pageSize=10&appealCategoryId="+this.id)
				.then(res=>{
					if(res.code==200){
						this.data=res.rows;
					}
				})
			}
		}
	}
</script>

<style>
 .card{
	 padding: 1rem;
	 background-color: #fff;
	 margin-bottom: 1rem;
	 border-radius: 15px;
	 box-shadow: 0 0 5px rgba(0, 0, 0, .2);
 }
</style>

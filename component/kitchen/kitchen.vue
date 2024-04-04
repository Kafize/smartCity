<template>
	<view style="padding:  1rem;">
		<view >
			
			<view style="background-color: #fff;padding: 1rem;">
				<view class="tag-error">
					<u--text text='菜品列表' :bold="true" size="14"></u--text>
				</view>
			</view>
			
			<view class="company-item" v-for="i in data">
				<u--text :text="i.name" :bold="true"></u--text>
				<u--text :text="i.ingredients" color="#909399" size="14"></u--text>
				<view style="padding: 1rem;">
					<u--image :showLoading="true" width="100%" :src="$url+i.imgUrl" mode="widthFix" ></u--image>
				</view>
				<u-row>
					<u-col span="6" align="center">
						<u-icon :name="i.myCollectionState?'star-fill':'star'" :color="i.myCollectionState?'#f1a532':'#606266'" @click="star(i.id,i.myCollectionState)"  size="24"></u-icon>
					</u-col>
					<u-col span="6" align="center">
						<u-icon :name="i.myLikeState?'heart-fill':'heart'" :color="i.myLikeState?'#f1a532':'#606266'" @click="heart(i.id,i.myLikeState)"  size="24"></u-icon>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[]
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			star(id,bool){
				const obj={
					dishesId:id,
					newState:!bool
				}
				this.$request.post('prod-api/api/kitchen-helper/dishes-collection',obj)
				.then(res=>{
					if(res.code==200){
						this.data.forEach(obj=>{
							if(obj.id==id){
								obj.myCollectionState=!bool;
							}
							
						})
						
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				
			},
			heart(id,bool){
				const obj={
					dishesId:id,
					newState:!bool
				}
				this.$request.post('prod-api/api/kitchen-helper/dishes-like',obj)
				.then(res=>{
					if(res.code==200){
						this.data.forEach(obj=>{
							if(obj.id==id){
								obj.myCollectionState=!bool;
							}
							
						})
						
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				
			},
			getData(){
				this.$request.get('prod-api/api/kitchen-helper/dishes/list')
				.then(res=>{
					if(res.code==200){
						
						this.data=res.rows;
						
					}else{
						uni.showToast({
							title:res.msg
						});
					}
				})
				
			},
		}
	}
</script>

<style >

.company-item{
		border-radius: 10rpx;
		background-color: #fff;
		margin-top: 1rem;
		padding: 1rem;
	}
	.tag-error{
		font-weight: 300;
		border-left: 10rpx solid #fa3534;
		padding-left: 8px;
		background-color: #fff;
	}
</style>

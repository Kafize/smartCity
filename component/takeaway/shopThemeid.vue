<template>
	<view>
		<u-navbar :title="theme" bgColor="#fff" :placeholder="true"  :autoBack="true">
			
		</u-navbar>
		<view>
			<takeawayItem :shopArray="themeidShop"></takeawayItem>
		</view>
	</view>
</template>

<script>
	import takeawayItem from './component/takeawayItem.vue'
	export default {
			
		components:{
			'takeawayItem':takeawayItem
		},
		data() {
			return {
				id:0,
				themeidShop:[],
				theme:''
			}
		},
		onLoad(option) {
			this.id=option.id
			this.theme=option.name
		},
		mounted() {
			this.getThemeidShop()
		},
		methods: {
			getThemeidShop(){
				this.$request.get(`prod-api/api/takeout/seller/list?themeId=${this.id}`)
				.then(res=>{
					
					if(res.code==200){
						this.themeidShop=res.rows;
						
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	@import url("index.css");

</style>

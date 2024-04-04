<template>
	<view>
		<view>
			<u-navbar
			            title="路线详细"
					 :placeholder="true"
					  :border="true"
			            :autoBack="true"
			        >
			        </u-navbar>
		</view>
		<view class="card" v-for="i in data">
			<view style="padding: 1rem;">
				<u--text :text="i.sequence+'.'+i.name" :bold="true" size="14"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				data:[]
			}
		},
		onLoad(o) {
			this.id=o.id;
			this.init();
		},
		methods: {
			init(){
				this.$request.get("prod-api/api/bus/stop/list?linesId="+this.id)
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
		 margin-bottom: 1rem;
		box-shadow: 0px 0px 2px rgba(0, 0, 0, .1);
		 border-radius: 15px;
		 background-color: #fff;
		padding:1rem;
	}
</style>

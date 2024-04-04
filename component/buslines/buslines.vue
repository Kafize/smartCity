<template>
	<view style="padding: 1rem;">
		<view class="">
			<view class="card" v-for="i in data" @click="godetail(i.id)">
				<view>
					<view>
						<u-row>
							<u-col span="6">
								<u--text :text="i.name" :bold="true"></u--text>
							</u-col>
							<u-col span="6">
								<u--text :text="i.price+'￥'" align="end" :bold="true" color="#e45656"></u--text>
							</u-col>
						</u-row>
					</view>
					<u--text :text="i.first+'→'+i.end"></u--text>
					<u--text :text="'首'+i.startTime+'  末'+i.endTime"></u--text>
					<u--text :text="'里程：'+i.mileage+'km'" ></u--text>
				</view>
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
			this.init()
		},
		methods: {
			init(){
				this.$request.get("prod-api/api/bus/line/list")
				.then(res=>{
					if(res.code==200){
						this.data=res.rows
					}
				})
				
			},
			godetail(id){
				uni.navigateTo({
					url: '/component/buslines/detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
 .card{
 	 padding: 1rem;
 	 background-color: #fff;
 	 margin-bottom: .5rem;
 	 border-radius: 15px;
 	 box-shadow: 0 0 2px rgba(0, 0, 0, .1);
 }
</style>

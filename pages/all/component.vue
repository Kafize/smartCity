<template>
	<view >
		<u-navbar
		            title="所有服务"
				 :placeholder="true"
				  :border="true"
				  leftIcon=""
		        >
		</u-navbar>
		<view>
			<u-grid :col="4">
				<u-grid-item v-for="(c,index) in data"  @click="gopage(index)" >
					<view class="card">
						<u-icon :name="$url+c.imgUrl" :label="c.serviceName" labelPos="bottom" size="32" labelSize="12"></u-icon>
					</view>	
				</u-grid-item>
			</u-grid>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pagesArrayNames:[
					'edu',
					'government',
					'library',
					'rubbish',
					'volunteer',
					'stopcar',
					'citysubway',
					'buslines',
					'outpatient',
					'traffic',
					'livingment',
					'takeaway',
					'government',
					'movie',
					'job-hunting',
					'activities',
					'pet',
					'logistics',
					'charity',
					'talents',
					'data',	
				],
				data:[]
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData(){
				this.$request.get("prod-api/api/service/list")
				.then(res=>{
					if(res.code==200){
						this.data=res.rows;
					}
				})
			},
			gopage(index){
				const page=this.pagesArrayNames[index]
				uni.navigateTo({
					url: `/component/${page}/${page}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	page{
	background-color: #f3f4f6;
	}
 .card{
	 background-color: #fff;
	 border-radius: 15px;
	 margin: 1rem;
	 width: 75px;
	 height: 75px;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 box-shadow: 2px 2px 1px rgba(0, 0, 0, .1);
		
 }
</style>

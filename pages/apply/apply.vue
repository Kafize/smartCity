<template>
	<view>
		<view>
			<u-navbar title="应用列表" leftIcon="" :placeholder="true">
			</u-navbar>
		</view>
		<view  class="container">
			
			<view>
				<view class="flex list-item" v-if="loading" style="height: 195px;">
					<u-loading-icon></u-loading-icon>
				</view>
				<view class="list-item" v-else style="height: 195px;">
					<view>
						<view>
							<u-row>
								<u-col span="6" align="start">
									<u-icon
									@click="show=true" 
									    name="arrow-down"
									    size="19"
										:label="wheather.cityName"
										labelPos="left"
									></u-icon>
								</u-col>
								<u-col span="6" >
									<u--text :text="todayDate" align="right"></u--text>
								</u-col>
							</u-row>
						</view>
						<u-divider></u-divider>
						<view>
							<u-row justify="space-between" align="center">
								<u-col span="6" align="center">
									<view class="flex">
										<view >
											<u-icon :name="apiUrl+wheather.weatherIcon" :label="wheather.weather"  size="24" ></u-icon>
										</view>
									</view>
									<u--text :text="wheather.minTemperature+'℃~'+wheather.maxTemperature+'℃'" size="20" align="center"></u--text>
								</u-col>
								<u-col span="6" align="center">
									<u--text :text="wheather.currentTemperature+'℃'" size="28" align="center"></u--text>
								</u-col>
							</u-row>
							<view>
								<br>
								<view>
									<u-row justify="space-between">
										<u-col span="3"  align="center">
											<u--text text="湿度" align="center" :bold="true"></u--text>
											<text>{{wheather.humidity}}</text>
										</u-col>
										<u-col span="3"  align="center">
											<u--text text="风速" align="center" :bold="true"></u--text>
											<text>{{wheather.windSpeed}} <text style="font-size: 12px;">km/h</text></text>
										</u-col>
										<u-col span="3"  align="center">
											<u--text text="能见度" align="center" :bold="true"></u--text>
											<text>{{wheather.visibility}} <text style="font-size: 12px;">%</text></text>
										</u-col>
										<u-col span="3"  align="center">
											<u--text text="空气质量" align="center" :bold="true"></u--text>
											<text>{{wheather.airQuality}}  <text style="font-size: 12px;">m</text></text>
										</u-col>
									</u-row>
								</view>
							</view>
						</view>
					</view>					
				</view>
			</view>
			<view>
				<view v-for="item in appList" class="list-item">
					<view>
						<u-row>
							<u-col span="2" style="position: relative;">
								<u-badge type="error" :isDot="true" :absolute="true" style="z-index: 1;left: 40px;" :show="!!item.isUpdated"></u-badge>
								<u-icon :name="apiUrl+item.appIcon" size="42"></u-icon>
							</u-col>
							<u-col  span="10">
								<u-row justify="space-between" align="center" >
									<u-col span="6" >
										<view class="flex" style="justify-content: start;">
											<text style="padding-right: .25rem;">{{item.appName}}</text>
											<u-badge type="error" value="推荐"  :show="!!item.isRecommended"></u-badge>
										</view>
										<view>
											<u--text :text="item.appVersion" color="#909399" size="14"></u--text>
										</view>
									</u-col>
									<u-col span="6" align="flex-end" >
										<view >
											<u-tag text="立即下载"   type="primary" size="mini" @click="downFileApp(item.appUrl),addHis(item.id)" />
										</view>
									</u-col>
								</u-row>
							</u-col>
						</u-row>
					</view>
					<u-divider></u-divider>
					<view>
						<u-row>
							<view>
								<u--text :text="item.appDescription" :lines="2"></u--text>
							</view>
						</u-row>
					</view>
					<br>
					<view>
						<view>
							<image :src="apiUrl+item.appBackground" mode="widthFix" height="auto" style="width: 100%;"></image>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view>
					<view class="">
						<view v-for="i in themeApplist" class="list-item">
							<view class="title-tag">
								<text>{{i.topicName}}</text>
							</view>
							<u-divider></u-divider>
							<view v-for="item in i.appList">
								<u-row>
									<u-col span="2" style="position: relative;">
										<u-badge type="error" :isDot="true" :absolute="true" style="z-index: 1;left: 40px;" :show="!!item.isUpdated"></u-badge>
										<u-icon :name="apiUrl+item.appIcon" size="42"></u-icon>
									</u-col>
									<u-col  span="10">
										<u-row justify="space-between" align="center" >
											<u-col span="6" >
												<view class="flex" style="justify-content: start;">
													<text style="padding-right: .25rem;">{{item.appName}}</text>
													<u-badge type="error" value="推荐"  :show="!!item.isRecommended"></u-badge>
												</view>
												<view>
													<u--text :text="item.appVersion" color="#909399" size="14"></u--text>
												</view>
											</u-col>
											<u-col span="6" align="flex-end" >
												<view >
													<u-tag text="立即下载"   type="primary" size="mini" @click="downFileApp(item.appUrl)" />
												</view>
											</u-col>
										</u-row>
									</u-col>
								</u-row>
								<view>
									<u-row>
										<view>
											<u--text :text="item.appDescription" :lines="2"></u--text>
										</view>
									</u-row>
								</view>
								<br>
								<view>
									<view>
										<image :src="apiUrl+item.appBackground" mode="widthFix" height="auto" style="width: 100%;"></image>
									</view>
								</view>
								<u-divider></u-divider>
							</view>
							
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
				appList:[],
				themeApplist:[],
				wheather:[],
				apiUrl:'http://8.130.36.149:8008/api',
				loading:true
			}
		},
		onLoad() {
			this.getAppList();
			this.gethemeAppList()
			this.getWeather(13)
		},
		computed:{
			todayDate(){
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1; // 注意月份是从0开始计数的，所以需要+1
				let day = date.getDate();
				let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
				return formattedDate;
			}
		},
		methods: {
			getAppList(){
				uni.$u.http.get(this.apiUrl+'/control/app/list')
				.then(res=>{
				
					if(res.data.code==200){
						this.appList=res.data.rows;
						
					}else{
						uni.showToast({
							title: res.msg,
							icon:'error'
						});
					}
				})
			},
			gethemeAppList(){
				uni.$u.http.get(this.apiUrl+'/control/topic/list')
				.then(res=>{
					if(res.data.code==200){
						this.themeApplist=res.data.rows;
						
					}
				})
			},
			getWeather(cityId){
				uni.$u.http.get(this.apiUrl+`/control/weather/list?cityId=${cityId}`)
				.then(res=>{
					if(res.data.code==200){
						this.wheather=res.data.rows[0]||this.wheather;
						this.loading=false;
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 1rem;
		background-color: $u-bg-color;
		.list-item{
			padding: 1rem;
			margin-bottom: 1rem ;
			border-radius: 15rpx;
			background-color: #fff;
			
		}
		.flex{
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.title-tag{
			padding-left: .5rem;
			border-left: solid red 4px;
		}
	}
	
</style>

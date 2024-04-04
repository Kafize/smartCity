<template>
	<view>
		<view>
			<u-navbar title="查询列车" bgColor="#fff" :placeholder="true"  :autoBack="true" :border="true">
				
			</u-navbar>
			
		</view>
		<view>
			<view>
				<u-image :src="$url+cityImage" @click="clickImage()" width="100%" mode="aspectFit"></u-image>
				<u-text :text="cityName" align="center" margin=".5rem 0 0 0 " size="16" ></u-text>
			</view>
			<view>
				<view>
					<view style="padding: .5rem 1rem;">
						 <u-grid :border="false" col="2">
							<u-grid-item 
									v-for="l in lineList"
								 :customStyle="{padding:'.5rem'}"
							>
									<u-button :text="l.lineName" @click="getLineDetail(l.lineId)"></u-button>
							</u-grid-item>
						</u-grid>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="lineDetailShow"   @close="lineDetailShow=false" @open="lineDetailShow=true"  round="35rpx" z-index="10089">
			<view class="line-popup" style="padding: 2rem;">
				<view>
					<u--text :text="lineDetail.name" size="18" bold></u--text>
					<u-row gutter="10" style="padding: .2rem 0;">
						<u-col span="2">
							<u--text :text="'首'+lineDetail.startTime" size="12" color="#909399"></u--text>
						</u-col>
						<span style="color: #909399;">|</span>
						<u-col span="2">
							<u--text :text="'末'+lineDetail.endTime" size="12" color="#909399"></u--text>
						</u-col>
					</u-row>
					<u--text :text="lineDetail.first+' 开往 '+lineDetail.end" size="14" ></u--text>
				</view>
				<br>
				<view>
					<u-scroll-list :indicator="false">
					        <view>
					        	<view class="bus-lzlist">
					        		<ul>
					        			<li v-for="item in lineDetail.metroStepList">
					        				<span>{{item.name}}</span>
					        			</li>
					        		</ul>
					        	</view>
					        </view>
					    </u-scroll-list>
				</view>
				
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lineList:[],
				cityImage:'',
				cityName:'',
				lineDetailShow:false,
				lineDetail:{},
				
			}
		},
		onLoad(options) {
			
		},
		mounted() {
			this.getCityImage();
			this.getLineList();
			
		},
		methods: {
			clickImage(){
				wx.previewImage({
					urls: [this.$url+this.cityImage], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},               
			getLineList(){
				this.$request.get('prod-api/api/metro/line/list')
				.then(res=>{
					if(res.code==200){
						this.lineList=res.data;
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			getLineDetail(lineid){
				
				this.$request.get('prod-api/api/metro/line/'+lineid)
				.then(res=>{
					if(res.code==200){
						this.lineDetail=res.data;
						this.lineDetailShow=true;
					}else{
						uni.showToast({
							icon:'error',
							title: res.msg
						});
					}
				})
			},
			getCityImage(){
				this.$request.get('prod-api/api/metro/city')
				.then(res=>{
					if(res.code==200){
						this.cityImage=res.data.imgUrl;
						this.cityName=res.data.name
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
	
	   .bus-lzlist ul:before {
	       position: absolute;
	       top: 10px;
	       right: 5px;
	       left: 5px;
	       height: 2px;
	       background: #317cf7;
	       content: "";
	   }
	   .bus-lzlist ul {
		   padding: 0;
		   
		   list-style: none;
	       display: flex;
	       position: relative;
	   }
	   .bus-lzlist li:before {
		  
	       display: block;
	       margin: 0 auto 5px;
	       -webkit-box-sizing: border-box;
	       box-sizing: border-box;
	       border: 2px solid #317cf7;
	       border-radius: 50%;
	       width: 23px;
	       height: 23px;
	       font-size: 12px;
	       font-weight: 600;
	       line-height: 20px;
	       background: #fff;
	       content: counter(sectioncounter);
	       counter-increment: sectioncounter;
	   }
	   .bus-lzlist {
	       padding-top: 8px;
	       padding-bottom: 19px;
	       counter-reset: sectioncounter;
	   }
	   .bus-lzlist li {
		   padding-right: 1rem;
	       float: left;
	       position: relative;
	       width: 23px;
	       text-align: center;
	   }
</style>

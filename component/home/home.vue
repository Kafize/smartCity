<template>
	<view class="">
		<view style="background:url('https://pic.90sheji.com/back_origin_pic/05/63/06/195130dd4c489f99403bf7cded2296d8.jpg%21/fh/465/quality/90/unsharp/true/compress/true/canvas/826x465a0a0/cvscolor/FFFFFFFF') ;padding: 2rem;">
			<view class="flex">
				<view >
					<image :src="image"  class="avatar" mode=""></image>
				</view>
			</view>
			<view style="padding-top: 1rem;">
				<u--text text="Kafize" align="center" :bold="true" size="18" color="#fff"></u--text>
				<u--text text="所有美好,不期而至" align="center"  size="14" color="#f4f4f5" style="text-shadow: 0 0 10px #fff;"></u--text>
			</view>
		</view>	
		<view style="padding: 1rem;">
			<u--text text="项目简介" class="title" :bold="true" size="18"></u--text>
			<br>
			<view>
				<text> 基于 </text>
				<text style="padding: 0 .4rem ;">&nbsp;<strong>uniapp+vue2+uview2</strong>&nbsp;</text>
				<text>制作的一款简易智慧城市app。没有任何实际运用作用，没有任何实际权限隐私，只是当作练习和学习，通过接口模拟应用实际开发。</text>
			</view>
			<br>
			<view>
				<u--text text="接口来源" class="title red-title" :bold="true" size="18"></u--text>
				<br>
				<view>
					<text> 在查找比赛资料时意外的搜索到移动开发赛项2022年的服务接口： </text>
					<text>(API服务器由东软教育科技集团提供，本项目仅使用API实现功能，本人不具有任何修改及鉴权权限)</text>
				</view>
			</view>			
			<br>
			<view>
				<u--text text="项目周期" class="title success-title" :bold="true" size="18"></u--text>
				<view style="padding-top: 1rem;">
					<u-row>
						<u-col span="6">
							<u--text text="历时" align="center" color="#3c9cff" size="18" :bold="true"></u--text>
							<view class="flex">
								<view>
									<u-count-to :startVal="0"  fontSize="18" color="#303133" :endVal="32" :duration="3000"></u-count-to>
									<text class="unit">天</text>
								</view>
							</view>
						</u-col>
						<u-col span="6">
							<u--text text="团队"  align="center" color="#3c9cff" size="18" :bold="true"></u--text>
							<view class="flex">
								<view>
									<u-count-to fontSize="18" :startVal="0" color="#303133" :endVal="1" :duration="3000"></u-count-to>
									<text class="unit">人</text>
								</view>
							</view>
						</u-col>
					</u-row>
					<br>
					<u-row>
						<u-col span="6">
							<u--text text="页面数" align="center" color="#3c9cff" size="18" :bold="true"></u--text>
							<view class="flex">
								<view>
									<u-count-to :startVal="0"  fontSize="18" color="#303133" :endVal="24" :duration="3000"></u-count-to>
									<text class="unit">页</text>
								</view>
							</view>
						</u-col>
						<u-col span="6">
							<u--text text="完成度"  align="center" color="#3c9cff" size="18" :bold="true"></u--text>
							<view class="flex">
								<view>
									<u-count-to fontSize="18" :startVal="0" color="#303133" :endVal="85" :duration="3000"></u-count-to>
									<text class="unit">%</text>
								</view>
							</view>
						</u-col>
					</u-row>
					<view>
					</view>
				</view>
			</view>
			<br>
			<view>
				<u--text text="其他说明" class="title warning-title" :bold="true" size="18"></u--text>
				<br>
				<view>
					<text>因为使用的是uniapp,所有部分复杂的功能体验不太好，可能有一些很明显的bug，是因为我根本不会，或者是因为懒得改。</text>
					<text>还有源码写的很复杂也极其乱哈，后期因为很多功能接口都差不多就直接cv了。组件没有得到很好的复用，下次一定。</text>
				</view>
			</view>
			<br>
			<u-loadmore 
							:loadmoreText="'就此完结'"
							color="#1CD29B"
							lineColor="#1CD29B"
							
							line
			    />
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				image:'https://www.loliapi.com/acg/pp/'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.flex{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	
}
.avatar{
	box-shadow: 0 0 10px #fff;
	border-radius: 1000px;
	width: 80px;
	height: 80px;
	animation: spin 120s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg); /* 从0度开始旋转 */
  }
  to {
    transform: rotate(360deg); /* 旋转到360度，完整一圈 */
  }
}
 .title{
 	font-weight: 300;
 	border-left: 10rpx solid #3c9cff;
 	padding-left: 8px;
 }
 .red-title{
	 border-left: 10rpx solid #e45656;
 }
 .warning-title{
	 border-left:10rpx solid #f1a532 ;
 }
 .success-title{
	 border-left:10rpx solid #53c21d ;
 }
 .unit{
	 font-size: 14px;
	padding: 0 .4rem;
	font-weight: bold;
 }
 .padding-top{
	
 }
</style>

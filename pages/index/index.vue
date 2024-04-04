<template>
	<view class="container">
		<view >
			<u-sticky bgColor="#fff" >
				<!-- #ifdef APP-PLUS -->
				<view class="status_bar"></view>
				<!-- #endif -->
				<u-search :clearabled="true" shape="square" margin=".1rem 1rem" ></u-search>
			    <u-tabs :list="tabs" @click="toggle"></u-tabs>
			  </u-sticky>
			  <component :is="pagesArrayNames[tabsCurrent]"></component>
		</view>
		
	</view>	
</template>

<script>
	import job_hunting from '@/component/job-hunting/job-hunting.vue'
	import volunteer from '@/component/volunteer/volunteer.vue'
	import movie from '@/component/movie/movie.vue'
	import takeaway from '@/component/takeaway/takeaway.vue'
	import citysubway from '@/component/citysubway/citysubway.vue'
	import stopcar from '@/component/stopcar/stopcar.vue'
	import outpatient from '@/component/outpatient/outpatient.vue'
	import kitchen from '@/component/kitchen/kitchen.vue'
	import pet from '@/component/pet/pet.vue'
	import logistics from '@/component/logistics/logistics.vue'
	import charity from '@/component/charity/charity.vue'
	import talents from '@/component/talents/talents.vue'
	import rubbish from '@/component/rubbish/rubbish.vue'
	import library from '@/component/library/library.vue'
	import law from '@/component/law/law.vue'
	import government from '@/component/government/government.vue'
	import buslines from '@/component/buslines/buslines.vue'
	import livingmeng from '@/component/livingment/livingment.vue'
	import activities from '@/component/activities/activities.vue'
	import traffic from '@/component/traffic/traffic.vue'
	import home from '@/component/home/home.vue'
	export default {
		components: {
		   // 在父组件中局部注册子组件  
		    'volunteer':volunteer,
			'movie':movie,
			'takeaway':takeaway,
			 'citysubway':citysubway,
		   'job-hunting': job_hunting,
			'stopcar':stopcar,
		  'outpatient':outpatient,
		  'kitchen':kitchen,
		  'pet':pet,
		  'logistics':logistics,
		  'charity':charity,
		  'talents':talents,
		  'rubbish':rubbish,
		  'library':library,
		  'law':law,
		  'government':government,
		  'buslines':buslines,
		  'livingmeng':livingmeng,
		  'activities':activities,
		  'traffic':traffic,
		  'home':home
		 },
		data() {
			return {
				pagesArrayNames:[
					'home',
					'volunteer',
					'movie',
					'takeaway',
					'citysubway',
					'job-hunting',
					'stopcar',
					'outpatient',
					'kitchen',
					'pet',
					'logistics',
					'charity',
					'talents',
					'rubbish',
					'library',
					'law',
					'government',
					'buslines',
					'livingmeng',
					'activities',
					'traffic'
				],
				tabs: [{
						name: '首页',
					}, 
					{
						name:'志愿活动'
					},{
						name: '看电影',
					}, {
						name: '外卖订餐'
					}, {
						name: '城市地铁'
					}, {
						name: '找工作'
					}, {
						name: '停车'
					}, {
						name: '门诊预约'
					}, {
						name: '厨房助手'
					}, {
						name: '宠物医生'
					},
					{
						name:'物流查询'
					},
					{
						name:'爱心公益',
					},
					{
						name:'青年驿站'
					},
					{
						name:'垃圾分类'
					},
					{
						name:"数字图书馆"
					},
					{
						name:'法律诉求'
					},
					{
						name:'政府服务'
					},
					{
						name:'智慧巴士'
					},
					{
						name:"生活缴费"
					},
					{
						name:'活动管理'
					},
					{
						name:'智慧交管'
					}
					],
				tabsCurrent:0,
			}
		},
		
		methods: {
			toggle(item) {
						this.tabsCurrent = item.index;
						
					},

		}
	}
</script>

<style lang="scss">
	.status_bar {
	        height: var(--status-bar-height);
	        width: 100%;
	    }
	
	.container{
		font-weight: 300!important;
		background-color:$u-bg-color;
	}

	
</style>

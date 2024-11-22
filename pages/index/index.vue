<template>
	<view class="content">

	</view>
</template>

<script>
	// 根据实际路径引入
	import api from "../../src/api/homeApi.js"
	export default {
		data() {
			return {
				title: 'Hello',
				petDetail: null
			};
		},
		onLoad() {
			this.fetchPetDetail();
		},
		methods: {
			fetchPetDetail() {
				api.getPetDetail()
					.then(data => {
						console.log(data, '000000000000');
						this.petDetail = data; // 将获取到的数据赋值给 petDetail
					})
					.catch(err => {
						console.error('请求失败', err);
						uni.showToast({
							title: '网络错误',
							icon: 'none',
						});
					});
			},
		}
	};
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
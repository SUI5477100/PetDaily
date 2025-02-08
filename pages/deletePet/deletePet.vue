<template>
	<view class="container">
		<uni-nav-bar left-icon="left" title="宠物列表" @clickLeft="back" height="160rpx" />
		<view class="content" v-if="items.length>0">
			<view class="select-pet">
				删除宠物
			</view>
			<view class="uni-list">

				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.id">
						<checkbox color="#FFCC33" :value="item.id" />
						<img :src="item.pet_pic" class="pet-img" />
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
			</view>

			<view class="saveBtn" @click="clickBtn">
				确认删除
			</view>
			<u-toast ref="uToast"></u-toast>
			<u-modal :show="show" :title="title" :content='content' :showCancelButton="true" @cancel="cancelBtn"
				@confirm="closeSelectPet"></u-modal>
			<!-- <u-button class="saveBtn"  @click="show = true" >打开</u-button> -->
			<!-- <u-button @click="show = false" >打开</u-button> -->
		</view>
		<view class="empty-container" v-else>
			
			<img src="https://www.serverzhu.com/petImg/img_default_empty.png" style="width: 590rpx ;height: 481rpx;">
<view class="" style=" color: #ffac5e; font-size: 36rpx;font-weight: 600;">
				还没有宠物哦 ( ˘･з･)
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../utils/api.js';
	export default {
		data() {
			return {
				selectPet: [],
				items: [],
				list: [{
					type: "",
					message: "",
				}, ],
				show: false,
				title: '删除宠物',
				content: 'uView的目标是成为uni-app生态最优秀的UI框架'
			}
		},
		onReady() {
			this.getPetList()
		},
		methods: {
			// 返回铲屎官页面
			back() {
				uni.switchTab({
					url: '/pages/master/master'
				});
			},
			checkboxChange(e) {
				var items = this.items,
					values = e.detail.value;
				this.selectPet = values
				console.log(values, '0000000000')
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.id.toString())) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
			closeSelectPet() {
				console.log(this.selectPet)
				this.deletePets(this.selectPet)
			},
			// 获取宠物列表
			async getPetList() {
				try {
					const response = await api.getPet()
					console.log(response)
					this.items = response.data
				} catch (err) {
					console.log(err)
					this.sendToast('error', '获取宠物信息失败了(´～`)')
				}
			},
			// 修改调用方法名
			async deletePets(data) {
				try {
					const response = await api.deletePet(data)
					if (response.status === 200) {
						// 新增重置逻辑
						this.selectPet = [] // 清空选中数组
						this.show = false
						await this.getPetList() // 确保刷新完成
					}
					this.sendToast('success', '删除成功(｡í _ ì｡)')
				} catch (err) {
					console.log(err)
					this.sendToast('error', '删除失败了哦~ (੭ ᐕ)੭？')
				}
			},
			// 错误/正确信息提醒
			sendToast(type, message) {
				this.list.type = type
				this.list.message = message
				this.showToast(this.list)
			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
				});
			},
			clickBtn() {
				if (this.selectPet.length === 0) {
					this.sendToast('warning', '请先选择要删除的宠物')
					return
				}

				// 动态生成带换行符的内容
				const names = this.items
					.filter(item => this.selectPet.includes(item.id.toString()))
					.map(item => `【${item.name}】`)
					.join('\n')

				this.content = `确认删除以下宠物吗？\n${names}`
				this.show = true
			},
			cancelBtn() {
				this.show = false
			}
		}
	}
</script>


<style scoped lang="less">
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.content {
		background-image: url('https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: repeat-y;

		// background-color: #ffeeac;
		width: 100%;
	}

	.select-pet {
		font-weight: 600;
		font-size: 36rpx;
		margin: 30rpx;
	}

	.pet-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		margin: 30rpx;
	}

	.saveBtn {
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90%;
		background-color: #ffeb3b;
		height: 100rpx;
		border-radius: 50rpx;
		border: 4rpx solid #000;
	}


	/deep/.uni-indexed-list__menu {
		width: 30rpx !important;
	}

	/deep/.uni-indexed-list__title-wrapper {
		height: 0rpx;
		background-color: #fff !important;
	}

	/deep/.uni-indexed-list__list {
		border-top-width: 0px !important;
	}

	/deep/.uni-list-cell {
		display: flex;
		margin: 30rpx;
		align-items: center;
	}

	/deep/.uni-indexed-list__item-border {
		border-bottom-color: #fffce0 !important;
	}

	/deep/.uni-navbar__header-container-inner {
		align-items: flex-end !important;
		margin-bottom: 20rpx;
	}

	/deep/.uni-navbar__header-btns-left {
		align-items: flex-end !important;
		margin-bottom: 20rpx;
	}

	/deep/.uni-navbar--border {
		border-bottom-color: #fffce0 !important;
	}

	/deep/.uni-navbar__header {
		background-color: #fffce0 !important;
	}

	.empty-container {
		position: absolute;
		/* 关键改动：脱离文档流 */
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* 覆盖整个屏幕 */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		z-index: -1;
	}
</style>

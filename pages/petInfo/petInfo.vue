<template>
	<view class="content">
		<view class="element"></view>
		<view class="element-content">
			<view style="margin-left: auto;">
				<view class="editBtn" @click="toggleEdit">
					{{editInfo}}
				</view>
			</view>
			<view class="top">
				<view class="upload">
					<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @select="select"
						@progress="progress" @success="success" @fail="fail" :limit="1" :image-styles="imageStyles"
						class="custom-file-picker" />
				</view>
				<view class="info">

					<uni-forms :modelValue="formData" style="width: 100%;">
						<uni-forms-item label="姓名:" required>
							<uni-easyinput v-if="isEditing" v-model="baseFormData.name" placeholder="请输入姓名" />
							<view v-else class="save">
								<text>{{ baseFormData.name }}</text>
							</view>
						</uni-forms-item>

						<uni-forms-item label="年龄:" required>
							<view class="flex-center">
								<uni-easyinput v-if="isEditing===true" v-model="baseFormData.age" placeholder="请输入年龄" />
								<view v-else class="save">
									<text>{{ baseFormData.age }}</text>
								</view>
							</view>
						</uni-forms-item>
						<uni-forms-item label="体重:" required>
							<view class="flex-center">
								<uni-easyinput v-if="isEditing===true" v-model="baseFormData.weight"
									placeholder="请输入体重" />
								<view v-else class="save">
									<text>{{ baseFormData.weight }}</text>
								</view>
							</view>
						</uni-forms-item>
						<uni-forms-item label="性别:" required>
							<uni-data-checkbox v-if="isEditing===true" v-model="baseFormData.sex" :localdata="sexs" />
							<view v-else class="save">
								<text>{{petSex}}</text>
							</view>
						</uni-forms-item>
					</uni-forms>
					<!-- <button @click="submitForm">Submit</button> -->
				</view>
			</view>
			<view class="center">

				<uni-forms-item label="疫苗:">
					<uni-easyinput type="textarea" v-if="isEditing===true" v-model="baseFormData.introduction"
						placeholder="请输入接种过的疫苗" placeholderStyle="font-size: 28rpx"></uni-easyinput>
					<view v-else class="save content-container">
						<text>{{baseFormData.introduction}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="绝育:">
					<uni-data-select v-if="isEditing===true" v-model="baseFormData.sterilization" :clear='false'
						:localdata="sterilization" @change="change"></uni-data-select>
					<view v-else class="save">
						<text>{{petSterilization}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="性格:">
					<view v-if="isEditing===true">
						<view class="inputCss">
							<input class="uni-input" placeholder="请输入宠物的性格" v-model="petCharacter" />
							<img src="https://www.serverzhu.com/add3.png" @click="addTag" class="addBtn" />
						</view>
						<view style="display: flex;">
							<view class="tag-list" v-for="(item,index) in baseFormData.character" :key="index">
								<u-tag :text="item.name" type="warning" closable @close="removeTag(index)"></u-tag>
							</view>
						</view>
					</view>
					<view v-else style="display: flex; gap: 10rpx;">
						<view v-for="(item,index) in  baseFormData.character" :key="index">
							<u-tag :text="item.name" type="warning"></u-tag>
						</view>
					</view>
				</uni-forms-item>
			</view>
			<view class="bottom">
				<uni-forms-item label="遇见:">
					<view v-if="isEditing===true" class="day-css" @click="show = true">
						<view style="margin-left: 20rpx;">{{formattedTime}}</view>
						<u-datetime-picker :show="show" v-model="baseFormData.date" mode="date" @confirm="confirmTime"
							@cancel="closeBtn"></u-datetime-picker>
					</view>
					<view v-else style="margin-left: 20rpx;">{{formattedTime}}</view>
				</uni-forms-item>

				<uni-forms-item label="生日:">
					<view v-if="isEditing===true" class="day-css" @click="show = true">
						<view style="margin-left: 20rpx;">{{formattedBirthTime}}</view>
						<u-datetime-picker :show="show2" v-model="baseFormData.dateBirthday" @confirm="confirmBitrhTime"
							@cancel="closeBtn" mode="date"></u-datetime-picker>
					</view>
					<view v-else style="margin-left: 20rpx;">{{formattedBirthTime}}</view>
				</uni-forms-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				imageValue: [],
				petCharacter: '',
				isEditing: false,
				show: false,
				show2: false,
				imageStyles: {
					width: 150,
					height: 200,
					border: {
						color: "#000",
						width: 2,
						radius: '20rpx'
					},
				},
				baseFormData: {
					name: 'xiaoju',
					character: [],
					age: '12个月',
					weight: '',
					date: Number(new Date()),
					dateBirthday: Number(new Date()),
					introduction: '三联疫苗',
					sex: 1,
					sterilization: 1,
				},
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				sterilization: [{
					text: '未绝育',
					value: 0
				}, {
					text: '已绝育',
					value: 1
				}],
			};
		},

		computed: {
			editInfo() {
				return this.isEditing ? '保存' : '编辑';
			},
			petSex() {
				return this.baseFormData.sex ? '女' : '男';
			},
			petSterilization() {
				return this.baseFormData.sterilization ? '已绝育' : '未绝育';
			},

			// 计算属性，用于格式化时间戳
			formattedTime() {
				return this.formatTimestamp(this.baseFormData.date);
			},
			formattedBirthTime() {
				return this.formatTimestamp(this.baseFormData.dateBirthday);
			}
		},
		methods: {

			// 添加标签
			addTag() {
				const character = this.petCharacter
				this.baseFormData.character.push({
					name: character,
				})
				this.petCharacter = ''
				console.log(this.baseFormData, '88888888f')
			},
			// 删除标签
			removeTag(index) {
				this.baseFormData.character.splice(index, 1);
				console.log(this.baseFormData, '88888888f')
			},

			toggleEdit() {
				this.isEditing = !this.isEditing;
				// 只有当按钮是编辑的时候更新数据
				if (this.isEditing === false) {
					this.baseFormData.date = this.formattedTime;
					this.baseFormData.dateBirthday = this.formattedBirthTime;
					console.log('Formatted Date:', this.baseFormData.date);
				}
			},
			// 格式化时间戳
			formatTimestamp(timestamp) {
				const date = new Date(timestamp);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				return `${year}-${month}-${day}`;
				this.baseFormData.date = `${year}-${month}-${day}`;
				this.baseFormData.dateBirthday = `${year}-${month}-${day}`;
			},
			confirmTime() {
				this.show = false
			},
			confirmBitrhTime() {
				this.show = false
			},
			closeBtn() {
				this.show = false
				this.show2 = false
			},
			// 文件上传相关
			change(e) {
				console.log(e)
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
		}
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #fffce0;
		width: 100%;
		height: 100vh;
	}

	.element {
		position: relative;
		width: 88%;
		// margin-top: 5%;
		height: 90vh;
		border-radius: 40rpx;
		border: 4rpx solid #000;
		background-color: #ffeb3b;
		transform: rotate(-4deg);
		transform-origin: center;
	}

	.element-content {
		position: absolute;
		width: 90%;
		// margin-top: 5%;
		height: 98vh;
		border-radius: 40rpx;
		border: 4rpx solid #000;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top {
		width: 92%;
		// height: 35%;
		// background-color: #ff6f52;
		display: flex;

		align-items: center;
	}

	.upload {
		// background-color: #ceff5c;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.info {
		padding-left: 40rpx;
		width: 65%;
		// background-color: #ceff5c;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.custom-file-picker {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.center {
		width: 92%;
		// height: 35%;
	}

	.bottom {
		width: 92%;
		height: 30%;
		// margin-bottom: 40rpx;
		// border-radius: 40rpx;
		// flex-direction: column;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// background-color: #ffeb9e;
	}

	/deep/.uni-forms-item__label {
		width: 100rpx !important;
	}

	/deep/.is-direction-left {
		align-items: center;
	}

	/deep/.checklist-box {
		margin-right: 20rpx !important;
	}

	.editBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
		color: #fff;
		width: 100rpx;
		font-size: 28rpx;
		border-radius: 20rpx;
		height: 60rpx;
		margin-right: 40rpx;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}

	.uni-input {
		width: 80%;
	}

	.input-vaccine {
		width: 100%;
	}

	.addBtn {
		width: 40rpx;
		height: 40rpx;
		margin-right: 5rpx;
	}

	.addBtn:active {
		background-color: #f3f3f3;
		border-radius: 80rpx;
	}

	.inputCss {
		display: flex;
		padding: 0 10rpx;
		padding-left: 20rpx;
		height: 66rpx;
		border-radius: 8rpx;
		border: 2rpx solid #e5e5e5;
		justify-content: space-between;
		align-items: center;
	}

	/deep/.uni-select__input-placeholder {
		font-size: 28rpx;
	}

	/deep/.uni-forms {
		width: 100%;
	}

	.save {
		padding-left: 20rpx;
		font-size: 32rpx;
		height: 62rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
	}

	/deep/.uni-forms-item__label {
		padding: 0rpx !important;
	}

	/deep/.checklist-group {
		flex-wrap: nowrap !important;
	}

	.content-container {
		height: 120rpx;
		max-height: 120rpx;
		overflow-y: auto;
		padding: 10rpx;
	}

	.tag-list {
		display: flex;
		flex-wrap: nowrap;
		gap: 10rpx;
	}

	/deep/.uni-forms-item__label {
		font-size: 32rpx;
		font-weight: 600;
	}

	/deep/.u-tag__text {
		font-size: 32rpx;
	}

	/deep/.uni-easyinput__content-textarea {
		height: 120rpx;
		min-height: 120rpx;
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.day-css {
		flex: 1;
		border: 2rpx solid #dcdfe6;
		height: 66rpx;
		display: flex;
		align-items: center;
		border-radius: 8rpx;
	}
</style>
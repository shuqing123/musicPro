<template>
	<view>
		<view class="cu-custom" :style="'background-color: #fff;'">
			<view @tap="BackPage" v-if="isBack">
				<text class="iconfont icon-back"></text>
				<slot name="backText"></slot>
			</view>
			<slot name="left"></slot>
			<slot name="content"></slot>
			<slot name="right"></slot>
		</view>
		<view style="height: 80upx;">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		name: 'cu-custom',
		computed: {
		},
		props: {
			isBack: {
				type: [Boolean, String],
				default: false
			}
		},
		methods: {
			BackPage() {
				/* uni.navigateBack({
					delta: 1
				}); */
				history.back()
			}
		}
	}
</script>

<style lang="scss">
	.cu-custom {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		width: 100%;
		height: 80upx;
		z-index: 1000;
		padding: 0 $uni-spacing-row-base;
		justify-content: space-between;
		align-items: center;
		.iconfont {
			font-size: 60upx;
		}
	}
</style>

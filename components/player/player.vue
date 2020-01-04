<template>
	<view class="player-main" v-if="songList.length">
		<view 
			class="player-song" 
			v-for="(item,index) of songList" 
			:key="index"
			v-if="songId == item.id"
			@tap="goMusic()"
		>
			<image 
				:src="item.al.picUrl+'?param=50y50'" 
				:style="paused
				? 'animation: rotate 4s infinite linear running;' 
				: 'animation: rotate 4s infinite linear paused;'"
			/>
			<view class="player-detail">
				<view class="player-name">{{item.name}}</view>
				<view class="player-author">
					<text v-for="(it,i) of item.ar" :key="i">{{it.name + '/'}}</text>
				</view>
			</view>
		</view>
		<view class="player-control">
			<text 
				:class="paused ? 'iconfont icon-pause':'iconfont icon-play'" 
				@click="paused ? pause() : play()"
			>
			</text>
			<text class="iconfont icon-sort" @click="open"></text>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="player-popup">
				<view class="player-popup-header">
					<text>循环列表 ({{songList.length}})</text>
					<text class="iconfont icon-delete" @tap="clear"></text>
				</view>
				<scroll-view 
					class="player-popup-content" 
					scroll-y="true"
					:scroll-top="scrollTop"
				>
					<view 
						v-for="(item,index) in songList" 
						:key="index"
						class="player-popup-list"
					>
						<view 
							:class=" item.id === songId ?'player-list-detail active' : 'player-list-detail'"
							@tap="item.id !== songId ? selectSong(item.id) : ''"
						>
							<text style="font-size: 32upx;">{{ item.name }}</text>
							<text style="font-size: 24upx;color: #848484">{{" - "+item.ar[0].name}}</text>
						</view>
						<text class="iconfont icon-delete1" @tap="deleteSongId(item.id)"></text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import Vuex from "vuex"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	export default {
		data() {
			return {
				active: '',
				scrollTop: 0
			}
		}, 
		computed: {
			...Vuex.mapState(['songList','audio','paused','songId'])
		},
		methods: {
			...Vuex.mapMutations(['play','pause','clearSongList']),
			...Vuex.mapActions(['getSongs','getSongList','getAudioUrl','deleteSong']),
			goMusic() {
				uni.navigateTo({
					url: '/pages/music/music'
				})
			},
			open(){
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open()
				let num = this.songList.findIndex((item) => {
					return item.id === this.songId
				});
				// console.log(num);
				this.scrollTop = (num - 3) * (90/750) * window.innerWidth
			},
			clear(){
				this.clearSongList()
				this.$refs.popup.close()
			},
			selectSong(id){
				this.getAudioUrl(id).then(()=>{
					this.play()
				})
			},
			deleteSongId(id){
				if(id == this.songId){
					//console.log(333);
					this.deleteSong(id).then(res=>{
						console.log(res);
						return this.getAudioUrl(res)
						//this.play()
					}).then(()=>{
						this.play()
					})
				}else {
					this.deleteSong(id)
				}
			}
		},
		created() {
		},
		components: {
			uniPopup
		},
	}
</script>

<style lang="scss">
	.player-main {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 100;
		height: 100upx;
		border-top: 1px solid #efefef;
		.player-song{
			display: flex;
			align-items: center;
			margin-left: 10upx;
			width: 560upx;
			image {
				margin-right: 10upx;
				width: 80upx;
				height: 80upx;
				border-radius: $uni-border-radius-circle;
			}
		}
		.player-detail {
			width: 470upx;
			.player-author {
				font-size: $uni-font-size-sm - 2;
			}
			.player-name {
				font-weight: bold;
				font-size: $uni-font-size-base;
				//$uni-font-size-sm
			}
		}
		
		
		.player-control {
			display: flex;
			align-items: center;
			.iconfont {
				font-size: 40upx;
				margin: 0 20upx;
			}
		}
	}
	.player-popup {
		padding: 0 $uni-spacing-row-base;
		background-color: #fff;
		border-radius: 32upx 32upx 0 0;
		.player-popup-header {
			display: flex;
			padding: 32upx 0;
			font-size: $uni-font-size-lg;
			font-weight: bold;
			justify-content: space-between;
			border-bottom: 1px solid #848484;
		}
		.player-popup-content {
			height: 690upx;
			.player-list-detail {
				width: 670upx;
			}
			.active {
				color: #c93733;
			}
			view.player-popup-list{
				display: flex;
				height: 90upx;
				padding: $uni-spacing-col-lg 0;
				justify-content: space-between;
			}
		}
	}
</style>

<template>
	<view class="music">
		<view 
			class="music-detail" 
			v-for="(item,index) in songList" 
			:key="index"
			v-if="item.id == songId"
		>
			<cu-custom isBack>
				<block slot="content">
					<view class="music-name">
						<view>{{item.name}}</view>
						<view style="font-weight: 300;color: #999;font-size: 24upx;">
							<text v-for="(it,i) of item.ar" :key="i">{{it.name}}</text>
						</view>
					</view>
				</block>
			</cu-custom>
			<view class="music-pic" @tap="goLyric(item.id)">
				<image 
					:src="item.al.picUrl + '?param=150y150'" 
					:style="paused 
					? 'animation: rotate 4s infinite linear running;' 
					: 'animation: rotate 4s infinite linear paused;'"
				>
			</view>
		</view>
		<view class="music-block">
			<view class="slider">
				<view>{{ start }}</view>
				<slider :value="value" @changing="changing" @change="change" block-size='12' backgroundColor='#4d4d4a' activeColor='#ccc'/>
				<view>{{ total }}</view>
			</view>
			<view class="music-control">
				<text 
					:class="mode === 1 && 'iconfont icon-danquxunhuan' || mode === 2 && 'iconfont icon-loop1' || mode === 3 && 'iconfont icon-loop'"  
					@click.stop="setMode()"
				>
				</text>
				<text class="iconfont icon-next" style="transform: rotate(180deg);" @tap="prev"></text>
				<text
					:class="paused ? 'iconfont icon-pause':'iconfont icon-play'" 
					@click="paused ? pause() : play()"
				>
				</text>
				<text class="iconfont icon-next" @tap="next"></text>
				<text class="iconfont icon-sort" @click="open"></text>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="player-popup">
				<view class="player-popup-header">
					<text>
						{{ mode === 1 && '单曲' || mode === 2 && '顺序' || mode === 3 && '随机' }} ({{songList.length}})
					</text>
					<text class="iconfont icon-delete" @tap="clear"></text>
				</view>
				<scroll-view 
					class="player-popup-content" 
					scroll-y
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
							<text 
								style="font-size: 24upx;color: #848484"
								v-for="(it,i) of item.ar"
								:key="i"
							>
								{{" - "+it.name}}
							</text>
						</view>
						<text class="iconfont icon-delete1" @tap="deleteSongId(item.id)"></text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	import {formatTime} from '../../common/util.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	export default {
		data() {
			return {
				value: 0,
				updateState: true,
				total: '',
				start: '00:00',
				active: '',
				scrollTop: 0
			};
		},
		computed: {
			...Vuex.mapState(['audio', 'paused', 'songList', 'songId', 'musicIndex', 'mode','apiUrl'])
		},
		methods: {
			...Vuex.mapMutations(["play", "pause",'clearSongList','setMode']),
			...Vuex.mapActions(['getAudioUrl','deleteSong']),
			plan() {
				// 当前播放时间
				const start = Math.round(this.audio.currentTime)
				this.start = formatTime(start)
				console.log(start);
				if (this.updateState) {
					this.value = this.audio.currentTime / this.audio.duration * 100
				}
				
			},
			change(e) {
				let t = this.audio.duration*(e.detail.value/100);
				this.audio.seek(t)
				this.updateState = true;
			},
			changing() {
				this.updateState = false;
			},
			download(){
				// downloadFile 相当于临时缓存
				uni.downloadFile({
					url: this.audio.src,
					success: (res) => {
						//console.log(res)
						
						// 浏览器下载方式
						var a = document.createElement('a');
						a.href = res.tempFilePath;
						a.download = this.detail.songs[0].name + '.mp3'
						a.click()
						
						// 手机app下载方式 永久保存
						/* uni.saveFile({
							tempFilePath: res.tempFilePath
						}) */
					}
				})
			},
			next() {
				let num = this.musicIndex+1
				if(num >= this.songList.length){
					num = 0
				}
				
				this.getAudioUrl(this.songList[num].id)
					.then(()=>{
						this.play()
					})
			},
			prev() {
				let num = this.musicIndex-1
				if(num < 0){
					num = this.songList.length - 1
				}
				
				this.getAudioUrl(this.songList[num].id)
					.then(()=>{
						this.play()
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
				uni.navigateTo({
					url: '/pages/index/index'
				})
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
			},
			goLyric(id){
				uni.request({
					url: this.apiUrl + `/lyric?id=${id}`,
					success: (res) => {
						console.log(res.data.lrc.lyric);
					}
				})
			}
		},
		mounted() {
			// 当音乐时间改变的事件
			this.audio.onTimeUpdate(this.plan);
			const total = Math.round(this.audio.duration)
			this.total = formatTime(total)
			//console.log(formatTime(total));
			const start = Math.round(this.audio.currentTime)
			this.start = formatTime(start)
			//console.log(formatTime(start));
			this.value = this.audio.currentTime / this.audio.duration * 100
		},
		destroyed: function () {
		    this.audio.offTimeUpdate(this.plan)
		},
		components: {
			uniPopup
		}
	}
</script>

<style lang="scss">
	.music-name {
		width: 608upx;
		font-size: $uni-font-size-lg + 4;
		font-weight: bold;
	}
	.music-pic {
		display: flex;
		justify-content: center;
		position: fixed;
		width: 100%;
		height: 100%;
		padding-bottom: 240upx;
		image {
			margin-top: 244upx;
			width: 370upx;
			height: 370upx;
			border-radius: 50%;
		}
	}
	.slider {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: $uni-font-size-sm;
		slider {
			margin: 0 20upx;
			width: 530upx;
		}
	}
	.music-block {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
	.music-control {
		display: flex;
		margin: 0 $uni-spacing-row-lg;
		justify-content: space-between;
		align-items: center;
		.iconfont {
			font-size: 46upx;
			font-weight: bold;
		}
		.icon-play,.icon-pause {
			font-size: 106upx;
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

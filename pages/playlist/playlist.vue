<template>
	<view class="playlist">
		<cu-custom isBack>
			<block slot="content">
				<view class="playlist-title">
					<view style="font-weight: bold;">歌单</view>
					<view class="playlist-title-name">{{ playlist.name }}</view>
				</view>
			</block>
		</cu-custom>
		<view class="playlist-list">
			<view
				class="playlist-li"
				v-for="(item, index) in playlistDetail"
				:key="index"
				@tap="handleSongList(item.id)"
			>
				<view class="playlist-list-top">{{ item.name }}</view>
				<view class="playlist-list-bottom">
					<text v-for="(it,i) of item.ar" :key="i">{{ it.name + '/'}}</text>
				</view>
			</view>
		</view>
		<player></player>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	import player from '@/components/player/player.vue'
	
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...Vuex.mapState(['playlist' , 'playlistDetail','songList'])
		},
		methods: {
			...Vuex.mapMutations(['changeSongList','play']),
			...Vuex.mapActions(['getAudioUrl']),
			handleSongList(id){
				// console.log(id);
				let num = this.songList.findIndex((item) => {
					return item.id === id
				});
				if(num===-1){
					this.changeSongList()
				}
				this.getAudioUrl(id).then(()=>{
					this.play()
				})
			}
		},
		components: {
			player
		}
	}
</script>

<style lang="scss">
	.playlist {
		.playlist-title {
			width: 608upx;
			.playlist-title-name {
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}
		}	
		.playlist-list {
			margin:50upx $uni-spacing-row-lg 110upx;
			.playlist-li {
				margin-top: $uni-spacing-col-lg;
				.playlist-list-top {
					font-size: $uni-font-size-lg;
				}
				.playlist-list-bottom {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
				}
			}
		}
	}
</style>

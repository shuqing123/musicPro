=<template>
	<view class="index">
		<cu-custom>
			<block slot="left">
				<text class="iconfont icon-menu" @tap="openDrawer()"></text>
			</block>
			<block slot="content">发现</block>
			<block slot="right">
				<text class="iconfont icon-search" @tap="goSearch()"></text>
			</block>
		</cu-custom>
		<swiper indicator-dots autoplay circular indicator-active-color="#c93733">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<view>
					<image :src="item.imageUrl" alt="" />
				</view>
			</swiper-item>
		</swiper>
		<view class="title">推荐歌单</view>
		<view class="list">
			<view 
				class="item" 
				v-for="(item,index) in playlists" 
				:key="index"
				@tap="goPlaylist(item)"
			>
				<image :src="item.coverImgUrl" lazy-load="true" mode="widthFix"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
		<player></player>
		<uni-drawer :visible="visible" @close="closeDrawer">
			抽屉
		</uni-drawer>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import player from '@/components/player/player.vue'
	export default {
		data() {
			return {
				banner: [],
				playlists: {},
				visible: false,
			}
		},
		computed: {
			...Vuex.mapState(['apiUrl'])
		},
		methods: {
			...Vuex.mapMutations(['setPlaylist','setPlaylistDetail']),
			...Vuex.mapActions(['getSrc']),
			openDrawer() { //菜单按钮
				//console.log("这是菜单");
				this.visible = true
			},
			goSearch() { //搜索按钮
				//console.log("这是搜索");
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			closeDrawer() {
				this.visible = false
			},
			goPlaylist(item){
				//console.log(item);
				this.setPlaylist(item)
				uni.request({
					url: this.apiUrl + `/playlist/detail?id=${item.id}`, 
					success: (res) => {
						let detail = res.data.playlist.tracks
						this.setPlaylistDetail(detail)
					}
				});
				uni.navigateTo({
					url: '/pages/playlist/playlist'
				})
			}
		},
		created() {
			//风格像jq的ajax
			uni.request({
				url: this.apiUrl + '/banner', ///personalized/newsong
				success: (res) => {
					this.banner = res.data.banners;
					//console.log(this.banner);
				}
			});
			uni.request({
				url: this.apiUrl + '/top/playlist?limit=6&order=hot', 
				success: (res) => {
					//coverImgUrl  热门歌单
					this.playlists = res.data.playlists
					//console.log(res.data.playlists);
				}
			});
		},
		components: {
			uniDrawer,
			player
		}
	}
</script>

<style lang="scss">
	swiper {
		margin-top: $uni-spacing-col-lg;
		height: 260upx;
		width: 100%;
	}

	swiper-item view {
		margin: 0 $uni-spacing-row-lg;
		width: 684upx;
		height: 100%;
		overflow: hidden;
		border-radius: $uni-border-radius-lg;
	}

	swiper-item image {
		width: 100%;
		height: 100%;
	}

	.title {
		margin: $uni-spacing-col-lg + 8 $uni-spacing-row-lg 0;
		font-size: $uni-font-size-subtitle;
		font-weight: bold;
	}

	.list {
		display: flex;
		margin: $uni-spacing-col-lg $uni-spacing-row-lg 0;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.list .item {
		margin-bottom: $uni-spacing-col-lg + 18;
		width: 214upx;
		// height: 214upx;
	}
	//二行省略
	.list .item view {
		margin-top: $uni-spacing-col-sm;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.list .item image {
		width: 100%;
		height: 214upx;
		border-radius: $uni-border-radius-base;
	}
</style>

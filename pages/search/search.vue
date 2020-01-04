<template>
	<view class="search">
		<cu-custom isBack>
			<block slot="content">
				<input 
					type="text" 
					placeholder="请输入" 
					style="width: 500upx;border-bottom: 1px solid #000000;"
					v-model="text"
					focus
					confirm-type="search"
					@confirm="search()"
				/>
			</block>
			<block slot="right">
				<text class="iconfont icon-search" @tap="search()"></text>
			</block>
		</cu-custom>
		<view class="search-title">
			热门搜索
		</view>
		<view class="search-tag">
			<view @click="search(item.first)" class="tag-view" v-for="(item, index) in hot" :key="index">
				<uni-tag circle="true" :text="item.first" ></uni-tag>
			</view>
		</view>
		<view class="search-title" v-if="searchHistory.length">
			<text>历史记录</text>
			<text @tap="deleteSearchHistory()" class="iconfont icon-delete"></text>
		</view>
		<view>
			<view 
				class="tag-view" 
				v-for="(item, index) in searchHistory" 
				:key="index"
				@tap="search(item)"
			>
				<uni-tag circle="true" :text="item"></uni-tag>
			</view>
		</view>
		<view class="search-title">
			搜索结果
		</view>
		<view class="search-res">
			<view 
				@click="addSongsList(item.id)" 
				class="search-list"
				v-for="(item, index) in searchList"
				:key="index"
			>
				<view class="search-list-top">{{ item.name }}</view>
				<view class="search-list-bottom">{{ item.artists[0].name }}</view>
			</view>
		</view>
		<player></player>
	</view>
</template>

<script>
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import player from '@/components/player/player.vue'
	import Vuex from 'vuex'
	export default {
		data() {
			return {
				text: '',
				hot:[],
				searchList:[], 
			}
		},
		computed: {
			...Vuex.mapState(['apiUrl','searchHistory'])
		},
		methods: {
			...Vuex.mapMutations(['play','setSearchHistory']),
			...Vuex.mapActions(["getSongList",'getSongs','getAudioUrl']),
			search(text){
				this
					.getSongs({keywords: text || this.text})
					.then(res => {
						this.searchList = res
						this.setSearchHistory(text || this.text)
					})
			},
			addSongsList(id) {
				this.getSongList(id)
				this.getAudioUrl(id).then(() => {
					this.play()
				})
			},
			deleteSearchHistory() {
				this.searchHistory = []
			}
		},
		mounted() {
			uni.request({
				url: this.apiUrl + '/search/hot',
				success: (res) => {
					//console.log(res)
					this.hot = res.data.result.hots
				}
			})
		},
		components: {
			uniTag,
			player
		}
	}
</script>

<style lang="scss">
	.search-tag {
		height: 360upx;
	}
	.tag-view{
		display: inline-block;
		margin: 6upx 20upx;
	}
	.search-title {
		display: flex;
		padding: 0 $uni-spacing-row-lg;
		font-size: $uni-font-size-lg;
		font-weight: bold;
		justify-content: space-between;
	}
	.search-res {
		padding: 0 $uni-spacing-row-lg;
		margin-bottom: 110upx;
		.search-list {
			margin-top: $uni-spacing-col-lg;
			.search-list-top {
				font-size: $uni-font-size-lg;
			}
			.search-list-bottom {
				font-size: $uni-font-size-sm;
				color: #808080;
			}
		}
	}
</style>

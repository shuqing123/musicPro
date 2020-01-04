import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		apiUrl: 'http://localhost:3000',
		//歌曲列表id
		songId: '',
		//播放列表
		songList: [],
		//音乐资源
		audio: uni.createInnerAudioContext(),
		paused: false,
		musicIndex: 0,
		mode: 2,
		//歌单
		playlist: {},
		//歌单详情
		playlistDetail: [],
		searchHistory: []
	},
	mutations: {
		//设歌曲列表id
		setSongId(state,id){
			console.log(id);
			let num = state.songList.findIndex((item) => {
				return item.id === id
			});
			state.musicIndex = num
			uni.request({
				url: state.apiUrl + `/check/music?id=${id}`,
				success: res => {
					//console.log(res.data);
					const {success,message} = res.data
					if(!success){
						uni.showToast({
						    title: res.data.message,
							duration: 2000
						});
					}
				}
			});
			state.songId = id
		},
		//设播放列表
		setSongList(state,{song,id}){
			//console.log(id);
			let num = state.songList.findIndex((item) => {
				return item.id === song.id
			});
			let count = state.songList.findIndex((item) => {
				return item.id === id
			});
			//console.log(count);
			if (num === -1) {
				state.songList.splice(count+1,0,song)
			}
		},
		//清除播放列表
		clearSongList(state,songList){
			state.songList = []
		},
		changeSongList(state){
			state.songList = state.playlistDetail
		},
		//设音乐资源
		setSrc(state, src) {
			state.audio.src = src;
		},
		play(state) {
			state.audio.play()
			state.paused = true
		},
		pause(state) {
			state.audio.pause()
			state.paused = false
		},
		setMode(state) {
			state.mode++;
			if (state.mode === 4) {
				state.mode = 1
			}
		},
		setSearchHistory(state,text){
			//console.log(text);
			if(state.searchHistory.length < 3){
				state.searchHistory.unshift(text)
				//console.log(state.searchHistory);
			}else {
				state.searchHistory.unshift(text)
				state.searchHistory.pop(text)
			}
		},
		setPlaylist(state,playlist){
			state.playlist = playlist
		},
		setPlaylistDetail(state,detail){
			state.playlistDetail = detail
		}
	},
	actions: {
		getSongs({commit, dispatch, state}, {keywords,limit = 10}) {
			//console.log(keywords,limit);
			return new Promise((resolve, reject) => {
				uni.request({
					url: `${state.apiUrl}/search?keywords= ${keywords}&&limit=${limit}`, 
					success: (res) => {
						const songs = res.data.result.songs
						
						resolve(songs)
					}
				});
			})
		},
		getSongList({commit, dispatch, state},ids) {
			let id = state.songId
			return new Promise((resolve, reject) => {
				uni.request({
					url: `${state.apiUrl}/song/detail?ids=${ids}`,
					success: (res) => {
						const song = res.data.songs[0]
						//console.log(detail);
						commit('setSongList',{song,id})
					}
				})
			})
		},
		getAudioUrl({commit, state},id){
			//console.log('getAudioUrl');
			return new Promise((resolve, reject) => {
				uni.request({
					url: `${state.apiUrl}/song/url?id=${id}`,
					success: (res) => {
						//console.log(res);
						const url = res.data.data[0].url
						commit('setSongId', id)
						commit('setSrc', url)
						resolve(url)
					}
				})
			})
		},
		deleteSong({dispatch,state},id){
			return new Promise((resolve, reject) => {
				//console.log(id,state.songId);
				let len = state.songList.length
				let num = state.songList.findIndex((item) => {
					return item.id === id
				});
				state.songList.splice(num,1);
				if(!len) {
					state.audio.pause()
					state.paused = false
					return
				}
				if(num == len -1 ) {
					state.songId = state.songList[0].id
					//console.log(state.songId);
					resolve(state.songId)
					return 
				}
				if(id == state.songId) {
					state.songId = state.songList[num].id
					//console.log(111)
					resolve(state.songId)
					return 
				}
			})
		}
	}
})
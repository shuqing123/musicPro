
<script>
	import Vue from 'vue'
	import Vuex from 'vuex'
	export default {
		onLaunch: function () {
			console.log('App Launch')
			this.audio.onEnded(() => {
				if (this.mode === 1){
					//单曲循环
					this.play()
				}else if (this.mode === 2) {
					//console.log(22);
					let num = this.musicIndex+1
					if(num >= this.songList.length){
						num = 0
					}
					
					this.getAudioUrl(this.songList[num].id)
						.then(()=>{
							this.play()
						})
				}else  if (this.mode === 3) {
					let num = Math.floor(Math.random() * this.songList.length);
					this.getAudioUrl(this.songList[num].id)
						.then(()=>{
							this.play()
						})
				};
			})
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		computed: {
			...Vuex.mapState(['audio', 'mode', 'musicIndex', 'songList'])
		},
		methods: {
			...Vuex.mapMutations(['play']),
			...Vuex.mapActions(['getAudioUrl'])
		}
	}
</script>
<style>
	@import "./common/main.css";
	@import url("//at.alicdn.com/t/font_1556032_bd64mjepnb5.css");
	@keyframes rotate{
		from{
			transform: rotate(0);
		}
		to{
			transform: rotate(360deg);
		}
	}
	
</style>

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/player/player"],{"40fd":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){e.stopPropagation(),t.paused?t.pause():t.play()})},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},"4b59":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("2f62"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){u(t,e,n[e])})}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r=function(){return n.e("components/cmd-icon/cmd-icon").then(n.bind(null,"1ebe"))},c={computed:s({},i.default.mapState(["detail","paused","musicIndex","history"])),methods:s({},i.default.mapMutations(["play","pause","setIndex","setSrc","setDetail"]),{goMusic:function(){t.navigateTo({url:"/pages/music/music"})},next:function(){this.setIndex(1);var t=this.history[this.musicIndex].src,e=this.history[this.musicIndex].detail;this.setSrc(t),this.setDetail(e),this.paused?this.play():this.pause()},prev:function(){this.setIndex(-1);var t=this.history[this.musicIndex].src,e=this.history[this.musicIndex].detail;this.setSrc(t),this.setDetail(e),this.paused?this.play():this.pause()}}),watch:{},components:{cmdIcon:r}};e.default=c}).call(this,n("543d")["default"])},"9f74":function(t,e,n){"use strict";n.r(e);var i=n("4b59"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=a.a},aa40:function(t,e,n){},bbca:function(t,e,n){"use strict";n.r(e);var i=n("40fd"),a=n("9f74");for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);n("feaa");var u=n("2877"),r=Object(u["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},feaa:function(t,e,n){"use strict";var i=n("aa40"),a=n.n(i);a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/player/player-create-component',
    {
        'components/player/player-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("bbca"))
        })
    },
    [['components/player/player-create-component']]
]);                
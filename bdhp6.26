// ==UserScript==
// @name         众里寻她千百度
// @version      4.26
// @author       哔哩哔哩@言叶与言
// @namespace    https://space.bilibili.com/379335206
// @match        https://www.baidu.com/
// @match        https://www.baidu.com/?bs_nt=1
// @match        https://www.baidu.com/?tn=*
// @description  百度首页自定义 不可登录 反馈群：884813590 Tri 科技星凰
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.0/dist/jquery.min.js
// @supportURL   https://jq.qq.com/?_wv=1027&k=IMqY916N
// @updateURL    https://cdn.jsdelivr.net/gh/loktindyi/mybaiduhp@master/bdhp-latest.user.js
// @icon         https://cdn.jsdelivr.net/gh/loktindyi/mybaiduhp@master/Tri.png
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @note         4.26 进行了一轮优化
// @note         4.25 增加了更新日志
// @note         4.24 不再支持logo边框的设定，你可以使用自定义样式 大幅优化调试样式体验（其实就是照搬了我的新脚本）
// @note         4.23 一些体验优化 用户引导 鉴于菜单项占用空间太多，删除加入星凰
// @note         4.22 一些体验优化 不再支持自定义按钮文字
// @note         4.21 一些细微改动 另外，由于本人男，所以改了标题
// @note         4.20 大改完成 完全支持保存设定
// @note         4.10 大改基本完成
// @note         4.05 大改，过渡版本，能用但是功能简陋、代码杂乱 支持自定义样式并存储，但设置项依旧不可存储，请等待下一个版本
// @note         4.00 去除复杂的多样式，仅保留一个
// @note         3.95 【季节logo】现在logo可以跟随B站了，Bilibili Evolved称之为季节logo
// @note         3.93 优化了搜索预测的高亮字体颜色
// @note         3.92 搜索框内文字完全居中，文字可延伸至按钮内
// @note         3.91 添加“加入星凰”菜单项 跳转至群|“报告BUG”跳转至github
// @note         3.9 优化了搜索预测的边框
// @note         3.8 解决了3.7无法启用搜索预测的问题
// @note         3.7 百度改版 重新优化 但搜索预测无法启用
// ==/UserScript==

(function(){

//============设置项============//
	var _set = {
//=========基本设定=========//
		_search: 1, //开启搜索框自定义样式
		_logo: 233, //选择logo

//=========进阶设定=========//
		_title: "众里寻她千百度", //title自定义
		_tl: 1, //移除左上角
		_user: 1, //移除用户
		_mp_title: "前往哔哩哔哩", //logo链接提示 (_logo = [1, 8])
		_mp_tar: "_self", //链接跳转方式 {_self, _blank} (_logo != {0|9})
		_mp_url: "https://www.bilibili.com", //跳转链接 (_logo != {0|-1|-3})
		_news: 1, //新闻(非热搜) 黑色/关闭/白色 [0, 2]
		_ipos: 90, //搜索框位置(上下) [默认值:90]
		_fz: 18, //搜索框字体大小 [默认值:16]
		_logourl: "", //自定义logo
}
	//用户自定义样式默认文本
	var _uct = `
:root{/*当前可定义：前景色（文字）、背景色、边框色(按顺序)*/
--thm-color: #FA7298;/*可以百度“色值转换”挑选你喜欢的颜色*/
--thm-background-color: rgba(250, 114, 152, 0);
--thm-border-color: rgba(250, 114, 152, 0.7);
}
body{/*替换下面引号中的链接可更换图片*/
background-image: url("https://g.hiphotos.baidu.com/zhidao/pic/item/8644ebf81a4c510f973523a36b59252dd52aa592.jpg")
}
`;
	//取得用户设定，取不到则用默认设定
	_set = GM_getValue("set",_set);
	_uct = GM_getValue("uct",_uct);
	//预置的必需样式
	GM_addStyle(`
@-webkit-keyframes twinkling{0%{opacity:1}50%{opacity:0}100%{opacity:1}}
#head_wrapper #form .bdsug-new ul{border-top-color: transparent}
#head_wrapper #form .bdsug-new{background-color: var(--thm-background-color)}
.Tri-log{position: fixed; top: 1%; left: 30%; text-align: left; background: aliceblue;}
.Tri-joinus{-webkit-animation: twinkling 1s 2 ease-in-out; box-shadow: 0 0 15px 3px rgba(250,114,152,.4); position: fixed; top: 0; right: 0; width: 6%; height: 5%; outline: none; border: none; border-bottom-left-radius: 8px; color: #fa7298; background-color: rgba(255, 255, 255, 0.6); z-index: 99999}
.Tri-user-set-help{height: 310px !important; position: fixed;top: 50%; left: 6%; font-size: 83%; text-align: left; z-index: 99999}
.Tri-user-css-text,.Tri-user-set-text{width: 300px; position: fixed; background-color: rgba(255, 255, 255, 0.8); font-size: 120%; resize: none; outline: none; border-radius: 16px; border-color: white; padding: 15px; z-index: 99999}
.Tri-user-css-text{height: 650px !important; top: 5%; color: #fa7298; right: 5%}.Tri-user-set-text{height: 600px !important; top: 10%; left: 5%}
.Tri-user-css-text:focus{box-shadow: 0 0 15px 3px rgba(250,114,152,.3);}
.Tri-user-btn{box-shadow: 0 0 15px 3px rgba(250,114,152,.4); position: fixed; top: 0; left: 0; width: 6%; height: 5%; outline: none; border: none; border-bottom-right-radius: 8px; background-color: rgba(255, 255, 255, 0.3); z-index: 99999}
`);
	//应用用户样式
	GM_addStyle(_uct);
//=====logo=====//
	var logolist = new Array(
		"", //春
		"https://i0.hdslb.com/bfs/archive/e62b6b095ef38dfb742687f11e4b570dde420b5d.png", //夏
		"", //秋
		"", //冬
		"https://i0.hdslb.com/bfs/archive/ade5477ac1397a2b9d87e8ec07f14e4dec1122ad.png", //白
		"https://i0.hdslb.com/bfs/archive/37b34681bf113d457188557bf1ddd38a9d74fa82.png",
		"https://i0.hdslb.com/bfs/archive/f7cfff542840ef7032468076c4360ef190335e34.png",
		"https://i0.hdslb.com/bfs/archive/90cabec45b3ee36b124b7129495c3f5fb4d9f3bc.png",
		""
	);
	//title、搜索框居中、搜图按钮、搜索按钮|移除 滚动条、head左侧、head用户、head阴影、百度热榜、右下键二维码、bottom、可能会出现的news
	if (_set._title){document.title = _set._title}
	if (_set._search){GM_addStyle(`
html{overflow: hidden}
#head_wrapper .s_btn{opacity: 0}
.s-hotsearch-wrapper{display: none}
#s_top_wrap{display: none}
.s-top-left{display: none}
#s_side_wrapper{display: none}
#bottom_layer{display: none}
#head .head_wrapper{top: ` + _set._ipos + `px}
body{background-size: cover; background-attachment: fixed;}
#head_wrapper .ipt_rec, #head_wrapper .soutu-btn{display: none}
#head_wrapper .soutu-env-nomac #form #kw{background-color: var(--thm-background-color); color: var(--thm-color); border-color: var(--thm-border-color) !important}
#head_wrapper #form .bdsug-new{border-color: var(--thm-border-color) !important}
#head_wrapper #form .bdsug-new .bdsug-s, #head_wrapper #form .bdsug-new .bdsug-s span, #head_wrapper #form .bdsug-new .bdsug-s b {color: var(--thm-color); font-size: large}
#head_wrapper .soutu-env-nomac #form #kw{width: 618px !important; padding-right: 16px !important; border-style: solid; border-radius: 10px; text-align: center}
`)}
	if (_set._user){GM_addStyle(`.s-top-right{display: none}`)} else {GM_addStyle(`.s-top-right .s-top-login-btn{display: none}`)}
	if (_set._news){
		if (_set._news == 1){$("#m").remove()}
		else if (_set._news == 2){for (var j = 0; j < 4; j++){$("#lm-new .links-link")[j].style.color = "white"}}
	}
	//logo
	var _lgs = _set._logo;
	if (_lgs){
		var logo = $("#s_lg_img")[0];
		if (_lgs == -2){logo.style.opacity = "0"}
		else if (_lgs == -1){logo.remove()} //移除
		else if (_lgs == 233){GM_xmlhttpRequest({method: "GET", url: "https://api.bilibili.com/x/web-show/res/locs?pf=0&ids=142", onload: function(r){logo.src = JSON.parse(r.responseText).data[142][0].litpic.replace("http:","https:")}})} //跟随logo
		else if (_lgs == 666){logo.src = _set.logourl}
		else if (_lgs > 0){logo.src = logolist[_lgs]}
		if (_lgs == -2 || _lgs > 0){
			var mp = $("area")[0];
			mp.href = _set._mp_url;
			mp.target = _set._mp_tar;
			mp.title = _set._mp_title;
		} //-2.替换链接但不显示logo
	}
	//菜单
	GM_registerMenuCommand("调试样式",function(){//调试样式时，搜索预测将不可用
		if (!$("#Tri-user-btn")[0]){$("body")[0].innerHTML += `
<input id="Tri-joinus" type="button" style="display:none" class="Tri-joinus" onclick="window.open('https://jq.qq.com/?_wv=1027&k=IMqY916N')" value="加入星凰">
<input id="Tri-user-btn" type="button" class="Tri-user-btn" onclick="if ($('#Tri-user-css-div')[0].style.display == 'none'){$('#Tri-user-css-div')[0].style.display = 'block'}else{$('#Tri-user-css-div')[0].style.display = 'none'}">
<div id="Tri-user-css-div" style="display: block">
<textarea id="Tri-user-set" class="Tri-user-set-text" type="input" onfocus="$('#Tri-user-set-help')[0].style.display = 'block'">` + JSON.stringify(_set).replace(/,/g,",\n") + `</textarea>
<div id="Tri-user-set-help" class="Tri-user-set-help" style="display: none">
<span style="cursor: pointer; color: #fa7298" onclick="if($('#Tri-log')[0].style.display == 'none'){$('#Tri-log')[0].style.display = 'block'}else{$('#Tri-log')[0].style.display = 'none'}">查看更新日志</span>
</br></br>
以下，除特殊说明 0表示关闭 1表示开启<br/>
_search 开启搜索框自定义样式<br/>
_logo 选择logo<br/>
_title title自定义<br/>
_tl 移除左上角<br/>
_user 移除用户<br/>
_mp_title logo链接提示<br/>
_mp_tar 跳转方式 _self|_blank<br/>
_mp_url 跳转链接<br/>
_news 0黑色|1关闭|2白色<br/>
_ipos 搜索框上下位置<br/>
_fz 搜索框字体大小 [默认值:16]<br/>
_logourl 自定义logo图片地址<br/>
<br/>
关于logo<br/>
-2 替换链接可点击但不显示<br/>
-1 移除<br/>
0 关闭<br/>
1~4 哔哩哔哩四季<br/>
233 跟随哔哩哔哩<br/>
666 自定义<br/>
</div>
<div id="Tri-log" class="Tri-log" style="display:none">
更新日志：</br>
有功能删减，你可能仍然可以看到那些设置，但它已经失效了，你可以选择备份好你的样式后重置</br>
4.26 进行了一轮优化</br>
4.25 增加了更新日志</br>
4.24 不再支持logo边框的设定，你可以使用自定义样式 大幅优化调试样式体验（其实就是照搬了我的新脚本）</br>
4.23 一些体验优化 用户引导 鉴于菜单项占用空间太多，删除加入星凰</br>
</div>
<textarea id="Tri-user-css" class="Tri-user-css-text" onfocus="$('#Tri-joinus')[0].style.display= 'block'" onkeyup="$('#Tri-userstyle')[0].innerHTML = this.value" type="input">` + _uct + `</textarea>
</div><style id="Tri-userstyle" type="text/css">` + _uct + `</style>`
							   }});
	GM_registerMenuCommand("保存设定",function(){GM_setValue("set",JSON.parse($("#Tri-user-set")[0].value.replace(/\n/g,"")));GM_setValue("uct",$("#Tri-user-css")[0].value);setTimeout(function(){window.location.reload()}, 200)});
	GM_registerMenuCommand("重置设定",function(){GM_deleteValue("uct");GM_deleteValue("set");setTimeout(function(){window.location.reload()}, 200)});
})();

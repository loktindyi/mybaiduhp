// ==UserScript==
// @name         众里寻他千百度
// @version      4.00
// @author       哔哩哔哩@言叶与言
// @namespace    https://space.bilibili.com/379335206
// @match        https://www.baidu.com/
// @match        https://www.baidu.com/?bs_nt=1
// @match        https://www.baidu.com/?tn=baiduhome_pg
// @description  百度首页自定义 不可登录 反馈群：884813590 Tri 科技星凰
// @supportURL   https://github.com/loktindyi/mybaiduhp/issues
// @updateURL    https://cdn.jsdelivr.net/gh/loktindyi/mybaiduhp@master/bdhp-latest.user.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
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
/***关于logo
    -3.不替换，不显示，可点击
	-2.替换，不显示，可点击
	-1.移除
    0.不替换logo与链接
    1.
    2.
    3.
    4.
    5.
    6.
    7.跟随logo
    8.
    9.
    10.
*/

//============设置项============//
	var _set = {

//=========基本设定=========//
		_search: 1, //开启搜索框自定义样式
		_logo: 7, //选择logo

//=========进阶设定=========//
		_title: "众里寻他千百度", //title自定义
		_bg: 0, //"http://g.hiphotos.baidu.com/zhidao/pic/item/8644ebf81a4c510f973523a36b59252dd52aa592.jpg", //设定背景图
		_tl: 1, //移除左上角
		_user: 1, //移除用户
		_mp_title: "前往哔哩哔哩", //logo链接提示 (_logo = [1, 8])
		_mp_tar: "_self", //链接跳转方式 {_self, _blank} (_logo != {0|9})
		_mp_url: "https://www.bilibili.com", //跳转链接 (_logo != {0|-1|-3})
		_soutu: 1, //移除搜图按钮
		_btn: " ", //自定义按钮文字
		_news: 1, //新闻(非热搜) 黑色/关闭/白色 [0, 2]
		_ipos: 90, //搜索框位置(上下) [默认值:90]
		_fz: 18, //输入框字体大小 [默认值:16]
		_ct: 1, //输入框内文字居中 暂不开放样式

		_thm: "250, 114, 152", //主题色
		_ipfc: "#fa7298", //搜索框文字
		_btfc: "#fa7298", //按钮文字
		_lgst: "dashed", //边框样式 {solid|dashed|dotted}
		_bcop: 0, //背景不透明度
		_bdop: 0.5, //边框不透明度
		_lgop: 0, //logo底色不透明度
		_lgbdop: 0, //logo边框不透明度
		_lgcn: 15 //圆角大小
}
	var _uct= `/*body{
background-size: 100%;
background-attachment: fixed;
background-image: url("http://g.hiphotos.baidu.com/zhidao/pic/item/8644ebf81a4c510f973523a36b59252dd52aa592.jpg");
}*/`

	_uct = GM_getValue("uct",_uct);

	GM_addStyle(`.user-css-div{width: 100%; height: 450px; margin: auto; border: 2px solid rgba(250, 114, 152, 0.6); border-radius:15px; background-color: transparent;}
.user-css-text{width: inherit; height: 450px !important; background-color: transparent; font-size: 150%; color: #fa7298; outline:none; border:none; padding: 10px;}
.user-btn{position: fixed; top: 0; left: 0; width: 10%; height: 10%; background-color: transparent;}`);
	$("#head_wrapper")[0].innerHTML += `
<input type="button" class="user-btn" onclick="if ($('#user-css-div')[0].style.display == 'none'){$('#user-css-div')[0].style.display = 'block'}else{$('#user-css-div')[0].style.display = 'none'}">
<div id="user-css-div" class="user-css-div" style="display: none">
<textarea id="user-css" class="user-css-text" onkeyup="$('#userstyle')[0].innerHTML = this.value" onchange="" type="input">` + _uct + `</textarea>
</div><style id="userstyle" type="text/css">` + _uct + `</style>`;

//=====logo=====//
	var logolist = new Array(
		"https://i0.hdslb.com/bfs/archive/ade5477ac1397a2b9d87e8ec07f14e4dec1122ad.png",
		"https://i0.hdslb.com/bfs/archive/37b34681bf113d457188557bf1ddd38a9d74fa82.png",
		"https://i0.hdslb.com/bfs/archive/f7cfff542840ef7032468076c4360ef190335e34.png",
		"https://i0.hdslb.com/bfs/archive/e62b6b095ef38dfb742687f11e4b570dde420b5d.png",
		"https://i0.hdslb.com/bfs/archive/90cabec45b3ee36b124b7129495c3f5fb4d9f3bc.png",
		"",
		"",
		"",
		"",
		""
	);
	//在首页，即使显示不全也不需要滚动条
	$("html")[0].style.overflow = "hidden";
	//title
	if (_set._title){document.title = _set._title;}
	//背景图片
	if (_set._bg){GM_addStyle(`body{background-size: 100%; background-attachment: fixed; background-image: url(` + _set._bg + `);}`)}
	//head阴影
	$("#s_top_wrap").remove();
	//head左侧
	if (_set._tl){$("#s-top-left").remove();}
	//head用户
	if (_set._user){$("#u1").remove();} else {$("#u1").find(".lb").remove();}
	//logo
	var _sw = _set._search;
	var _lgs = _set._logo;
	if (_lgs){
		var logo = $("#s_lg_img")[0];
		if (_lgs < 7){logo.src = logolist[_lgs]}
		else if (_lgs == 7){GM_xmlhttpRequest({method: "GET", url: "https://api.bilibili.com/x/web-show/res/locs?pf=0&ids=142", onload: function(r){logo.src = JSON.parse(r.responseText).data[142][0].litpic.replace("http:","https:")}})} //跟随logo
		else if (_lgs == -1){logo.remove();} //移除
		if (_lgs){logo.style = "background-color: rgba(" + _set._thm + ", " + _set._lgop + "); color: rgba(" + _set._thm + ", " + _set._lgbdop + "); border: 2px; border-style: " + _set._lgst + "; border-radius: " + _set._lgcn + "px;";} //logo底色
		if (_lgs == -2 || _lgs > 0){
			var mp = $("map[name='mp']").find("area")[0];
			mp.href = _set._mp_url;
			mp.target = _set._mp_tar;
			mp.title = _set._mp_title;
		} //-2.替换链接但不显示logo
		if (_lgs < -1){logo.style.opacity = "0";} // -3.不替换链接不显示logo
	}
	//搜索框居中
	if ($("#head_wrapper")[0].className = "head_wrapper s-isindex-wrap nologin"){//热榜是开启的？
		$("#head_wrapper")[0].style = "position: relative; top: " + _set._ipos + "px;";
	}
	//搜索按钮
	var btn = $("#su")[0];
	if (_sw){btn.style = "background-color: rgba(" + _set._thm + ", 0); color: " + _set._btfc + ";"}
	//删除百度热榜
	$("#s-hotsearch-wrapper").remove();
	//搜图按钮
	var sot = setTimeout(()=>{
		var soutu = $(".soutu-btn")[0];
		while (soutu){if (_set._soutu){$(".soutu-btn")[0].remove()}else{soutu.style = "background-color: transparent;"}} //搜图按钮美化
		clearTimeout(sot);
	},100);
	setTimeout(()=>{while (btn.value == "百度一下"){if (_set._btn){btn.value = _set._btn}}},50); //按钮文字
	//光标、字和搜索框颜色 底色 搜索预测
	var _ctr;
	if (_sw && _set._ct){_ctr = " text-align: center;";}else{_ctr = "";}
	GM_addStyle(`#head_wrapper .soutu-env-nomac #form #kw{width: 618px !important; padding-right: 16px !important; background-color: rgba(` + _set._thm + `, ` + _set._bcop + `); color: ` + _set._ipfc + `; border-color: rgba(` + _set._thm + `, ` + _set._bdop + `) !important; border-style: solid; border-radius: 10px; font-size: ` + _set._fz + `px;` + _ctr + `}
#head_wrapper #form .bdsug-new{border-color: rgba(` + _set._thm + `, ` + _set._bdop + `) !important;}
#head_wrapper #form .bdsug-new .bdsug-s, #head_wrapper #form .bdsug-new .bdsug-s span, #head_wrapper #form .bdsug-new .bdsug-s b {color: ` + _set._ipfc + `;}`);
	//可能会出现的news
	if (_set._news){
		if (_set._news == 1){$("#m").remove()}
		else if (_set._news == 2){for (var j = 0; j < 4; j++){$("#lm-new .links-link")[j].style.color = "white";}}
	}
	//右下键二维码
	$("#s_qrcode_nologin").remove();
	//bottom
	$("#bottom_layer").remove();
	//菜单
	GM_registerMenuCommand("调试样式",function(){$("#user-css-div")[0].style.display = "block"});
	GM_registerMenuCommand("保存样式",function(){
		GM_setValue("uct",$("#user-css")[0].value);
		setTimeout(function () {
			window.location.reload();
		}, 200);
	});
	GM_registerMenuCommand("加入星凰",function(){window.open("https://jq.qq.com/?_wv=1027&k=IMqY916N")});
})();

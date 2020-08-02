// ==UserScript==
// @name         众里寻他千百度
// @version      3.8
// @author       哔哩哔哩@言叶与言
// @namespace    https://space.bilibili.com/379335206
// @match        https://www.baidu.com/
// @match        https://www.baidu.com/?bs_nt=1
// @match        https://www.baidu.com/?tn=baiduhome_pg
// @description  百度首页自定义logo、按钮搜索框颜色、文字 !不可登录! 反馈群：884813590 [Lt.II]科技星凰
// @supportURL    https://jq.qq.com/?_wv=1027&k=IMqY916N
// @feedback-url  https://jq.qq.com/?_wv=1027&k=IMqY916N
// @updateURL    https://github.com/loktindyi/mybaiduhp/blob/master/bdhp-latest.js
// @grant        GM_addStyle
// ==/UserScript==


(function(){
	'use strict';
/***关于logo
    0.不替换logo与链接
    1.白，需要暗色调的背景
    2.白，蓝光描边
    3.预留
    4.春 预留
    5.夏
    6.秋 预留
    7.冬 预留
    8.自定义
    9.不显示 不能点击
    10.替换链接但不显示
    11.不替换链接不显示
*/

//============设置项============//
	var _set = {

//=========基本选择=========//
		"_search": 2, //开启搜索框相关美化 有 3 个样式 [0, 3]
		"_logo": 10, //选择logo

//=========进阶设定=========//
		"_title": "众里寻他千百度", //title自定义
		"_bg": 0,//"http://g.hiphotos.baidu.com/zhidao/pic/item/8644ebf81a4c510f973523a36b59252dd52aa592.jpg", //设定背景图
		"_tl": 1, //移除左上角
		"_user": 1, //移除用户
		"_logo_re": "", //自定义logo图片地址 (_logo = 8)
		"_mp_title": "前往哔哩哔哩", //logo链接提示 (_logo = [1, 8])
		"_mp_tar": "_self", //链接跳转方式 {_self, _blank} (_logo != {0|9})
		"_mp_url": "https://www.bilibili.com", //跳转链接 (_logo != {0|9|11})
		"_soutu": 1, //移除搜图按钮
		"_btn": " ", //自定义按钮文字
		"_news": 1, //新闻(非热搜) 黑色/关闭/白色 [0, 2]
		"_ipos": 90, //搜索框位置(上下) [默认值:90]
		"_fz": 16, //输入框字体大小 [默认值:16]
		"_ct": 1, //输入框内文字居中
		//包括 搜索框、按钮 和 logo底色 (_search != 0)

//=====样式1=====//
		"_thm1": "250, 114, 152", //主题色
		"_ipfc1": "#fa7298", //搜索框文字
		"_btfc1": "#fff", //按钮文字
		"_lgst1": "solid", //边框样式 {solid|dashed|dotted}
		"_bcop1": 0.1, //背景不透明度
		"_bdop1": 0.6, //边框不透明度
		"_lgop1": 0.1, //logo底色不透明度
		"_lgbdop1": 0.6, //logo边框不透明度
		"_lgcn1": 30, //圆角大小

//=====样式2=====//
		"_thm2": "250, 114, 152",
		"_ipfc2": "#fa7298",
		"_btfc2": "#fa7298",
		"_lgst2": "dashed",
		"_bcop2": 0,
		"_bdop2": 0.5,
		"_lgop2": 0,
		"_lgbdop2": 0.5,
		"_lgcn2": 15,

//=====样式3=====//
		"_thm3": "250, 114, 152",
		"_ipfc3": "#fa7298",
		"_btfc3": "#fff",
		"_lgst3": "dotted",
		"_bcop3": 0.2,
		"_bdop3": 0,
		"_lgop3": 0.1,
		"_lgbdop3": 0,
		"_lgcn3": 20
	}

	//在首页，即使显示不全也不需要滚动条
	$("html")[0].style.overflow = "hidden";
	//title
	if (_set._title){document.title = _set._title;}
	//背景图片
	if (_set._bg){document.body.style.cssText = "background-repeat: repeat-y; background-size: 100%; background-attachment: fixed; background-image: url(" + _set._bg + ");"}
	//head阴影
	$("#s_top_wrap").remove();
	//head左侧
	if (_set._tl){$("#s-top-left").remove();}
	//head用户
	if (_set._user){$("#u1").remove();} else {$("#u1").find(".lb").remove();}
	//logo
	var _sw = _set._search;
	if (_set._logo){
		var logo = document.getElementById("s_lg_img");
		var _lgs = _set._logo;
		if (_lgs == 1){logo.src = "https://i0.hdslb.com/bfs/archive/ade5477ac1397a2b9d87e8ec07f14e4dec1122ad.png";} //1.白，需要暗色调的背景
		else if (_lgs == 2){logo.src = "https://i0.hdslb.com/bfs/archive/37b34681bf113d457188557bf1ddd38a9d74fa82.png";}//"https://i0.hdslb.com/bfs/archive/937937c0e70863f0fa47deeab06355b36309517d.png";} //2.白，蓝光描边
		else if (_lgs == 3){logo.src = "https://i0.hdslb.com/bfs/archive/937937c0e70863f0fa47deeab06355b36309517d.png" ;} //3.预留
		else if (_lgs == 5){logo.src = "https://i0.hdslb.com/bfs/archive/e62b6b095ef38dfb742687f11e4b570dde420b5d.png";} //5.夏
		else if (_lgs == 8){logo.src = _set._logo_re;} //8.自定义
		else if (_lgs == 9){logo.remove();} //9.不显示
		if (_lgs > 0 && _set._logo < 11){
			if (_sw == 1){logo.style = "background-color: rgba(" + _set._thm1 + ", " + _set._lgop1 + "); color: rgba(" + _set._thm1 + ", " + _set._lgbdop1 + "); border: 2px; border-style: " + _set._lgst1 + "; border-radius: " + _set._lgcn1 + "px;";} //logo底色
			else if (_sw == 2){logo.style = "background-color: rgba(" + _set._thm2 + ", " + _set._lgop2 + "); color: rgba(" + _set._thm2 + ", " + _set._lgbdop2 + "); border: 2px; border-style: " + _set._lgst2 + "; border-radius: " + _set._lgcn2 + "px;";}
			else if (_sw == 3){logo.style = "background-color: rgba(" + _set._thm3 + ", " + _set._lgop3 + "); color: rgba(" + _set._thm3 + ", " + _set._lgbdop3 + "); border: 2px; border-style: " + _set._lgst3 + "; border-radius: " + _set._lgcn3 + "px;";}
			var mp = $("map[name='mp']").find("area")[0];
			mp.href = _set._mp_url;
			mp.target = _set._mp_tar;
			mp.title = _set._mp_title;
		}
		if (_lgs > 9 && _set._logo < 12){logo.style.opacity = "0";} //10.替换链接但不显示logo 11.不替换链接不显示logo
	}
	//搜索框居中
	if (document.getElementById("head_wrapper").className = "head_wrapper s-isindex-wrap nologin"){//热榜是开启的？
		document.getElementById("head_wrapper").style = "position: relative; top: " + _set._ipos + "px;";
	}
	//按钮颜色
	var btn = document.getElementById("su");
	if (_sw){
		if (_sw == 1){btn.style = "background-color: rgba(" + _set._thm1 + ", " + _set._bdop1 + "); color: " + _set._btfc1 + ";";} //样式1
		else if (_sw == 2){btn.style = "background-color: rgba(" + _set._thm2 + ", " + _set._bcop2 + "); color: " + _set._btfc2 + "; border: 2px rgba(" + _set._thm2 + ", " + _set._bdop2 + "); border-style: solid solid solid none;";} //样式2
		else if (_sw == 3){btn.style = "background-color: rgba(" + _set._thm3 + ", " + _set._bcop3 + "); color: " + _set._btfc3 + "; border: 2px rgba(" + _set._thm3 + ", " + _set._bdop3 + "); border-style: solid solid solid none;";} //样式3
	}
	//删除百度热榜
	$("#s-hotsearch-wrapper").remove();
	//搜图按钮，搜索按钮
	var sot = setTimeout(()=>{
		var soutu = $(".soutu-btn")[0];
		while (soutu){if (_set._soutu){soutu.parentNode.removeChild(soutu);}else{soutu.style = "background-color: transparent;";}} //搜图按钮美化
		clearTimeout(sot);
	},100);
	setTimeout(()=>{while (btn.value == "百度一下"){if (_set._btn){btn.value = _set._btn;}}},50);// "百度一下"按钮文字自定义
	//搜索预测 【实验性】
	//$(".bdsug-new").css("border-color", null);
	//GM_addStyle(`.bdsugbg{border-width: 0px !important;border: null !important; opacity: 0.3; background-color: rgba(250, 114, 152, 0)}`);
	//光标、字和搜索框颜色 底色
	var kw = document.getElementById("kw");
	kw.autofocus = "autofocus";
	if (_sw && _set._ct){var _ctr = " text-align: center";}else{var _ctr = " ";}
	if (_sw == 1){
		kw.style = "background-color: rgba(" + _set._thm1 + ", " + _set._bcop1 + "); color: " + _set._ipfc1 + "; border-color: rgba(" + _set._thm1 + ", " + _set._bdop1 + ") !important; border-style: solid none solid solid; font-size: " + _set._fz + "px;" + _ctr; //样式1
	} else if (_sw == 2){
		kw.style = "background-color: rgba(" + _set._thm2 + ", " + _set._bcop2 + "); color: " + _set._ipfc2 + "; border-color: rgba(" + _set._thm2 + ", " + _set._bdop2 + ") !important; border-style: solid none solid solid; font-size: " + _set._fz + "px;" + _ctr; //样式2
	} else if (_sw == 3){
		kw.style = "background-color: rgba(" + _set._thm3 + ", " + _set._bcop3 + "); color: " + _set._ipfc2 + "; border-color: rgba(" + _set._thm3 + ", " + _set._bdop3 + ") !important; border-style: solid none solid solid; font-size: " + _set._fz + "px;" + _ctr; //样式3
	}
	//可能会出现的news
	if (_set._news){
		if (_set._news == 1){document.getElementById("m").parentNode.removeChild(document.getElementById("m"));}
		else if (_set._news == 2){for (var j = 0; j < 4; j++){$("#lm-new .links-link")[j].style.color = "white";}}
	}
	//右下键二维码
	$("#s_qrcode_nologin").remove();
	//bottom
	$("#bottom_layer").remove();
})();

// ==UserScript==
// @name         众里寻他千百度
// @version      3.95
// @author       哔哩哔哩@言叶与言
// @namespace    https://space.bilibili.com/379335206
// @match        https://www.baidu.com/
// @match        https://www.baidu.com/?bs_nt=1
// @match        https://www.baidu.com/?tn=baiduhome_pg
// @description  百度首页自定义 不可登录 反馈群：884813590 Tri 科技星凰
// @supportURL   https://github.com/loktindyi/mybaiduhp/issues
// @updateURL    https://cdn.jsdelivr.net/gh/loktindyi/mybaiduhp@master/bdhp-latest.user.js
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
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
    0.不替换logo与链接
    1.
    2.
    3.
    4.
    5.
    6.
    7.跟随logo
    8.自定义
    9.不显示 不能点击
    10.替换链接但不显示
    11.不替换链接不显示
*/

//============设置项============//
	var _set = {

//=========基本设定=========//
		"_search": 2, //开启搜索框相关美化 有 3 个样式 [0, 3]
		"_logo": 7, //选择logo

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
		"_fz": 18, //输入框字体大小 [默认值:16]
		"_ct": 1, //输入框内文字居中 暂不开放样式1

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
		if (_lgs == 1){logo.src = "https://i0.hdslb.com/bfs/archive/ade5477ac1397a2b9d87e8ec07f14e4dec1122ad.png";}
		else if (_lgs == 2){logo.src = "https://i0.hdslb.com/bfs/archive/37b34681bf113d457188557bf1ddd38a9d74fa82.png";}
		else if (_lgs == 3){logo.src = "https://i0.hdslb.com/bfs/archive/f7cfff542840ef7032468076c4360ef190335e34.png" ;}
		else if (_lgs == 5){logo.src = "https://i0.hdslb.com/bfs/archive/e62b6b095ef38dfb742687f11e4b570dde420b5d.png";}
		else if (_lgs == 6){logo.src = "https://i0.hdslb.com/bfs/archive/90cabec45b3ee36b124b7129495c3f5fb4d9f3bc.png";}
		else if (_lgs == 7){
			GM_xmlhttpRequest({
				method: "GET",
				url: "https://api.bilibili.com/x/web-show/res/locs?pf=0&ids=142",
				onload: function(response) {
					logo.src = JSON.parse(response.responseText).data[142][0].litpic.replace("http:","https:");
				}
			});
		} //跟随logo
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
		if (_lgs > 9 && _lgs < 12){logo.style.opacity = "0";} //10.替换链接但不显示logo 11.不替换链接不显示logo
	}
	//搜索框居中
	if (document.getElementById("head_wrapper").className = "head_wrapper s-isindex-wrap nologin"){//热榜是开启的？
		document.getElementById("head_wrapper").style = "position: relative; top: " + _set._ipos + "px;";
	}
	//搜索按钮
	var btn = document.getElementById("su");
	if (_sw){
		if (_sw == 1){btn.style = "background-color: rgba(" + _set._thm1 + ", " + _set._bdop1 + "); color: " + _set._btfc1 + ";";} //样式1
		else if (_sw == 2){btn.style = "background-color: rgba(" + _set._thm2 + ", 0); color: " + _set._btfc2 + "; border-style:none;";} //样式2
		else if (_sw == 3){btn.style = "background-color: rgba(" + _set._thm3 + ", 0); color: " + _set._btfc3 + "; border-style:none;";} //样式3
	}
	//删除百度热榜
	$("#s-hotsearch-wrapper").remove();
	//搜图按钮
	var sot = setTimeout(()=>{
		var soutu = $(".soutu-btn")[0];
		while (soutu){if (_set._soutu){soutu.parentNode.removeChild(soutu);}else{soutu.style = "background-color: transparent;";}} //搜图按钮美化
		clearTimeout(sot);
	},100);
	setTimeout(()=>{while (btn.value == "百度一下"){if (_set._btn){btn.value = _set._btn;}}},50); //按钮文字
	//光标、字和搜索框颜色 底色 搜索预测 【实验性】
	var kw = document.getElementById("kw");
	kw.autofocus = "autofocus";
	var _ctr;
	if (_sw && _set._ct){_ctr = " text-align: center;";}else{_ctr = "";}
	if (_sw == 1){
		kw.style = "background-color: rgba(" + _set._thm1 + ", " + _set._bcop1 + "); color: " + _set._ipfc1 + "; border-color: rgba(" + _set._thm1 + ", " + _set._bdop1 + ") !important; border-style: solid none solid solid; font-size: " + _set._fz + "px;"; //样式1
		GM_addStyle("#head_wrapper #form .bdsug-new{border-color: rgba(" + _set._thm1 + ", " + _set._bdop1 + ") !important;}");
		GM_addStyle("#head_wrapper #form .bdsug-new .bdsug-s, #head_wrapper #form .bdsug-new .bdsug-s span, #head_wrapper #form .bdsug-new .bdsug-s b {color: " + _set._ipfc1 + ";}");
	} else if (_sw == 2){
		kw.style = "width: 618px !important; padding-right: 16px !important; background-color: rgba(" + _set._thm2 + ", " + _set._bcop2 + "); color: " + _set._ipfc2 + "; border-color: rgba(" + _set._thm2 + ", " + _set._bdop2 + ") !important; border-style: solid; border-radius: 10px; font-size: " + _set._fz + "px;" + _ctr; //样式2
		GM_addStyle("#head_wrapper #form .bdsug-new{border-color: rgba(" + _set._thm2 + ", " + _set._bdop2 + ") !important;}");
		GM_addStyle("#head_wrapper #form .bdsug-new .bdsug-s, #head_wrapper #form .bdsug-new .bdsug-s span, #head_wrapper #form .bdsug-new .bdsug-s b {color: " + _set._ipfc2 + ";}");
	} else if (_sw == 3){
		kw.style = "width: 618px !important; padding-right: 16px !important; background-color: rgba(" + _set._thm3 + ", " + _set._bcop3 + "); color: " + _set._ipfc2 + "; border-color: rgba(" + _set._thm3 + ", " + _set._bdop3 + ") !important; border-style: solid; border-radius: 10px; font-size: " + _set._fz + "px;" + _ctr; //样式3
		GM_addStyle("#head_wrapper #form .bdsug-new{border-color: rgba(" + _set._thm3 + ", " + _set._bdop3 + ") !important;}");
		GM_addStyle("#head_wrapper #form .bdsug-new .bdsug-s, #head_wrapper #form .bdsug-new .bdsug-s span, #head_wrapper #form .bdsug-new .bdsug-s b {color: " + _set._ipfc3 + ";}");
	}
	//可能会出现的news
	if (_set._news){
		if (_set._news == 1){document.getElementById("m").parentNode.removeChild(document.getElementById("m"));} //这里document.getElementById("m")不能替换成$("#m")，天知道为什么
		else if (_set._news == 2){for (var j = 0; j < 4; j++){$("#lm-new .links-link")[j].style.color = "white";}}
	}
	//右下键二维码
	$("#s_qrcode_nologin").remove();
	//bottom
	$("#bottom_layer").remove();
	GM_registerMenuCommand("加入星凰",function(){window.open("https://jq.qq.com/?_wv=1027&k=IMqY916N")});
})();

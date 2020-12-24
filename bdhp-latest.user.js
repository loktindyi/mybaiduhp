// ==UserScript==
// @name         众里寻她千百度·执念
// @version      5.05
// @author       科技星凰
// @namespace    https://space.bilibili.com/379335206
// @match        https://www.baidu.com/
// @match        https://www.baidu.com/?bs_nt=1
// @match        https://www.baidu.com/?tn=*
// @description  我们有幸降落在这个星球…旧时代的人类一生也无法看到这样的风景。而星凰的执念并未就此消散……
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.0/dist/jquery.min.js
// @supportURL   https://jq.qq.com/?_wv=1027&k=IMqY916N
// @updateURL    https://greasyfork.org/scripts/409671/code/%E4%BC%97%E9%87%8C%E5%AF%BB%E5%A5%B9%E5%8D%83%E7%99%BE%E5%BA%A6%C2%B7%E6%89%A7%E5%BF%B5.user.js
// @icon         https://cdn.jsdelivr.net/gh/loktindyi/TriLingvo@master/stat_sys_gps_on_darkmode.png
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// @note         5.00 新的开始
// @note         5.01 修复了一个与AC脚本冲突的问题
// @note         5.02 修复了一个问题
// @note         5.03 修复了两个问题 一些细节优化
// @note         5.04 新的LOGO：哔哩哔哩·四季[冬] 现已开放！[修复]部分情况下，搜索框样式未能正确被修改
// @note         5.05 体验优化
// ==/UserScript==

(function(){
	function toast(msg,duration){//https://blog.csdn.net/xiejunna/article/details/78034209
		duration=isNaN(duration)?3000:duration;
		var m = document.createElement('div');
		m.innerHTML = msg;
		m.style.cssText="width:20%; min-width:60px; background:#fff; opacity:1; height:auto;min-height: 30px; color:#fa7298; line-height:30px; text-align:center; border-radius:4px; position:fixed; top:60%; left:40%; z-index:999999;";
		document.body.appendChild(m);
		setTimeout(function() {
			var d = 0.5;
			m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
			m.style.opacity = '0';
			setTimeout(function() { document.body.removeChild(m) }, d * 1000);
		}, duration);
	}
	function vi(settings){
		let t_search = $('#t_search')[0];
		let t_title = $('#t_title')[0];
		let t_tl = $('#t_tl')[0];
		let t_user = $('#t_user')[0];
		let t_news = $('#t_news')[0];
		let t_ipos = $('#t_ipos')[0];
		let t_ipfz = $('#t_ipfz')[0];
		let t_bdbg = $('#t_bdbg')[0];
		let t_logo = $('#t_logo')[0];
		let t_lgurl = $('#t_lgurl')[0];
		let t_ljurl = $('#t_ljurl')[0];
		let t_lgt = $('#t_lgt')[0];
		let t_lgtars = $('#t_lgtars')[0];
		let t_lgtarb = $('#t_lgtarb')[0];
		if (!settings){
			let sav = {};
			sav.tsearch=t_search.checked;
			sav.ttitle=t_title.value;
			sav.ttl=t_tl.checked;
			sav.tuser=t_user.checked;
			sav.tnews=t_news.checked;
			sav.tipos=t_ipos.value;
			sav.tipfz=t_ipfz.value;
			sav.tbdbg=t_bdbg.value;
			sav.tlogo=parseInt(t_logo.value);
			sav.tlgt=t_lgt.value;
			sav.tlgtar=t_lgtarb.checked;
			sav.tlgurl=t_lgurl.value;
			sav.tljurl=t_ljurl.value;
			sav.ucs=$('#Tri-user-css')[0].value;
			return sav;
		}else{
			if(settings.tsearch){t_search.checked=true}else{t_search.checked=false};
			if(settings.ttitle){t_title.value=settings.ttitle};
			if(settings.ttl){t_tl.checked=true}else{t_tl.checked=false};
			if(settings.tuser){t_user.checked=true}else{t_user.checked=false};
			if(settings.tnews){t_news.checked=true}else{t_news.checked=false};
			if(settings.tipos){t_ipos.value=settings.tipos}else{t_ipos.value="90"};
			if(settings.tipfz){t_ipfz.value=settings.tipfz}else{t_ipfz.value="18"};
			if(settings.tbdbg){t_bdbg.value=settings.tbdbg};
			t_logo.value=settings.tlogo;
			if(settings.tlgt){t_lgt.value=settings.tlgt};
			if(settings.tlgtar){t_lgtarb.checked=true}else{t_lgtars.checked=true};
			if(settings.tlgurl){t_lgurl.value=settings.tlgurl};
			if(settings.tljurl){t_ljurl.value=settings.tljurl};
		}
	}
	var trisay = `5.04:
新的LOGO:哔哩哔哩·四季[冬] 现已开放！
[修复]部分情况下，搜索框样式未能正确被修改
5.05:
体验优化`;
	var set = {
		trisay: trisay,
		tsearch: true, //开启搜索框自定义样式
		tlogo: 233, //选择logo
		ttitle: "众里寻她千百度", //title自定义
		ttl: true, //移除左上角
		tuser: true, //移除用户
		tlgt: "前往哔哩哔哩", //logo链接提示 (logo = [1, 8])
		tlgtar: false, //链接跳转方式 {self, blank} (logo != {0|9})
		tlgurl: "", //自定义logo
		tnews: true, //新闻(非热搜)
		tipos: 90, //搜索框位置(上下) [默认值:90]
		tipfz: 20, //搜索框字体大小 [默认值:16]
		tljurl: "https://www.bilibili.com", //跳转链接 (logo != {0|-1|-3})
		tbdbg: "https://img.tujidu.com/image/5fdde792cb281.jpg",
		ucs: `
:root{/*当前可定义：前景色（文字）、背景色、边框色(按顺序)*/
--thm-color: #FA7298;/*可以百度“色值转换”挑选你喜欢的颜色*/
--thm-background-color: rgba(250, 114, 152, 0);
--thm-border-color: rgba(250, 114, 152, 0.7);}`
	}

	//取得用户设定，取不到则用默认设定
	set = GM_getValue("set",set);
	//应用用户样式
	GM_addStyle(set.ucs);
	//预置的必需样式
	GM_addStyle(`
#bottom_layer{display: none}
#s_side_wrapper{display: none}
#head .head_wrapper{top: ` + set.tipos + `px}
body{background-size: cover; background-attachment: fixed}
@-webkit-keyframes twinkling{0%{opacity:0}33%{opacity:1}66%{opacity:0}100%{opacity:1}}
#headwrapper #form .bdsug-new ul{border-top-color: transparent}
.fs-ipt{padding-left:5px;background:#fff8;border:solid 1px #fa7298;border-radius:5px;outline:none;height:18px;font-size:60%}.ipnum{width:10%}
.Tri-hide-btn,.Tri-joinus{box-shadow: 0 0 15px 3px rgba(250,114,152,.4); top: 0; outline: none; border: none; z-index: 99999}
.Tri-joinus{position: absolute; top: 2%; right: 4%; width: 24%; height: 6%; border-radius: 8px; background-color: rgba(255, 255, 255, 0.6); color: #fa7298; -webkit-animation: twinkling 1.5s 1 ease-in-out;}
.Tri-hide-btn{position: fixed; right: 0; width: 2%; height: 3%; border-bottom-left-radius: 8px; background-color: rgba(255, 255, 255, 0.3);}
.Tri-settings-title{color:#fa7298; font-size: 24px; position: absolute; top: 3%; left: 3%;}
.Tri-settings,.Tri-user-css{position: fixed; background-color: rgba(255, 255, 255, 0.7); border-radius: 16px; border-color: #0000; padding: 15px; z-index: 99999}
.Tri-settings{line-height: 150%;width: 300px; height: 600px !important; top: 5%; color: #000; right: 5%}
.Tri-user-css{position:absolute;width: 266px; height: 46%; resize: none; outline: none;}
.Tri-settings,.Tri-user-css:focus{font-size: 14px;box-shadow: 0 0 15px 3px rgba(250,114,152,.3);}
`);
	//哔哩哔哩logo
	var logolist = new Array(
		"", //春
		"https://i0.hdslb.com/bfs/archive/e62b6b095ef38dfb742687f11e4b570dde420b5d.png", //夏
		"https://i0.hdslb.com/bfs/archive/622017dd4b0140432962d3ce0c6db99d77d2e937.png", //秋
		"https://i0.hdslb.com/bfs/vc/fb9521333b8ea79d90bdfc6da31cf83c52d93ec9.png" //冬
	);
	//title、搜索框居中、搜图按钮、搜索按钮|移除 滚动条、head左侧、head用户、head阴影、百度热榜、右下键二维码、bottom、可能会出现的news
	if (set.ttitle){document.title = set.ttitle}
	if (set.tbdbg!=""){GM_addStyle(`body{background-image:url('`+set.tbdbg+`')}`)};
	if (set.tsearch){GM_addStyle(`
html{overflow: hidden}
#s_wrap{display:none}
#head_wrapper .s_btn{opacity: 0}
.s-hotsearch-wrapper{display: none}
#s_top_wrap{display: none}
#head_wrapper .ipt_rec, #head_wrapper .soutu-btn{display: none}
#head_wrapper #kw,#head_wrapper #kw:focus{background-color: var(--thm-background-color); color: black; border-color: var(--thm-border-color) !important; font-size: `+set.tipfz+`px}
#head_wrapper #form .bdsug-new{position:absolute;left:6%;top:55px!important;background-color: #ffffff; border-radius:10px; box-shadow: 0 0 15px 3px rgba(250,114,152,.3); border: none !important; position: absolute; top: 55px}
.bdsug-s,.bdsug-s b{color: var(--thm-color) !important; font-size: large !important}#head_wrapper #form .bdsug-new ul{border-top:none;}
#head_wrapper .soutu-env-nomac #form #kw{width: 618px !important; padding-right: 16px !important; border-style: solid; border-radius: 10px; text-align: center}
`)}
	if (set.ttl){GM_addStyle(`.s-top-left{display: none}`)}
	if (set.tuser){GM_addStyle(`.s-top-right{display: none}`)} else {GM_addStyle(`.s-top-right .s-top-login-btn{display: none}`)}
	if (set.tnews){$("#m").remove()};
	//logo
	var lgs = set.tlogo;
	if (lgs){
		var logo = $("#s_lg_img")[0];
		switch (lgs){
			case -2:
				logo.style.opacity = "0";
				break;
			case -1:
				logo.remove(); //移除
				break;
			case 233:
				GM_xmlhttpRequest({method: "GET", url: "https://api.bilibili.com/x/web-show/res/locs?pf=0&ids=142", onload: function(r){logo.src=JSON.parse(r.responseText).data[142][0].litpic.replace("http:","https:");}}); //跟随logo
				break;
			case 666:
				logo.src = set.tlgurl?set.tlgurl:logo.src;
				break;
		}
		if (lgs > -1 && lgs < 4){logo.src = logolist[lgs-1]}
		var mp = $("area")[0];
		if (lgs != -1){
			mp.href = set.tljurl;
			mp.target = set.tlgtar?"_blank":"_self";
			mp.title = set.tlgt;
		} //-2.替换链接但不显示logo
	}
	if (set.trisay){
		if (set.trisay != trisay){
			alert(trisay);
			set.trisay = trisay;
			GM_setValue("set",set)
		}
	}else{
		alert(trisay);
		set.trisay = trisay;
		GM_setValue("set",set)
	};

	var Lingvo = `
<input id="Tri-hide-btn" type="button" class="Tri-hide-btn" onclick="$('#Tri-fs')[0].style.display == 'none'?$('#Tri-fs')[0].style.display = 'block':$('#Tri-fs')[0].style.display = 'none'">
<div id="Tri-settings" style="user-select:none;display: block">
<fieldset id="Tri-fs" class="Tri-settings">
<legend class="Tri-settings-title">众里寻她千百度</legend>
<input id="Tri-joinus" type="button" style="display:none" class="Tri-joinus" onclick="window.open('https://jq.qq.com/?wv=1027&k=IMqY916N')" value="加入星凰">
<div style="text-align:left">
<br><br><hr>
<label><input id="t_search" type="checkbox"> 开启搜索框样式自定</label><br>
设置标题 <label><input id="t_title" type="text" value="众里寻她千百度" class="fs-ipt"></label><br>
<label><input id="t_tl" type="checkbox"> 移除推广 </label>
<label><input id="t_user" type="checkbox"> 移除用户 </label>
<label><input id="t_news" type="checkbox"> 移除偶现的新闻</label><br>
搜索框位置 <label><input id="t_ipos" type="number" class="fs-ipt ipnum"></label>
 字体大小 <label><input id="t_ipfz" type="number" class="fs-ipt ipnum"></label><br>
背景图片 <label><input id="t_bdbg" type="text" class="fs-ipt"></label><br><br>
<label>LOGO <select id="t_logo" onchange="$('#op66')[0].selected?$('#t_lgurl')[0].style.display='block':$('#t_lgurl')[0].style.display='none'" style="height: 16px;font-size:12px;outline:none">
<option value="0">不替换</option>
<option value="-2">隐藏式</option>
<option value="-1">移除</option>
<option value="1" style="color:#9ECE60" disabled>哔哩哔哩·春(暂无)</option>
<option value="2" style="color:#FF2B43">哔哩哔哩·夏</option>
<option value="3" style="color:#FF7621">哔哩哔哩·秋</option>
<option value="4" style="color:#56B5F6">哔哩哔哩·冬</option>
<option value="233" style="color:#fa7298">与哔哩哔哩同步</option>
<option value="666" id="op66">自定义</option>
</select><input id="t_lgurl" type="text" class="fs-ipt" style="position: absolute;left: 53%;top: 21%;width: 26%;display:none"></label><br>
LOGO提示文字 <label><input id="t_lgt" type="text" value="前往哔哩哔哩" class="fs-ipt" style="width:47%"></label><br>
跳转方式 <label><input id="t_lgtars" type="radio" name="lgtar"> 当前页 </label>
<label><input id="t_lgtarb" type="radio" name="lgtar"> 新标签页</label><br>
链接URL <label><input id="t_ljurl" type="text" value="https://www.bilibili.com" class="fs-ipt" style="width:65%"></label><br>
<font style="font-size:16px;color:#fa7298">妖染</font><br>
<textarea id="Tri-user-css" class="Tri-user-css" onfocus="$('#Tri-joinus')[0].style.display= 'block'" onkeyup="$('#Tri-userstyle')[0].innerHTML = this.value" type="input">` + set.ucs + `</textarea>
</fieldset>
</div><style id="Tri-userstyle" type="text/css">` + set.ucs + `</style>`;
	//菜单 调试样式时，搜索预测将不可用
	GM_registerMenuCommand("命运",function(){if (!$("#Tri-hide-btn")[0]){$("body")[0].innerHTML += Lingvo;var z = setInterval(function(){vi(set);if ($("#Tri-user-css")[0]){clearInterval(z)}}, 300);}});
	GM_registerMenuCommand("忆海",function(){if ($("#Tri-hide-btn")[0]){GM_setValue("set",vi(0));setTimeout(function(){window.location.reload()}, 200);}});
	GM_registerMenuCommand("沉落",function(){if (confirm("星凰的记忆...")){toast("丢掉了...",3000);GM_deleteValue("uct");GM_deleteValue("set");setTimeout(function(){window.location.reload()}, 2000)}
	});
})();

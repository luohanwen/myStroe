if (!document.querySelector || !document.body.classList || !document.body.dataset) {
	var msg = document.createElement("p");
	msg.className = "message";
	msg.innerHTML = "<span class='red'>【<b>!</b>】</span> 此版本的浏览器不支持部分HTML5特性，因此你正在查看基本视图，使用最新的浏览器体验最佳效果。例如 <a href='http://www.google.cn/chrome/intl/zh-CN/landing_chrome.html'>Gogole Chrome 浏览器</a>。";
	document.body.insertBefore(msg, document.body.firstChild);
	document.body.className = "not-supported";
	var slides = document.getElementsByTagName("article");
	for (var i = 0; i < slides.length; i++) {
		slides[i].id = i + 1;
	};
};

function $(s, c) {
	return (c || document).querySelector(s);
};
function $all(s, c) {
	return (c || document).querySelectorAll(s);
};

var Slides = {
	transition: ["switch", "cube", "wave", "flip", "wheel", "reveal", "fly-through", "beat", "cover", "uncover", "fade", "push", "scroll", "gallery"],
	container: "#slides",
	btnPrev: "#prev",
	btnNext: "#next",
	slides: null,
	count: 0,
	current: 0,

	init: function() {
		//$("body").setAttribute("data-transition", this.transition[Math.floor(Math.random() * this.transition.length)]);
		if (!$("body").dataset.transition) $("body").dataset.transition = "push";
		
		//统计幻灯片数量
		this.slides = $all(this.container + " article");
		this.count = this.slides.length;
		$("#footer .total").innerHTML = this.count;

		//生成跳转列表
		for (var i = 1; i <= this.count; i++) {
			try {
				var heading = $("article:nth-child(" + i + ") h6,article:nth-child(" + i + ") h5,article:nth-child(" + i + ") h4,article:nth-child(" + i + ") h3,article:nth-child(" + i + ") h2,article:nth-child(" + i + ") h1");
			} catch (err) {
				var heading = false;
			};
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.href = "#" + i;
			a.innerHTML = i + " " + (heading ? (heading.innerText || heading.textContent).substring(0, 30) : "幻灯片 " + i);
			if ($("article:nth-child(" + i + ")").dataset.section == "") li.className = "section";
			li.appendChild(a);
			$("#goto ol").appendChild(li);
		};
		
		//注册事件
		this.keyPress.reg();
		this.mouseWheel.reg();
		for (var i = 0, inputs = $all("input[type=text],textarea"); i < inputs.length; i++) {
			inputs[i].onfocus = function() {
				Slides.keyPress.unreg();
			};
			inputs[i].onblur = function() {
				Slides.keyPress.reg();
			};
		};
		$(this.btnPrev).onclick = function() {
			Slides.prev();
		};
		$(this.btnNext).onclick = function() {
			Slides.next();
		};
		$("#help").onclick = function() {
			$("#help").classList.remove("show");
		};
		$("#gethelp").onclick = function() {
			$("#help").classList.toggle("show");
		};
		$("#navigation").onmouseover = function (){
			Slides.mouseWheel.unreg();
		};
		$("#navigation").onmouseout = function (){
			Slides.mouseWheel.reg();
		};
		
		//监听触控事件
		if( "ontouchstart" in document.documentElement ) {
			Slides.toggleFullwindow();
			document.addEventListener("touchstart", function (evt) {
				//alert(evt.touches.length);
				if (evt.touches.length === 1) {
					var x = evt.touches[0].clientX,
						width = window.innerWidth * 0.3,
						result = null;
						
					if ( x < width ) {
						result = Slides.prev();
					} else if ( x > window.innerWidth - width ) {
						result = Slides.next();
					};
					if (result) evt.preventDefault();
				};
			}, false);
		};
		
		//监听hash变化
		window.onhashchange = function (){
			Slides.go(!isNaN(parseInt(location.hash.replace(/#/, ''))) ? parseInt(location.hash.replace(/#/, '')) : 1);
		};
		
		//如果可视区域过小
		if (document.body.clientHeight < 820) $("#footer").classList.add("hide");
		
		//初始化第一页
		location.hash = "#" + (!isNaN(parseInt(location.hash.replace(/#/, ''))) ? parseInt(location.hash.replace(/#/, '')) : 1);
		window.onhashchange();
	},
	go: function(n) {
		// n:页数(从1开始)
		console.log("go slide", n);

		//如果页数超出范围则重置
		if (isNaN(n) || n < 1) n = -1;
		if (n > this.count) n = -this.count;
		if (n < 0) {
			location.hash = "#" + -n;
			return false;
		};
		$("#footer .current").innerHTML = $("#goto").value = n;
		
		n--;
		
		$(this.container).dataset.go = n > this.current ? "forward" : "back";
		
		this.current = n;

		for (var i = 0, articles = $all("article.current,article.prev,article.far-prev,article.next,article.far-next,article.last"); i < articles.length; i++) {
			articles[i].className = articles[i].classList.contains("current") ? "last" : "";
		};

		this.slides[n].classList.add("current");
		if (this.slides[n - 1]) this.slides[n - 1].classList.add("prev");
		if (this.slides[n - 2]) this.slides[n - 2].classList.add("far-prev");
		if (this.slides[n + 1]) this.slides[n + 1].classList.add("next");
		if (this.slides[n + 2]) this.slides[n + 2].classList.add("far-next");

		$("#progressbar i").style.width = n / (this.count - 1) * 100 + "%";
	},
	prev: function(n) {
		if (this.current <= 0) return false;
		location.hash = "#" + this.current;
	},
	next: function(n) {
		var buildEl = $(".to-build", this.slides[this.current]);
		if (buildEl) {
			buildEl.classList.add("builded");
			buildEl.classList.remove("to-build");
			return false;
		};
		if (this.current >= this.count-1) return false;
		location.hash = "#" + (this.current + 2);
	},
	mouseWheel: {
		func: function (e) {
			e = e || window.event;
			var delta = 0;
			if (e.wheelDelta) {
				delta = e.wheelDelta / 120;
			} else if (e.detail) {
				delta = -e.detail / 3;
			};
			if (delta == -1) Slides.next();
			if (delta == 1) Slides.prev();
		},
		reg: function (){
			window.addEventListener('mousewheel', Slides.mouseWheel.func, false);
			window.addEventListener('DOMMouseScroll', Slides.mouseWheel.func, false);
		},
		unreg: function (){
			window.removeEventListener('mousewheel', Slides.mouseWheel.func, false);
			window.removeEventListener('DOMMouseScroll', Slides.mouseWheel.func, false);
		}
	},
	toggleTheme: function(n) {
		n = n || "dark";
		$("link[rel*=stylesheet][title=" + n + "]").disabled = !$("link[rel*=stylesheet][title=" + n + "]").disabled;
	},
	toggleFullwindow: function () {
		$("body").classList.toggle("fillwindow");
	},
	toggleFullscreen: function () {
		if (document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			};
		} else {
			var el = el || document.documentElement;
			if (el.requestFullscreen) {
				el.requestFullscreen();
			} else if (el.mozRequestFullScreen) {
				el.mozRequestFullScreen();
			} else if (el.webkitRequestFullScreen) {
				el.webkitRequestFullScreen();
			};
		};
	},
	toggleAutoscale: function () {
		if (window.onresize == null) {
			window.onresize = function() {
				var w = document.documentElement.clientWidth;
				var h = document.documentElement.clientHeight;
				var s = w < h ? (w / 1024) : (h / 768);
				$("section").style.transform = $("section").style.OTransform = $("section").style.MozTransform = $("section").style.WebkitTransform = "scale(" + s + ")";
			};
			window.onresize();
		} else {
			window.onresize = null;
			$("section").style.transform = $("section").style.OTransform = $("section").style.MozTransform = $("section").style.WebkitTransform = "";
		};
	},
	keyPress: {
		reg: function () {
			window.onkeydown = function(e) {
				e = e || window.event;
				switch (e.keyCode) {
				case 36: //Home
					Slides.go(1);
					e.preventDefault();
					break
				case 35: //End
					Slides.go(Slides.count);
					e.preventDefault();
					break
				case 33: //PageUp
				case 37: //左
				case 38: //上
				case 80: //P
					Slides.prev();
					e.preventDefault();
					break
				case 32: //Space
				case 34: //PageDown
				case 39: //右
				case 40: //下
				case 78: //N
					Slides.next();
					e.preventDefault();
					break
				case 87: //W
					Slides.toggleFullwindow();
					e.preventDefault();
					break
				case 83: //S
					Slides.toggleAutoscale();
					e.preventDefault();
					break
				case 70: //F
					Slides.toggleFullscreen();
					e.preventDefault();
					break
				case 84: //T
					Slides.toggleTheme();
					e.preventDefault();
					break
				case 72: //H
					$("#gethelp").onclick();
					e.preventDefault();
					break
				case 66: //B
					$("#footer").classList.toggle("hide");
					$("#footer").classList.toggle("show");
					break
				};
				if ((e.ctrlKey || e.altKey) && !Slides.canvas) {
					Slides.canvas = document.createElement("canvas");
					Slides.canvas.width = document.body.clientWidth;
					Slides.canvas.height = document.body.clientHeight;
					$("body").dataset.pointer = e.ctrlKey ? "laser" : "hightlighter";
					$("body").appendChild(Slides.canvas);
					var ctx = Slides.canvas.getContext("2d");
					var started = false;
					Slides.canvas.onmousedown = function(e) {
						started = true;
						if(e.ctrlKey) {
							ctx.strokeStyle = "red";
							ctx.lineWidth = 5;
							ctx.lineCap = "round";
						} else {
							ctx.strokeStyle = "yellow";
							ctx.lineWidth = 20;
						};
						ctx.beginPath();
						var x, y;
						if (e.layerX) {
							x = e.layerX;
							y = e.layerY;
						} else if (e.offsetX) {
							x = e.offsetX;
							y = e.offsetY;
						};
						ctx.moveTo(x, y);
					};
					Slides.canvas.onmousemove = function(e) {
						if (started) {
							e = e || window.event;
							var x, y;
							if (e.layerX) {
								x = e.layerX;
								y = e.layerY;
							} else if (e.offsetX) {
								x = e.offsetX;
								y = e.offsetY;
							};
							ctx.lineTo(x, y);
							ctx.stroke();
						};
					};
					Slides.canvas.onmouseup = function() {
						if (started) {
							ctx.closePath();
							started = false;
						};
					};
					e.preventDefault();
				};
			};
			window.onkeyup = function(e) {
				e = e || window.event;
				switch (e.keyCode) {
				case 17: //Ctrl
				case 18: //Alt
					delete $("body").dataset.pointer;
					Slides.canvas.parentNode.removeChild(Slides.canvas);
					Slides.canvas = null;
					e.preventDefault();
					break
				};
			};
		},
		unreg: function () {
			window.onkeydown = window.onkeyup = null;
		}
	}
};

if (!!location.search) {
	var p = location.search.substring(1).split("&");
	for (var i = 0; i < p.length; i++) {
		var k = p[i].split("=")[0],
			v = p[i].split("=")[1];
		if (!v || v == "") continue;
		if (k == "theme" && $("link[rel*=stylesheet][title=" + v + "]")) $("link[rel*=stylesheet][title=" + v + "]").disabled = false;
		if (k == "effect") $("body").dataset.transition = v;
	};
};

prettyPrint();
// $("#loading").parentNode.removeChild($("#loading"));
$("body").classList.remove("unload");
Slides.init();
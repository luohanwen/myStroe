$(function() {
	/***********************栏目管理 begin**********************************/
	/*左边菜单栏选中效果*/
	$(".admin_m_lanmu_l>a").unbind().bind("click", function(el) {
		var className = $(el.currentTarget).attr("data-value");
		$.each($(".admin_m_lanmu_l>a"), function(index, item) {
			var className1 = $(item).attr("data-value");
			$(item).removeClass(className1);
		});
		$(el.currentTarget).addClass(className);
	});


	/*左边菜单栏二级菜单列表收缩效果*/
	$(".lanmu_list").unbind().bind("click", function(el) {
		/*切换二级子菜单列表的显示，隐藏状态*/
		var list_name = $(el.currentTarget).attr("list-name");
		$(".lanmu_subNav_container[list-name='" + list_name + "']").slideToggle("normal");
		$(".weixin_subNav_container[list-name='" + list_name + "']").slideToggle("normal");
		/*切换旁边三角箭头的方向*/
		$(el.currentTarget).toggleClass("lanmu_sl");

		/*加上左边菜单栏选中效果*/
		var className = $(el.currentTarget).attr("data-value");
		$.each($(".admin_m_lanmu_l>a"), function(index, item) {
			var className1 = $(item).attr("data-value");
			$(item).removeClass(className1);
		});
		$(el.currentTarget).addClass(className);
	});

	/*左边菜单栏二级菜单选中效果*/
	$(".lanmu_subNav li").unbind().bind("click", function(el) {
		$(".lanmu_subNav li").removeClass("lanmu_subNav_on");
		$(el.currentTarget).addClass("lanmu_subNav_on");
	});

	/*正文二级菜单栏选中效果,如数据分析头部二级菜单*/
	$(".myweb_c_header>a").unbind().bind("click", function(el) {
		var dataValue = $(el.currentTarget).parent().attr("data-value");
		$(".myweb_c_header[data-value='" + dataValue + "']>a").removeClass("myweb_d_nav_on");
		$(el.currentTarget).addClass("myweb_d_nav_on");
	});

	/***********************栏目管理 over**********************************/
});


/*页面跳转*/
function lmgl_goToPage(pageId) {
	$(".adm_add_m").addClass("hide");
	$("#" + pageId).removeClass("hide");
}

/*初始化冒泡提示框的位置 id为冒泡提示框的id*/
function initPopPos(id) {
	var width = $("#" + id).width() + 160;
	$("#" + id).css("margin-left", -width / 2 + "px");
}
let windowW = 0,
	windowH = 0;

/* common */
$(function(){
	// window width
	windowW = $(window).outerWidth();
	windowH = $(window).outerHeight();
	$(window).resize(function(){
		windowW = $(window).outerWidth();
		windowH = $(window).outerHeight();
	});

	// accordion-list
	$(document).on("click", ".accordion-list .title", function(){
		let $item = $(this).parents(".items");

		$item.siblings(".items").removeClass("active");
		$item.siblings(".items").find(".desc").stop().slideUp(300);

		if( !$item.hasClass("active") ) {
			$item.addClass("active");
			$item.find(".desc").stop().slideDown(300);
		} else {
			$item.removeClass("active");
			$item.find(".desc").stop().slideUp(300);
		}
	});

	// checkbox event
	$("#chk_all").on("change", function(){
		if( $(this).prop("checked") ) {
			$(".check-list input[type='checkbox']").each(function(){
				$(this).prop("checked", true);
			});
		} else {
			$(".check-list input[type='checkbox']").each(function(){
				$(this).prop("checked", false);
			});
		}
	});

	$(".check-list input[type='checkbox']").on("change", function(){
		let chk = true;
		$(".check-list input[type='checkbox']").each(function(){
			if( !$(this).prop("checked") ) {
				chk = false;
			}
		});
		$("#chk_all").prop("checked", chk);
	});


	gnbEventFn();
	selectClickFn();
	moGnbEventFn();
	tabActiveFn();
	productHoverFn();
	floatingBtnFn();
});

function gnbEventFn(){
	$(".header .menu-list .item h2").on("mouseenter", function(){
		$(".header .menu-list .item h2").removeClass("active");
		$(".header .menu-list .item .sub-list").removeClass("active");

		$(this).addClass("active");
		$(this).siblings(".sub-list").addClass("active");
	});

	$(".header .menu-list .item .sub-list").on("mouseleave", function(){
		$(this).removeClass("active");
	});

	$(".header").on("mouseleave", function(){
		$(".header .menu-list .item .sub-list").removeClass("active");
	});
}

function moGnbEventFn(){
	$(".ico-menu").on("click", function(){
		$(this).siblings(".mob-menu").stop().show();
	});
	$(".mob-menu .ico-close").on("click", function(){
		$(this).parents(".mob-menu").stop().hide();
	});

	$(".mob-menu .menu h2").on("click", function(){
		let $this = $(this);
		let $subMenu = $(this).parents(".item").find(".sub-menu");

		if( !$this.hasClass("active") ) {
			$(".mob-menu .item h2, .mob-menu .item h3").removeClass("active");
			$(".mob-menu .item .sub-menu, .mob-menu .item .sub-menu .list").stop().slideUp(300);

			$this.addClass("active");
			$subMenu.stop().slideDown(300);
		} else {
			$this.removeClass("active");
			$subMenu.stop().slideUp(300);
		}
	});

	$(".mob-menu .menu h3").on("click", function(){
		let $this = $(this);
		let $subMenu = $(this).siblings(".list");

		if(!$this.siblings(".list").length) return;

		if( !$this.hasClass("active") ) {
			$(".mob-menu .item h3").removeClass("active");
			$(".mob-menu .item .sub-menu .list").stop().slideUp(300);

			$this.addClass("active");
			$subMenu.stop().slideDown(300);
		} else {
			$this.removeClass("active");
			$subMenu.stop().slideUp(300);
		}
	});
}

function productHoverFn(){
	$(".product-list .product-item")
		.on("mouseover", function(){
			$(this).addClass("active");
		})
		.on("mouseleave", function(){
			$(this).removeClass("active");
		});
}

function tabActiveFn(){
	const $tabLists = $(".tab-list").find("li.active");
	$tabLists.each(function(idx, el){
		let tabIdx = $(el).index();
		$(el).closest(".tab-list").siblings(".tab-con").eq(tabIdx).addClass("active");
	});

	$(".tab-list li button").on("click", function(e){
		const $tabLi   = $(this).parent("li"),
			$tabList = $(this).closest(".tab-list"),
			$tabCon  = $tabList.siblings(".tab-con");
		let   tabIdx   = $tabLi.index();

		e.preventDefault();

		$tabLi.addClass("active").siblings().removeClass("active");
		$tabCon.eq(tabIdx).addClass("active").siblings().removeClass("active");
	});
}

function popLayoutHeightFn(obj){
	let popH = obj.find(".inner").outerHeight();

	if( popH >= windowH ) {
		obj.addClass("fixed");
	} else {
		obj.removeClass("fixed");
	}
}

function popupOpenFn(id){
	$("body").addClass("popView");

	$("#"+id).addClass("open").stop().show();
	popLayoutHeightFn($("#"+id));
}

function popupCloseFn(id){
	$("body").removeClass("popView");

	$("#"+id).removeClass("open").stop().hide();
}

function selectClickFn(){
	$(".inp-select .select").on("click", function(event){
		event.stopPropagation();

		let $select = $(this).closest(".inp-select"),
			$wrap = document.querySelector(".wrap");

		if(!$select.hasClass("on")){            
			$select.addClass("on").siblings().removeClass("on");
			$wrap.addEventListener("click", selectClickTrigger);
		} else{
			$select.removeClass("on");
			$wrap.removeEventListener(selectClickTrigger);
		}
	});

	$(".inp-select .list .option").on("click", function(){
		let $select = $(this).parents(".inp-select");
		let $optionValue = $(this).text();

		$select.removeClass("on");
		$select.find(".selected-value").text($optionValue).addClass("bold");
	});
}

function selectClickTrigger(){
	$(".inp-select").each(function(){
		if( $(this).hasClass("on") ) {
			$(this).removeClass("on");
		}
	});
}

function floatingBtnFn(){
	$(".floating-wrap .floating-btn").on("click", function(){
		let $floatingWrap = $(this).parents(".floating-wrap");
		let $floatingCon  = $(this).siblings(".floating-con");

		if(!$floatingWrap.hasClass("on")){
			$floatingWrap.addClass("on");
			$floatingCon.stop().slideDown("500");
		} else{
			$floatingWrap.removeClass("on");
			$floatingCon.stop().slideUp("500");
		}
	});
}

function delFile(){
	if( $(event.target).parents(".inp-file-list").find("li").length <= 1 ) {
		$(event.target).parents(".inp-upload").removeClass("readonly");
		$(event.target).parents(".inp-area").removeClass("uploaded");
	}
	$(event.target).parents("li").remove();

}

function comma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}

function uncomma(str) {
	str = String(str);
	return str.replace(/[^\d]+/g, "");
} 

function inputNumberFormat(obj) {
	if( obj.value == "" ) {
		obj.value = "";
	} else {
		obj.value = "￦"+comma(uncomma(obj.value));
	}
}
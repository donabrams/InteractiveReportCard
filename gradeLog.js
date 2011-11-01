$(function(){
  var width = 10;
	var space = 4;
	var height = 300;
	var spaceBetweenDates = 20;
	var articles = $("#grade_log article");
	var showAndMoveTooltip = function(x,y, article) {
		var $tooltip = $("#grade_log .tooltip");
		$tooltip.show();
		$tooltip.css({left: (x + width + 20 - 4) + "px", bottom: (y + 100 - 3) + "px"});
		$tooltip.html("<article>" + $(article).html() + "</article>");
	};
	var $gradeLogSvg = $("#grade_log_svg").svg({settings: {'width':880, 'height':height}, onLoad: function(svg) {
		var g = svg.group({'stroke-width': 0, id:"grade_log_bars"});
		var lastDate;
		var cumulativeExtraSpace = 0;
		articles.each(function(i, article) {
			var $article = $(article);
			var articleClass = $article.attr("class");
			var datetime = $("time", article).attr("datetime");
			if (lastDate != datetime) {
				lastDate = datetime;
				cumulativeExtraSpace = cumulativeExtraSpace + spaceBetweenDates;
			}
			var $meter = $("meter", article);
			var min = parseInt($meter.attr("min"),10);
			var max = parseInt($meter.attr("max"),10);
			var value = parseInt($meter.attr("value"),10);
			var barHeight = (height * (value - min) / (max - min));
			var barX = i*(width + space) + cumulativeExtraSpace;
			$(svg.rect(g, barX, height - (height * (value - min) / (max - min)), width, barHeight, {class: articleClass,id:("grade_log_bar_" + i)}))
					.click(function() { showAndMoveTooltip(barX, barHeight, article);});
		});
	}});
	$("#grade_log ol").hide();
	$("#grade_log a").click(function() {
		$("#grade_log .tooltip").hide();
		var svg = $("#grade_log_svg");
		var ol = $("#grade_log ol");
		var svgShowing = svg.is(":visible");
		$(this).html(svgShowing ? "Switch to graph mode" : "Switch to list mode");
		var partOut = svgShowing ? svg : ol;
		var partIn = svgShowing ? ol : svg;
		partOut.toggle('fade', { direction: "down" }, function() {
			partIn.toggle('fade', { direction: "down" });
		});		
	});
});
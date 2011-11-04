$(function(){
	var criteria = $("#grading_criteria li");
	if (criteria.length) {
		var graphRadius = 115;
		var innerRadius = 50;
		var margin = 20;
		var legendWidth = $("#grading_criteria .legend").width();
		var criteria = $("#grading_criteria .legend li");
		var svg = $("#grading_criteria")
				.css("width", legendWidth + graphRadius*2 + margin *2)
				.svg({settings: {'class':'pie','width':graphRadius*2 + margin*2, 'height':graphRadius*2 + margin*2 }, onLoad: function(svg) {
					var g = svg.group({'stroke-width': 0, id:"grading_criteria_pie"});
					svg.ellipse(g, graphRadius+margin, graphRadius+margin, graphRadius, graphRadius, {fill:"red"});
					svg.ellipse(g, graphRadius+margin, graphRadius+margin, innerRadius, innerRadius, {fill:"blue"});
					var percentTotal = 0;
					criteria.each(function(i, d) {
						var percent = $("meter", d).attr("value");
						var cssClass = $(d).attr("class");
						var p1 = {'x': graphRadius+margin,'y':innerRadius+margin};
						var p2 = {'x': graphRadius-innerRadius+margin,'y':graphRadius+margin};
						var p3 = {'x': 0+margin,'y':graphRadius+margin};
						var p4 = {'x': graphRadius+margin,'y':0+margin};
						var slice = svg.createPath();
						slice.move(p1.x, p1.y);
						slice.arc(innerRadius, innerRadius, 1.8*percent, percent > 50 ? 1 : 0, 0, p2.x, p2.y);
						slice.line(p3.x, p3.y);
						slice.arc(graphRadius, graphRadius, 1.8*percent, percent > 50 ? 1 : 0, 1, p4.x, p4.y);
						slice.close();
						svg.path(g, slice);
						svg.ellipse(g, p1.x, p1.y, 2, 2, {'class':cssClass});
						svg.ellipse(g, p2.x, p2.y, 2, 2, {'class':cssClass});
						svg.ellipse(g, p3.x, p3.y, 2, 2, {'class':cssClass});
						svg.ellipse(g, p4.x, p4.y, 2, 2, {'class':cssClass});
					});
				}});
		var aside = $("#grading_criteria aside");
		aside.css({'position': 'absolute', 
				'right': (margin+graphRadius-innerRadius/2) + "px", 
				'bottom': (margin+graphRadius-innerRadius/2) + "px", 
				'display': 'block',
				'width' : innerRadius*2});
	}
});
$(function(){
	var criteria = $("#grading_criteria li");
	if (criteria.length) {
		var graphRadius = 100.0;
		var innerRadius = 45.0;
		var margin = 40.0;
		var offset = 8.0;
		var theta0 = Math.PI/5.0;
		
		var $legend = $("#grading_criteria .legend");
		var legendWidth = $legend.width();
		var legendHeight = $legend.height();
		var criteria = $("li", $legend);
		//percent to radians
		var pToR = function(percent) {
			return percent * 2.0 * Math.PI/100.0;
		};
		var graphDiameter = graphRadius*2.0 + margin*2.0;
		var translateToOrigin = function(point) {
			return {'x':point.x + graphDiameter/2.0, 'y':point.y + graphDiameter/2.0};
		};
		var svg = $("#grading_criteria")
				.css({"width": legendWidth + graphDiameter, "height": graphDiameter > legendHeight ? graphDiameter : legendHeight})
				.svg({settings: {'class':'pie','width':graphDiameter, 'height':graphDiameter }, 
						onLoad: function(svg) {
							var g = svg.group({'stroke-width': 0, id:"grading_criteria_pie"});
							var origin = translateToOrigin({x:0,y:0});
							svg.ellipse(g, origin.x, origin.y, innerRadius+offset, innerRadius+offset, {'fill':'red'});
							svg.ellipse(g, origin.x, origin.y, innerRadius, innerRadius, {'fill':'green'});
							svg.ellipse(g, origin.x, origin.y, offset, offset, {'fill':'blue'});
							// little circles around graph
							var br = graphRadius + offset + 2.0;
							var bc = 2.0* Math.PI * br;
							var repeatLength = 4.0;
							var repetitions = bc/repeatLength;
							var repeatAngle = 2 * Math.PI /repetitions;
							for (var i = 0; i < repetitions;i++) {
								var c = translateToOrigin({x:br * Math.cos(repeatAngle*i), y: br * Math.sin(repeatAngle*i)});
								svg.ellipse(g, c.x, c.y, 1, 1, {fill:'#999'});
							}
							// pie chart slices
							var percentTotal = 0.0;
							criteria.each(function(i, d) {
								var percent = $("meter", d).attr("value");
								var theta1 = (pToR(percentTotal) + theta0);
								var theta2 = (pToR(percentTotal) + pToR(percent) + theta0);
								var theta3 = (pToR(percentTotal) + pToR(percent)/2 + theta0);
								var r1 = innerRadius;
								var r2 = graphRadius;
								var r3 = offset;
								var po = {'x': r3 * Math.cos(theta3), 'y': r3 * Math.sin(theta3)};
								var p1 = translateToOrigin({'x': r1 * Math.cos(theta1) + po.x, 'y': r1 * Math.sin(theta1) + po.y});
								var p2 = translateToOrigin({'x': r1 * Math.cos(theta2) + po.x, 'y': r1 * Math.sin(theta2) + po.y});
								var p3 = translateToOrigin({'x': r2 * Math.cos(theta2) + po.x, 'y': r2 * Math.sin(theta2) + po.y});
								var p4 = translateToOrigin({'x': r2 * Math.cos(theta1) + po.x, 'y': r2 * Math.sin(theta1) + po.y});
								
								svg.ellipse(g, translateToOrigin(po).x, translateToOrigin(po).y, 1, 1);
								svg.ellipse(g, p1.x, p1.y, 1, 1);
								svg.ellipse(g, p2.x, p2.y, 1, 1);
								svg.ellipse(g, p3.x, p3.y, 1, 1);
								svg.ellipse(g, p4.x, p4.y, 1, 1);
								
								var cssClass = $(d).attr("class");
								var slice = svg.createPath();
								slice.move(p1.x, p1.y);
								slice.arc(innerRadius+r3, innerRadius+r3, 0, percent > 50.0 ? 1 : 0, 1, p2.x, p2.y);
								slice.line(p3.x, p3.y);
								slice.arc(graphRadius+r3, graphRadius+r3, 0, percent > 50.0 ? 1 : 0, 0, p4.x, p4.y);
								slice.close();
								svg.path(g, slice, {'class':cssClass});
								percentTotal += percent;
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
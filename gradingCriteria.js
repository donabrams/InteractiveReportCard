$(function(){
	var criteria = $("#grading_criteria li");
	if (criteria.length) {
		var graphRadius = 105.0;
		var innerRadius = 50.0;
		var margin = 30.0;
		var offset = 1.7;
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
							// little circles around graph
							var br = graphRadius + offset + 2.0;
							var bc = 2.0* Math.PI * br;
							var repeatLength = 4.0;
							var repetitions = bc/repeatLength;
							var repeatAngle = 2 * Math.PI /repetitions;
							for (var i = 0; i < repetitions;i++) {
								var c = translateToOrigin({x:br * Math.cos(repeatAngle*i), y: br * Math.sin(repeatAngle*i)});
								svg.ellipse(g, c.x, c.y, 1, 1, {'class':'graphBorder'});
							}
							// pie chart slices
							var percentTotal = 0.0;
							var innerCircumference = 2.0 * Math.PI * innerRadius;
							var graphCircumference = 2.0 * Math.PI * graphRadius;
							// offset is not quite spacing-- that would require solving for the arclength that
							// would create the given spacing and using that here instead of offset
							var lastTheta = theta0;
							var outerOffsetAngle = offset / graphCircumference * 2.0 * Math.PI;
							var innerOffsetAngle = offset / innerCircumference * 2.0 * Math.PI;
							criteria.each(function(i, d) {
								var percent = $("meter", d).attr("value");
								var theta = pToR(percent);
								var theta1i = lastTheta + innerOffsetAngle;
								var theta1o = lastTheta + outerOffsetAngle;
								var theta2i = theta1i + theta - 2 * innerOffsetAngle;
								var theta2o = theta1o + theta - 2 * outerOffsetAngle;
								lastTheta = lastTheta + theta;
								
								var r1 = innerRadius;
								var r2 = graphRadius;
								var p1 = translateToOrigin({'x': r1 * Math.cos(theta1i), 'y': -(r1 * Math.sin(theta1i))});
								var p2 = translateToOrigin({'x': r1 * Math.cos(theta2i), 'y': -(r1 * Math.sin(theta2i))});
								var p3 = translateToOrigin({'x': r2 * Math.cos(theta2o), 'y': -(r2 * Math.sin(theta2o))});
								var p4 = translateToOrigin({'x': r2 * Math.cos(theta1o), 'y': -(r2 * Math.sin(theta1o))});
								
								var cssClass = $(d).attr("class");
								var slice = svg.createPath();
								slice.move(p1.x, p1.y);
								slice.arc(innerRadius, innerRadius, 0, percent > 50.0 ? 1 : 0, 0, p2.x, p2.y);
								slice.line(p3.x, p3.y);
								slice.arc(graphRadius, graphRadius, 0, percent > 50.0 ? 1 : 0, 1, p4.x, p4.y);
								slice.close();
								svg.path(g, slice, {'class':cssClass});
								percentTotal += percent;
							});
		}});
		var aside = $("#grading_criteria aside");
		aside.css({'position': 'absolute', 
				'right': (graphRadius+margin-innerRadius/Math.sqrt(2)) + "px", 
				'bottom': (graphRadius+margin-innerRadius/Math.sqrt(2)) + "px", 
				'display': 'block',
				'width' : 2*innerRadius/Math.sqrt(2),
				'height' : 2*innerRadius/Math.sqrt(2)});
	}
});
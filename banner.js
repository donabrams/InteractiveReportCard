$(function(){
	var $reportId = $("#reportIdentifier");
	var height = $reportId.height();
	var width = $reportId.width();
	var botHeight = 40.0;
	var node = document.createElement("div");
	$reportId.append(node);
	$(node).svg({settings:{"height": height+botHeight, "width": width, "class": "bannerBorder"},
		onLoad: function(svg) {
			var left = svg.group({'stroke-width': 0, "class":"bannerBorder-left", "height": height, "width": 5});
			var right = svg.group({'stroke-width': 0, "class":"bannerBorder-right", "height": height, "width": 5});
			var botleft = svg.group({'stroke-width': 0, "class":"bannerBorder-botleft", "height": botHeight, "width": width/2});
			var botright = svg.group({'stroke-width': 0, "class":"bannerBorder-botright", "height": botHeight, "width": width/2});
			var repeatLength = 3.0;
			var margin = 7;
			var repetitions = (height-6)/repeatLength;
			for (var i = 0; i < repetitions;i++) {
				var l = {x:margin, y: height-margin-repeatLength*i};
				svg.ellipse(left, l.x, l.y, 1, 1, {'class':'graphBorder'});
				var r = {x:width-margin, y: height-margin-repeatLength*i};
				svg.ellipse(right, r.x, r.y, 1, 1, {'class':'graphBorder'});
			}
			edgeHyp = Math.sqrt((width-margin)*(width-margin)/4.0 + botHeight*botHeight);
			repetitions = edgeHyp/repeatLength;
			var xinc = repeatLength * (width/2-margin+1)/edgeHyp;
			var yinc = repeatLength * botHeight/edgeHyp;
			for (var i = 0; i < repetitions;i++) {
				var l = {x:width/2 - xinc*i, y: height+botHeight-margin-yinc*i};
				svg.ellipse(botleft, l.x, l.y, 1, 1, {'class':'graphBorder'});
				var r = {x:width/2 + xinc*i, y: height+botHeight-margin-yinc*i};
				svg.ellipse(botright, r.x, r.y, 1, 1, {'class':'graphBorder'});
			}
		}
	});
	node = document.createElement("div");
	$("h1",$reportId).after(node);
	var innerMargin = 50;
	var length = width-innerMargin*2;
	$(node).addClass("dottedLine").height(0).width(length)
			.svg({settings:{"height": 2, "width": length},
				onLoad: function(svg) {
					var repeatLength = 3.0;
					var repetitions = length/repeatLength;
					var line = svg.group({'stroke-width': 0, "class":"dottedLine", 
							"height": 2, "width": width-innerMargin*2});
					for (var i = 0; i < repetitions;i++) {
						svg.ellipse(line, i*repeatLength, 1, 1, 1, {'class': 'graphBorder'});
					}
				}
			});
});
$(document).ready(function () {
    runProgram()
});

function runProgram() {
	
	draw();
}

function draw() {
	// jQuery.getJSON("data/crime_2013.json", function(data){
		// $.each(data, function (index, value) {
			// console.log(this.text);
		// });
	// });
	


	var chartData = [
		["crimea",			11691,	432,	821,	2011,5073,487,875],
		["vinnytsia",		3994,	426,	486,	1168,1832,171,365],
		["volyn",			2399,	214,	229,	838,1055,150,306],
		["dnipropetrovsk",	15061,	476,	845,	1567,5249,783,1289],
		["donetsk",			16798,	958,	1260,	3751,6653,696,1242],
		["zhytomyr",		3619,	287,	567,	598,1294,210,296],
		["zakarpattia",		2967,	290,	261,	776,985,187,376],
		["zaporizhia",		10159,	422,	823,	1951,5342,610,693],
		["ivanofrankivsk",	1783,	191,	203,	353,573,180,404],
		["kyivshchyna",		6475,	234,	362,	848,1309,396,605],
		["kirovohrad",		4064,	266,	401,	856,1806,165,357],
		["luhansk",			11753,	702,	879,	2259,6161,535,1065],
		["lviv",			5745,	290,	502,	954,1472,516,1016],
		["mykolaiv",		4038,	293,	383,	850,1662,341,524],
		["odessa",			13397,	474,	620,	1012,1190,617,1157],
		["poltava",			5206,	346,	402,	981,2104,292,530],
		["rivne",			2167,	254,	357,	611,1347,185,248],
		["sumy",			3735,	243,	370,	1454,2323,234,274],
		["ternopil",		1501,	138,	167,	251,331,178,382],
		["kharkiv",			9065,	449,	708,	2195,4334,707,923],
		["kherson",			4097,	286,	616,	1619,3058,284,376],
		["khmelnytskyi",	2782,	203,	273,	588,932,114,213],
		["cherkasy",		3993,	187,	276,	473,851,203,333],
		["chernivtsi",		1847,	178,	387,	592,707,196,446],
		["chernihiv",		3039,	174,	293,	720,1118,328,296],
		["kiev",			14504,	227,	307,	282,1454,2046,1328],
		["sevastopol",		2469,	44,		93,		137,408,150,238]
	];

	
	var r = Raphael('map', 1200, 800),
		attributes = {
            fill: '#fff',
            stroke: '#3899E6',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        },
		arr = new Array();
	
	for (var country in paths) {
		
		var district = r.path(paths[country].path);
		
		district.attr(attributes);
		
		arr[district.id] = country;
		
		// var chart = district.getBBox(0);
		// var	chartX = chart.x + chart.width/2;
		// var	chartY = chart.y + chart.height/2;
		// r.popup(chartX, chartY - 20, country, 'up');
		
		district.hover(function(){
			this.animate({
				fill: '#1669AD'
			}, 300);
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
		});
		
	}
	
	for (var country in paths) {
		var point = r.path(paths[country].point);
	
		var chart = point.getBBox(0);
		var	chartX = chart.x + chart.width/2;
		var	chartY = chart.y + chart.height/2;
		
		var values = [0,0,0,0,0,0,0];
		
		for (var item in chartData){
			if (chartData[item][0] == country)
				values.push(chartData[item][1], chartData[item][2], chartData[item][3], chartData[item][4], chartData[item][5], chartData[item][6], chartData[item][7]);
		}

		var pie = r.piechart(chartX, chartY, 20, values);
		//r.popup(chartX, chartY - 20, country, 'up');
		
		pie.hover(function () {
			this.sector.stop();
			this.sector.scale(1.1, 1.1, this.cx, this.cy);
		}, function () {
			this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
		});

	}

	
}


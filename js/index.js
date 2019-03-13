var xx = 1;

var playedReportUrl = 'https://hsreplay.net/analytics/query/card_played_popularity_report/?GameType=ARENA&TimeRange=LAST_14_DAYS';
var playedReport = {};
var includedReport = 'https://hsreplay.net/analytics/query/card_included_popularity_report/?GameType=ARENA&TimeRange=LAST_14_DAYS';
var includedReport = {};
var cardsUrl = 'https://api.hearthstonejson.com/v1/28855/zhCN/cards.json';
var cards = {};

$(document).ready(function(){
	$.ajax({
		type:'GET',
		url: playedReportUrl,
		dataType:"jsonp",
		jsonp:"callback",
		contentType: "application/json",
	}).done(function( data ) {
	});
});

function callback(){
}

function setFrameToStatistic(){
	console.log(self.origin);
	$('#data_frame').attr('src', 'statistic.html');
	var frame = window.frames[0];
	frame.postMessage('adfasdfjalksjflkj123k4312343', '*');
}

function setFrameToCurve(){
	$('#data_frame').attr('src', 'curve.html');		
}


function setFrameToExcept(){
	$('#data_frame').attr('src', 'except.html');		
}


var hsData = new Object();

$(document).ready(function(){
	var cardsJsonp = document.createElement("script");
	cardsJsonp.src = "./statistic/cards.json?callback=onLoadCards";
	document.body.insertBefore(cardsJsonp, document.body.firstChild);

	var includeJsonp = document.createElement("script");
	includeJsonp.src = "./statistic/card_include.json?callback=onCardIncludeLoad";
	document.body.insertBefore(includeJsonp, document.body.firstChild);

	var playedJsonp = document.createElement("script");
	playedJsonp.src = "./statistic/card_played.json?callback=onCardPlayedLoad";
	document.body.insertBefore(playedJsonp, document.body.firstChild);

	window.addEventListener("message", onFrameMessage, false);
});

function onLoadCards(jsonCards){
	hsData.cards = jsonCards;
}

function onCardIncludeLoad(jsonCardInclude){
	hsData.includeCards = jsonCardInclude.series.data;	
}

function onCardPlayedLoad(jsonCardPlayed){
	hsData.playedCards = jsonCardPlayed.series.data;
}

function setFrameToStatistic(){
	$('#data_frame').attr('src', 'statistic.html');
	var frame = window.frames[0];
	frame.postMessage(hsData, '*');
}

function setFrameToCurve(){
	$('#data_frame').attr('src', 'curve.html');		
	var frame = window.frames[0];
	frame.postMessage(hsData, '*');
}

function setFrameToExcept(){
	$('#data_frame').attr('src', 'except.html');		
	var frame = window.frames[0];
	frame.postMessage(hsData, '*');
}

function onFrameMessage(e){
	if(e.data === "queryStatistic"){
		window.frames[0].postMessage(hsData, '*');	
	}
}

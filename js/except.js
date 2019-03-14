var cards = new Object();
var includeCards = new Object();
var playedCards = new Object();

$(document).ready(function(){
	window.addEventListener("message", onParentMessage, false);

	window.parent.postMessage("queryStatistic", '*');
});

function loadCostExceptionTable(){
		
}

function onParentMessage(e){
	cards = e.data.cards;
	includeCards = e.data.includeCards;
	playedCards = e.data.playedCards;
	loadCostExceptionTable();
}

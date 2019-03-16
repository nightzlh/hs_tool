var druidPng = "https://hsreplay.net/static/images/class-icons/druid.png";
var hunterPng = "https://hsreplay.net/static/images/class-icons/hunter.png";
var magePng = "https://hsreplay.net/static/images/class-icons/mage.png";
var paladinPng = "https://hsreplay.net/static/images/class-icons/paladin.png";
var priestPng = "https://hsreplay.net/static/images/class-icons/priest.png";
var roguePng = "https://hsreplay.net/static/images/class-icons/rogue.png";
var shamanPng = "https://hsreplay.net/static/images/class-icons/shaman.png";
var warlockPng = "https://hsreplay.net/static/images/class-icons/warlock.png";
var warriorPng = "https://hsreplay.net/static/images/class-icons/warrior.png";


var CLASS = {
	ALL : 0,
	DRUID: 1,
	HUNTER: 2,
	MAGE: 3,
	PALADIN: 4,
	PRIEST: 5,
	ROGUE: 6,
	SHAMAN: 7,
	WARLOCK: 8,
	WARRIOR: 9
};

var data = new Object;
var cards = new Array();			// dbfId => {cardClass, cost, id, }
var includeCards = new Array();		// class => dbf_id => { count, dbf_id, decks, popularity, winrate}
var playedCards = new Array();		// class => dbf_id => { dbf_id, popularity, total, winrate}

$(document).ready(function(){
	window.addEventListener("message", onParentMessage, false);
	window.parent.postMessage("queryStatistic", '*');
});

function loadStatisticData(){
		// init config
		for(var i = 0; i < data.cards.length; ++i){
			var card = data.cards[i];
			if(typeof(card.dbfId) != "undefined"){
				cards[card.dbfId] = card;
			}else{
				 // card[4557] = "{cost: 0, id: "PlaceholderCard"}"
			}
		}

		var initIncludedCards = function(classId, cards){
			var cardsByClass = new Array();
			for(var i = 0; i < cards.length; ++i){
				var card = cards[i];
				cardsByClass[card["dbf_id"]] = card;
			}
			includeCards[classId] = cardsByClass;
		};
		initIncludedCards(CLASS.ALL, data.includeCards.ALL);
		initIncludedCards(CLASS.DRUID, data.includeCards.DRUID);
		initIncludedCards(CLASS.HUNTER, data.includeCards.HUNTER);
		initIncludedCards(CLASS.MAGE, data.includeCards.MAGE);
		initIncludedCards(CLASS.PALADIN, data.includeCards.PALADIN);
		initIncludedCards(CLASS.PRIEST, data.includeCards.PRIEST);
		initIncludedCards(CLASS.ROGUE, data.includeCards.ROGUE);
		initIncludedCards(CLASS.SHAMAN, data.includeCards.SHAMAN);
		initIncludedCards(CLASS.WARLOCK, data.includeCards.WARLOCK);
		initIncludedCards(CLASS.WARRIOR, data.includeCards.WARRIOR);

		var initPlayedCards = function(classId, cards){
			var cardsByClass = new Array();
			for(var i = 0; i < cards.length; ++i){
				var card = cards[i];
				cardsByClass[card["dbf_id"]] = card;
			}
			playedCards[classId] = cardsByClass;
		};
		initPlayedCards(CLASS.ALL, data.playedCards.ALL);
		initPlayedCards(CLASS.DRUID, data.playedCards.DRUID);
		initPlayedCards(CLASS.HUNTER, data.playedCards.HUNTER);
		initPlayedCards(CLASS.MAGE, data.playedCards.MAGE);
		initPlayedCards(CLASS.PALADIN, data.playedCards.PALADIN);
		initPlayedCards(CLASS.PRIEST, data.playedCards.PRIEST);
		initPlayedCards(CLASS.ROGUE, data.playedCards.ROGUE);
		initPlayedCards(CLASS.SHAMAN, data.playedCards.SHAMAN);
		initPlayedCards(CLASS.WARLOCK, data.playedCards.WARLOCK);
		initPlayedCards(CLASS.WARRIOR, data.playedCards.WARRIOR);
}

function initExceptionTbl(){
	for(var classId = 1; classId < 10; ++ classId){
	}
}

function onParentMessage(e){
	data = e.data;
	loadStatisticData();
	initExceptionTbl();
}

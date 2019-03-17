var CLASS = {
	ALL: { id: 0, png: "https://hsreplay.net/static/images/mana_crystal.png" },
	DRUID: { id: 1, png: "https://hsreplay.net/static/images/class-icons/druid.png" },
	HUNTER: { id: 2, png: "https://hsreplay.net/static/images/class-icons/hunter.png" },
	MAGE: { id: 3, png: "https://hsreplay.net/static/images/class-icons/mage.png" },
	PALADIN: { id: 4, png: "https://hsreplay.net/static/images/class-icons/paladin.png" },
	PRIEST: { id: 5, png: "https://hsreplay.net/static/images/class-icons/priest.png" },
	ROGUE: { id: 6, png: "https://hsreplay.net/static/images/class-icons/rogue.png" },
	SHAMAN: { id: 7, png: "https://hsreplay.net/static/images/class-icons/shaman.png" },
	WARLOCK: { id: 8, png: "https://hsreplay.net/static/images/class-icons/warlock.png" },
	WARRIOR: { id: 9, png: "https://hsreplay.net/static/images/class-icons/warrior.png" }
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
		initIncludedCards(CLASS.ALL.id, data.includeCards.ALL);
		initIncludedCards(CLASS.DRUID.id, data.includeCards.DRUID);
		initIncludedCards(CLASS.HUNTER.id, data.includeCards.HUNTER);
		initIncludedCards(CLASS.MAGE.id, data.includeCards.MAGE);
		initIncludedCards(CLASS.PALADIN.id, data.includeCards.PALADIN);
		initIncludedCards(CLASS.PRIEST.id, data.includeCards.PRIEST);
		initIncludedCards(CLASS.ROGUE.id, data.includeCards.ROGUE);
		initIncludedCards(CLASS.SHAMAN.id, data.includeCards.SHAMAN);
		initIncludedCards(CLASS.WARLOCK.id, data.includeCards.WARLOCK);
		initIncludedCards(CLASS.WARRIOR.id, data.includeCards.WARRIOR);

		var initPlayedCards = function(classId, cards){
			var cardsByClass = new Array();
			for(var i = 0; i < cards.length; ++i){
				var card = cards[i];
				cardsByClass[card["dbf_id"]] = card;
			}
			playedCards[classId] = cardsByClass;
		};
		
		initPlayedCards(CLASS.ALL.id, data.playedCards.ALL);
		initPlayedCards(CLASS.DRUID.id, data.playedCards.DRUID);
		initPlayedCards(CLASS.HUNTER.id, data.playedCards.HUNTER);
		initPlayedCards(CLASS.MAGE.id, data.playedCards.MAGE);
		initPlayedCards(CLASS.PALADIN.id, data.playedCards.PALADIN);
		initPlayedCards(CLASS.PRIEST.id, data.playedCards.PRIEST);
		initPlayedCards(CLASS.ROGUE.id, data.playedCards.ROGUE);
		initPlayedCards(CLASS.SHAMAN.id, data.playedCards.SHAMAN);
		initPlayedCards(CLASS.WARLOCK.id, data.playedCards.WARLOCK);
		initPlayedCards(CLASS.WARRIOR.id, data.playedCards.WARRIOR);
}

function initExceptionTbl(){
	//for(var classId = 1; classId < 10; ++ classId){
		var tr = $("<tr></tr>");
		// class td
		var classTd = $("<td></td>");
		var classImg = $("<img/>");
		classImg.attr("src", "https://hsreplay.net/static/images/mana_crystal.png" );
		classTd.append(classImg);
		for(var i = 0; i < 11; ++i){
			classTd.append($("<td></td>"));
		}
		$("#tbl_exception").append(tr);
	//}
}

function onParentMessage(e){
	data = e.data;
	loadStatisticData();
	initExceptionTbl();
}

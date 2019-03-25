// card struct: dbfId => { cardClass, cost, id, name, race }
// includeCard struct: class => dbf_id => { count, dbf_id, decks, popularity, winrate}
// playedCard struct: class => dbf_id => { dbf_id, popularity, total, winrate}

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

var Statistic = function(data, CLASS) {
	var self = this;
	this.cards = new Map();
	this.includeCards = new Map();
	this.playedCards = new Map();
		
	var initIncludedCards = function(classId, cards){
		var cardsByClass = new Map();
		for(var i = 0; i < cards.length; ++i){
			var card = cards[i];
			if(typeof(card["dbf_id"]) == "undefined"){
				continue;
			}
			cardsByClass.set(card["dbf_id"],card);
			self.cards.set(card["dbf_id"], true);
		}
		self.includeCards.set(classId, cardsByClass);
	};
		
	var initPlayedCards = function(classId, cards){
		var cardByClass = new Map();
		for(var i = 0; i < cards.length; ++i){
			var card = cards[i];
			var x = card["dbf_id"] == "undefined";
			if(typeof(card["dbf_id"]) == "undefined"){
				continue;
			}
			cardByClass.set(card["dbf_id"], card);
			self.cards.set(card["dbf_id"], true);
		}			
		self.playedCards.set(classId, cardByClass);
	};

	var initCards = function(cards){
		for(var i = 0; i < data.cards.length; ++i) {
			var card = data.cards[i];
			if(typeof(card.dbfId) == "undefined" 
				|| !self.cards.has(card.dbfId)){
				continue;
			}
			self.cards.set(card.dbfId, card);
		}
	}

	this.selectByName = function(keyWords){
		var ret = new Map();
		var iter = self.cards.keys();
		for(var id = iter.next().value; 
			typeof(id) != "undefined"; 
			id = iter.next().value) {
			
			var card = this.cards.get(id);
			if (card.name.indexOf(keyWords) > -1) {
				//console.log(card.name);
				ret.set(card.dbfId, card.name);
			}
		}
		return ret;
	};
	
	this.getCostException = function(classId, cost){
        	var sum = 0;
		var iter = self.includeCards.get(classId).values();
	        for(var classCard = iter.next().value;
			typeof(classCard) != "undefined";
			classCard = iter.next().value){
         	       if (typeof(classCard) === "undefined"){
                	        continue;
                	}
	                var card = self.cards.get(classCard.dbf_id);
	                if ((cost < 10 && card.cost != cost) ||
        	                (cost >= 10 && card.cost < 10) ){
                	        continue;
                	}
	                sum += (classCard.count * classCard.popularity);
        	}
	        return sum / 100.0;
	}

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
	
	initCards(data.cards);
};


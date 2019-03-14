var hsData = new Object();
$(document).ready(function(){
	window.addEventListener("message", function(e){
		console.log("enter listener");
		hsData = e.data;
	}, false);
	loadTable();
});

function loadTable(){
	var includeCards = hsData.includeCards;	
	console.log("enter loadTable");
	console.log(hsData);
	console.log(includeCards);
}

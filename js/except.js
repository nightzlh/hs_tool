var statistic = Object();

$(document).ready(function(){
	window.addEventListener("message", onParentMessage, false);
	window.parent.postMessage("queryStatistic", '*');
	
	$("#input_search").on("input", onInputSearchChange);
	
});

function onInputSearchChange(){
	//console.log($(this).val());
}

function initExceptionTbl(){
	for(key in CLASS){
		if(key === "ALL"){
			continue;
		}
		
		var tr = $("<tr></tr>");
		var classImg = $("<img/>");
		classImg.attr("src", CLASS[key].png );
		classImg.attr("class", "class_img");
		var tdImg = $("<td></td>");
		tdImg.append(classImg);
		tr.append(tdImg);
		
		for(var i = 0; i < 11; ++i){
			var td = $("<td></td>");
			var exception = statistic.getCostException(CLASS[key].id, i);	
			td.html(exception.toPrecision(2));
			tr.append(td);	
		}
		
		$("#tbl_exception").append(tr);	
	}
}

function onParentMessage(e){
	data = e.data;
	statistic = new Statistic(data, CLASS);		
	initExceptionTbl();
}

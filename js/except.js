var statistic = Object();

$(document).ready(function(){
	window.addEventListener("message", onParentMessage, false);
	window.parent.postMessage("queryStatistic", '*');
	$("#input_search").on("input", onInputSearchChange);
});

function onInputSearchChange(){
	$("#search_tip_list").empty();
	var keyWord = $(this).val();
	if(keyWord.length == 0){
		$("#search_tip_tbl").removeClass("top_tbl");
		$("#search_tip_tbl").addClass("botton_tbl");
	}else{
		$("#search_tip_tbl").removeClass("botton_tbl");
		$("#search_tip_tbl").addClass("top_tbl");
		
		// create tip list
		
		var createOption = function(id, name) {
			var option = $("<option></option>");	
			option.attr("value", id);
			option.html(name);
			return option;
		}
		var names = statistic.selectByName(keyWord);	
		var iter = names.keys();
		for(var id = iter.next().value;
			typeof(id) != "undefined";
			id = iter.next().value) {
		
			var name = names.get(id);	
			var option = createOption(id, name);
			$("#search_tip_list").append(option);		
		}	
	}
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

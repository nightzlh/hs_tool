$(document).ready(function(){
	$("#btn").on('click', testFunc);
	window.addEventListener("message", function(e){
		console.log(e.data);
	}, false);
});

function testFunc(){
}

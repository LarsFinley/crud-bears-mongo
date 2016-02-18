var deleteBear = function(){
	var id = $(event.target).closest('tr').attr('id');
	var bear = $(event.target).closest('tr');
	
	if (confirm("Are you sure")) {	
	$.ajax({//method that allows us to comm with our database aka postman
		url: '/api/bears/' + id,
		method: 'DELETE',
	}).done(function(){
		bear.remove();
	})
}
}

$('.deleteBear').on('click', deleteBear);

//public side browser, not node, using jquery and html
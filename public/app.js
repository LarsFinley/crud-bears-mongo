var deleteBear = function(){
	var id = $(event.target).closest('tr').attr('id');
	var bear = $(event.target).closest('tr');
	
	if (confirm("Are you sure")) {	
	$.ajax({
		url: '/api/bears/' + id,
		method: 'DELETE',
	}).done(function(){
		bear.remove();
	})
}
}
//method that allows us to comm with our database aka =postman

	
var addBear = function(event){
	event.preventDefault();
	var name = $('#name').val();
	var age = $('#age').val();
	var gender = $('#gender').val();
	var $table = $('#bearTable');
	var bear = {};
		bear.name = name;
		bear.age = age;
		bear.gender = gender;

	$.ajax({
		url: '/api/bears',
		method: "POST",
		data: bear,
	}).done(function(data){
		console.log("worked", data);

		$table.append('<tr id=' + data._id + '>\
                   <td>' + data.name + '</td>\
                   <td>' + data.age + '</td>\
                   <td>' + data.gender + '</td>\
                   <td><button class="btn btn-danger deleteBear">Hibernate Bear</button></td>\
                 </tr>'
               );
			
			$('.deleteBear').on('click', deleteBear);
	})
	$('#name').val("");
	$('#age').val("");
	$('gender').val("");
}

$("#addBear").on("click", addBear);

//public side browser, not node, using jquery and html
var modal = $('#myModal');

var btn = $('#add');

var span = $('.close').first();

var save = $('#save')

var reset = $('#reset')

var search = $('input[name="first-name"]').val()

var tr = $('tr')

var contacts = localStorage.set('contacts', JSON.stringify(contacts))

btn.on('click',function() {
    modal.show();
    $("input[type=text]").val("");
})

span.on('click',function() {
    modal.fadeOut()
})

$(window).on('click',function(event) {
	
    if (event.target.id == 'myModal') {
        modal.fadeOut();
    }
})

save.click(function() {
	var fname = $('input[name="first-name"]').val()

	var lname = $('input[name="last-name"]').val()

	var dob = $('input[name="date-of-birth"]').val()

	var pnumber = $('input[name="phone-number"]').val()

	var email = $('input[name="email"]').val()

	var notes = $('input[name="notes"]').val()

	$('table').append('<tr><td>' + fname + '</td>' + 
		'<td>' + lname + '</td>' + 
		'<td>' + dob + '</td>' + 
		'<td>' + pnumber + '</td>' +
		'<td>' + email + '</td>' +
		'<td>' + notes + '</td></tr>');
	modal.fadeOut();
	$("input[type=text]").val("");
})

reset.bind("click", function() {
  $("input[type=text]").val("");
});


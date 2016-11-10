var modal = $('#myModal');

var btn = $('#add');

var span = $('.close').first();

var save = $('#save')

var reset = $('#reset')

var fname = $('input[name="first-name"]').val()

var lname = $('input[name="last-name"]').val()

var dob = $('input[name="date-of-birth"]').val()

var pnumber = $('input[name="phone-number"]').val()

var email = $('input[name="email"]').val()

var notes = $('input[name="notes"]').val()


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

save.on('click', function(){
	contactService();
	modal.fadeOut();
	

});   


var createNew = function() {
	var fname = $('input[name="first-name"]').val()

	var lname = $('input[name="last-name"]').val()

	var dob = $('input[name="date-of-birth"]').val()

	var pnumber = $('input[name="phone-number"]').val()

	var email = $('input[name="email"]').val()

	var notes = $('input[name="notes"]').val()


	var newContact = {
    	 fname: fname,
      	 lname: lname,
      	 dob: dob, 
      	 pnumber: pnumber,
      	 email: email,
      	 notes: notes
      	}
    return newContact;

	};


var contactService = function() {
	
	createNew();

	var oldContacts = JSON.parse(localStorage.getItem('createNew')) || [];
	
	oldContacts.push(createNew());

	localStorage.setItem('createNew', JSON.stringify(oldContacts));
}



// var grab = function() {
// 	var text, i;
// 	text = "";
	
// 	var retrieval = function() {
// 	var retrieveContacts = localStorage.getItem('createNew') || [];

// 	return JSON.parse(retrieveContacts);
// 	}	
	
// 	text = "";

// 	for (i = 0; i < retrieval.length; i++) { //displays multiple announcements
// 	    text += "<tr>";
// 	    text += "<td>" + retrieval[i].fname+ "</td>";//displaysname
// 	    text += "<td>" + retrieval[i].lname+ "</td>";//displaysclub
// 	    text += "<td>" + retrieval[i].dob+ "</td>";//displayscategory
// 	    text += "<td>" + retrieval[i].pnumber+ "</td>";//displaysgrade
// 	    text += "<td>" + retrieval[i].email+ "</td>";//displaysgender
// 	    text += "<td>" + retrieval[i].notes+ "</td></tr>";
// };

// };
//  $(document).ready(function() {
//  	return grab();
//  	$('tbody').append(grab);
//  });



$(document).ready(function() {
	update();
});

var update = function() {
	var retrieval = function() {
	var retrieveContacts = localStorage.getItem('createNew') || [];
	return JSON.parse(retrieveContacts);
}
	var table = $("<tbody/>");
	props = ["fname", "lname", "dob", "pnumber", "email", "notes"];
	$.each(retrieval(), function(rowIndex, r) {
		var row = $('<tr>');
		$.each(r,  function(collIndex, c) {
			row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
		});
		table.append(row);
	});
	$('table').append(table);
};

// $(document).ready(function() {
// 	var retrieveContacts = localStorage.getItem('createNew') || [];
// 	return retrieveContacts;
// 	retrieveContacts.each(function() {
// 	}
// });




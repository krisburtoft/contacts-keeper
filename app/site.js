var modal = $('#myModal');

var btn = $('#add');

var span = $('.close').first();

var save = $('#save');

var reset = $('#reset');

var fname = $('input[name="first-name"]');

var lname = $('input[name="last-name"]');

var dob = $('input[name="date-of-birth"]');

var pnumber = $('input[name="phone-number"]');

var email = $('input[name="email"]');

var notes = $('input[name="notes"]');

var search = $('input[name="search"]');

var update =$('#update');

var edit = $('#edit');

var del = $('#delete');

var mySort = $('#mySort');

var sortDropDown =$('#sortDropDown')

var sortBy = $('#sortBy');

var A_Z = $('#A_Z')

var Z_A = $('#Z_A')

var one_9 = $('#one_9')

var nine_1 = $('#nine_1')

function time() {
var dt = new Date();
return (dt.getYear() + ":" + dt.getMonth() + ":" + dt.getDay() + ":" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());
}

btn.on('click',function() {
    modal.show();
    mySort.hide();
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
	var newContact = saveContact();
	modal.fadeOut();
	renderContactRow(newContact);
});   

function createNew(contact) {
	var newContact = {
    	 fname: fname.val(),
      	 lname: lname.val(),
      	 dob: dob.val(), 
      	 pnumber: pnumber.val(),
      	 email: email.val(),
      	 notes: notes.val(),
      	 TS: time()
      	};
    return newContact;
};

function saveContact() {
	var newContact = createNew()
	var oldContacts = JSON.parse(localStorage.getItem('createNew')) || [];
	oldContacts.push(newContact);
	saveAllContacts(oldContacts);
	return newContact;
}

function saveAllContacts(contacts) {
	localStorage.setItem('createNew', JSON.stringify(contacts));
}

function getContacts() {
	var retrieveContacts = localStorage.getItem('createNew') || '[]';
	return JSON.parse(retrieveContacts);
}

function createEditHandler(contact) {
	return function editHandler() {
		modal.show() ;
		mySort.hide();
		fname.val(contact.fname)
		lname.val(contact.lname)
		dob.val(contact.dob)
		pnumber.val(contact.pnumber)
		email.val(contact.email)
		notes.val(contact.notes);
		save.hide();
		update.show();
		update.off('click');
		update.click(createUpdateHandler(contact));	
	}
}

function createUpdateHandler(contact) {
	return function updateContact() {
		var contacts = getContacts();
		var oldContacts = contacts.filter(function (oldContact) {
		return oldContact.TS === contact.TS;
		});

		var oldContact = oldContacts[0];
		var contactIndex = contacts.indexOf(oldContact);
		var updatedContact = createNew();
		updatedContact.TS = oldContact.TS;
		contacts.splice(contactIndex, 1, updatedContact);
		saveAllContacts(contacts);
		$('tbody tr').remove();
		renderContactRows();
		modal.hide();
		update.hide();
		save.show();
	}
}

function deleteContactFromArray(contact) {
    return function singleOutContact() {
        var contacts = getContacts();
        var oldContacts = contacts.filter(function (oldContact) {
        return oldContact.TS != contact.TS;
        });
       localStorage.setItem('createNew', JSON.stringify(oldContacts));
       $('tbody tr').remove();
		renderContactRows();
        console.log(oldContacts);
    };
}

// function createRecycleArray(contact) {
// 	return function excludedContact() {
// 	var contacts = getContacts();
// 	var oldContact1 = contacts.filter(function (oldContact) {
// 		return oldContact.TS = contact.TS;
// 	});
// 	console.log(oldContact1);	
// 	}
// }

function getContactArray() {
	return getContacts();
}

function renderContactRow(contact) {
	var editButton = $('<button id="edit" data-id="'+ contact.TS +'">' + "edit" + '</button>');
    var delButton = $('<button id="delete" data-id="'+ contact.TS +'">' + "delete" + '</button>');
    var tr = $('<tr data-id="'+ contact.TS +'"><td>' + contact.fname + '</td>' + 
		'<td>' + contact.lname + '</td>' + 
		'<td>' + contact.dob + '</td>' + 
		'<td>' + contact.pnumber + '</td>' +
		'<td>' + contact.email + '</td>' +
		'<td>' + contact.notes + '</td>' + '<td>' + 
		'</td></tr>' );
    tr.find('td').last().append(editButton).append(delButton);
    delButton.on('click', deleteContactFromArray(contact));
    editButton.on('click', createEditHandler(contact));
	$('table').append(tr);
}



sortBy.on('click', function showSort() {
	mySort.fadeIn();
	sortDropDown.show();
})

A_Z.on('click', function sortArray(event) {
	event.preventDefault();
	$('tbody tr').remove();
	sortFname().forEach(renderContactRow);
	A_Z.hide();
	Z_A.show();	
})

Z_A.on('click', function sortArray(event) {
	event.preventDefault();
	$('tbody tr').remove();
	sortFnameRev().forEach(renderContactRow);
	Z_A.hide();
	A_Z.show();	
})

one_9.on('click', function sortArray(event) {
	event.preventDefault();
	$('tbody tr').remove();
	sortPnumber().forEach(renderContactRow);
	one_9.hide();
	nine_1.show();	
})

nine_1.on('click', function sortArray(event) {
	event.preventDefault();
	$('tbody tr').remove();
	sortPnumberRev().forEach(renderContactRow);
	nine_1.hide();
	one_9.show();	
})

function sortFname() {
	return createFnameArray;
}

function sortFnameRev() {
	return createFnameArrayRev;
}

function sortLname() {
	return createLnameArray;
}

function sortLnameRev() {
	return createLnameArrayRev;
}

function sortPnumber() {
	return createPnumberArray;
}

function sortPnumberRev() {
	return createPnumberArrayRev;
}

var createFnameArray = getContactArray().sort(function(a,b)  {return (a.fname > b.fname) ? 1 : ((b.fname > a.fname) ? -1 : 0);} ); 

var createFnameArrayRev = getContactArray().sort(function(a,b)  {return (a.fname < b.fname) ? 1 : ((b.fname < a.fname) ? -1 : 0);} ); 

var createLnameArray = getContactArray().sort(function(a,b) {return (a.lname > b.lname) ? 1 : ((b.lname > a.lname) ? -1 : 0);} ); 

var createLnameArrayRev = getContactArray().sort(function(a,b) {return (a.lname < b.lname) ? 1 : ((b.lname < a.lname) ? -1 : 0);} ); 

var createPnumberArray = getContacts().sort(function(a, b) {
    return parseFloat(a.pnumber) - parseFloat(b.pnumber);
});

var createPnumberArrayRev = getContacts().sort(function(a, b) {
    return parseFloat(b.pnumber) - parseFloat(a.pnumber);
});

function checkContacts(contact) {
	var searchStr = search.val().toLowerCase();
	var isMatch = contact.fname.toLowerCase().indexOf(searchStr) >-1 || 
	contact.lname.toLowerCase().indexOf(searchStr) >-1 ||
	contact.dob.toLowerCase().indexOf(searchStr) >-1 ||
	contact.pnumber.toLowerCase().indexOf(searchStr) >-1 ||
	contact.email.toLowerCase().indexOf(searchStr) >-1 ||
	contact.notes.toLowerCase().indexOf(searchStr) >-1;
	return isMatch;
}

search.on('keyup', function() {
	 event.preventDefault();
	$('tbody').hide().empty().show();
	getContactArray().filter(checkContacts).forEach(renderContactRow);	
});

function renderContactRows() {
getContactArray().forEach(renderContactRow);
	update.hide();
}

$(document).ready(renderContactRows);
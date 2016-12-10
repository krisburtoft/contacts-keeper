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

var serbut = $('#serbut');

var edit = $('#edit');

var sort = $('#sort');

function time() {
var dt = new Date();
return (dt.getYear() + ":" + dt.getMonth() + ":" + dt.getDay() + ":" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());
}

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
	var newContact = saveContact();
	modal.fadeOut();
	renderContactRow(newContact);
});   

function createNew() {
	var newContact = {
    	 fname: fname.val(),
      	 lname: lname.val(),
      	 dob: dob.val(), 
      	 pnumber: pnumber.val(),
      	 email: email.val(),
      	 notes: notes.val(),
      	 TS: time()
      	}
    return newContact;
};

function saveContact() {
	
	var newContact = createNew()

	var oldContacts = JSON.parse(localStorage.getItem('createNew')) || [];
	
	oldContacts.push(newContact);

	saveAllContacts(oldContacts)

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
		modal.show();
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

function getContactArray() {
	return getContacts();
}

function renderContactRow(contact) {
	
	var tr = $('<tr data-id="'+ contact.TS +'"><td>' + contact.fname + '</td>' + 
		'<td>' + contact.lname + '</td>' + 
		'<td>' + contact.dob + '</td>' + 
		'<td>' + contact.pnumber + '</td>' +
		'<td>' + contact.email + '</td>' +
		'<td>' + contact.notes + '</td></tr>');
		$('table').append(tr);
		tr.dblclick(createEditHandler(contact));
}

sort.on('click', function sortArray(event) {
	event.preventDefault();
	$('tbody tr').remove();
	sortFname().forEach(renderContactRow);
})

function sortFname() {
	return createFnameArray;
}

function sortLname() {
	return createLnameArray;
}

var createFnameArray = getContactArray().sort(function(a,b)  {return (a.fname > b.fname) ? 1 : ((b.fname > a.fname) ? -1 : 0);} ); 

var createLnameArray = getContactArray().sort(function(a,b) {return (a.lname > b.lname) ? 1 : ((b.lname > a.lname) ? -1 : 0);} ); 

function checkContacts(contact) {
	var searchStr = search.val().toLowerCase();
	var isMatch = contact.fname.toLowerCase().indexOf(searchStr) >-1 || 
	contact.lname.toLowerCase().indexOf(searchStr) >-1 ||
	contact.dob.toLowerCase().indexOf(searchStr) >-1 ||
	contact.pnumber.toLowerCase().indexOf(searchStr) >-1 ||
	contact.email.toLowerCase().indexOf(searchStr) >-1 ||
	contact.notes.toLowerCase().indexOf(searchStr) >-1;

	// console.log(isMatch, contact);
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




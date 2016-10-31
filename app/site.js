// Get the modal
var modal = $('#myModal');

// Get the button that opens the modal

var btn = $('#add');

// Get the <span> element that closes the modal
var span = $('.close').first();

// When the user clicks on the button, open the modal 
btn.on('click',function() {
    modal.show();
})

// When the user clicks on <span> (x), close the modal
span.on('click',function() {
    modal.fadeOut()
})

// When the user clicks anywhere outside of the modal, close it
$(window).on('click',function(event) {
	debugger
    if (event.target.id == 'myModal') {
        modal.fadeOut();
    }
})


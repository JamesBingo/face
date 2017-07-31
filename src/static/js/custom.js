$(function() {

  $('[data-skin]').on('click', function(e) {
    e.preventDefault();
    var skin = $(this).data('skin');
    $('#style-skin').attr('href', 'assets/css/skin-'+ skin +'.css');
  });

  // Sidebar-boxed: Try it section
  $('#sb-left-side').on('click', function() {
    $('.sidebar-boxed').removeClass('sidebar-right');
  });

  $('#sb-right-side').on('click', function() {
    $('.sidebar-boxed').addClass('sidebar-right');
  });

  $('#sb-skin-light').on('click', function() {
    $('.sidebar-boxed').removeClass('sidebar-dark');
  });

  $('#sb-skin-dark').on('click', function() {
    $('.sidebar-boxed').addClass('sidebar-dark');
  });

});

$(".hover-row").hover( 
  function() {
    document.body.style.cursor = "pointer";
  }, function() {
    document.body.style.cursor = "default"
  } )

$('.word').click(
  function(event) {

    // Grab the data
    $.get('/static/messages.json',
      function (data) {

        let word = {sa:subaddress,number:event.currentTarget.id}

        // Lookup word and subaddress in data
        message = data.find(function(element){
          return element.subaddress==this.sa
        },word)

        word = message.words.find(function(element){
          return element.number==this.number
        },word)

        console.log(word)

        // Set the modal data
        $('#word-title').html(message.name)
        $('#word-name').html(word.name)
        $('#word-lsb').html('<strong>lsb: </strong>'+word.lsb)
        $('#word-units').html('<strong>units: </strong>'+word.units)
        $('#word-number').html('<strong>number: </strong>'+word.number)


        // Display the modal
        $('#myModal').modal()

      }
    ,'json')
  
  })
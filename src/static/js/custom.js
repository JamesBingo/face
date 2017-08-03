modal = `<section>
        <h2><%= word.name %></h2>

          <% if (word.discrete) { %>
            <table id="messages" class="table table-hover">
              <thead>
                <tr>
                  <th>Bit No.</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>              
                <% for(var i = 0; i < word.bits.length; ++i) {%>
                  <tr id="<%= word.bits[i].bit %>" class="hover-row word">
                    <th scope="row"><%= word.bits[i].bit %></th>
                    <td><%= word.bits[i].name %></td>
                    <td><%= word.bits[i].description %></td>
                  </tr>
                <% } %>
              </tbody>
            </table>
          <% } else { %>
            <p><strong>Number: </strong><%= word.number %></p>
            <p><strong>Lsb: </strong><%= word.lsb %></p>
            <p><strong>Length: </strong><%= word.length %></p>
            <p><strong>Padding: </strong><%= word.padding %></p>
            <p><strong>Units: </strong><%= word.units %></p>
          <% } %>
        </section>`


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
        $('#modal-body').html(ejs.render(modal,{word:word}))

        // Display the modal
        $('#myModal').modal()

      }
    ,'json')
  
  })
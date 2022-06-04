$("#create_tokens").submit(function(e) {
    e.preventDefault();
});

enviar = function() {

    var form = $("#create_tokens");

    var actionUrl = "http://127.0.0.1:3000/";
    
    $.ajax({
        type: "get",
        url: actionUrl,
        crossDomain: true,
        dataType: 'jsonp',
        headers: {
              "accept": "application/json",
             "Access-Control-Allow-Origin":"*"
         },
        data: form.serialize(), // serializes the form's elements.
        success: function(data)
        {
          alert(data); // show response from the php script.
        }
    });

}

$("#create_tokens").submit(function(e) {
    e.preventDefault();
});

enviar = function() {

    var form = $("#create_tokens");

    var actionUrl = "https://tk.4u2c.xyz/";
    
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

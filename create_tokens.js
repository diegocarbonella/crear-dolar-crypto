$("#create_tokens").submit(function(e) {
    e.preventDefault();
});

enviar = async function() {

    form = $("#create_tokens");

    data = form.serializeArray();

    console.log("data", data)

    $("#messageResult").text("Procesando la transacción...");

    try {
        
        contract = await createToken(data[1].value, data[2].value, data[3].value);
        ethereumPrice = 1087.24;
        dollarPrice = 236;
        gas = parseInt(temp0.deployTransaction.gasPrice._hex);
        
        
        $("#messageResult").text("Dirección de contrato " + contract.address);

        // $("#gasPesos").text("Gastaste $" + ethereumPrice*dollarPrice* pesos + " en GAS.");

    } catch (error) {

        console.log(error);
        $("#messageResult").text("Hubo un error!");
        
    }




    //var actionUrl = "http://127.0.0.1:3000/";

    //createToken();
    
    // $.ajax({
    //     type: "get",
    //     url: actionUrl,
    //     crossDomain: true,
    //     dataType: 'jsonp',
    //     headers: {
    //           "accept": "application/json",
    //          "Access-Control-Allow-Origin":"*"
    //      },
    //     data: form.serialize(), // serializes the form's elements.
    //     success: function(data)
    //     {
    //       alert(data); // show response from the php script.
    //     }
    // });

}


$(document).ready( async () => {

    if (window.ethereum == undefined) {
    
        $("#from").attr("disabled", true);
        $("#to").attr("disabled", true);
        $("#contract").attr("disabled", true);
        $("#quantity").attr("disabled", true);
        $("#send").attr("disabled", true);
    
        $("#metamaskNetwork").text("Metamask no está instalado");
        return;
        
    }

    const network = await getNetwork();
    $("#metamaskNetwork").text("Metamask está conectado a la red " + network);

});

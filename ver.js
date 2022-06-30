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


JSON.parse(localStorage.tokens2).forEach(function(a,b){

	console.log(a)
	address = $("<p>").text(a);
	$("#misTokens").append(address);

})
var getBalance = async function(address, contractAddress) {

    var provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contractMeta = await fetch ('PodemosCoin.json').then( r => r.json() )
    var contract = new ethers.Contract(contractAddress, contractMeta.abi, signer);

    try {

        var balance = await contract.balanceOf(address);
        let formattedBalance = ethers.utils.formatEther(balance);
        return formattedBalance;

    }
    catch(err) {

        // console.log("err", err);
        return null;

    }

}

var sendTransaction = async function(toAddress, quantity, contractAddress) {

    //para que esto funcione la red de metamask tiene ser localhost

    var provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("wallet_requestPermissions", [{eth_accounts: {}}]);
    signer = provider.getSigner();
    
    url = 'PodemosCoin.json'
    
    contractMeta = await fetch (url).then( r => r.json() )
    
    contract = new ethers.Contract(contractAddress, contractMeta.abi, signer);

    tx = await contract.transfer(toAddress, ethers.utils.parseUnits(quantity, "wei"));

    recibo = await tx.wait();

    return recibo;

}

var getNetwork = async function () {

    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    return network.name;

}



var updateToBalance = async function() {

    const $to = $("#to");
    const $contract = $("#contract");

    const contractAddress = $contract.val();
    const toAddress = $to.val();

    const balance = await getBalance(toAddress, contractAddress);

    if (balance == null) {

        $("#balanceTo").text("Error!");
        return;

    } else {

        $("#balanceTo").text(balance);

    }


}

var updateFromBalance = async function() {

    const $from = $("#from");
    const $contract = $("#contract");

    const contractAddress = $contract.val();
    const fromAddress = $from.val();

    const balance = await getBalance(fromAddress, contractAddress);

    if (balance == null) {

        $("#balanceFrom").text("Error!");
        return;

    } else {

        $("#balanceFrom").text(balance);
        
    }

    $("#balanceFrom").text(balance);

}

var changeNetwork = async function() {

    updateFromBalance();
    updateToBalance();

}

$(document).ready( async () => {

    if (window.ethereum == undefined) {

        $("#from").attr("disabled", true);
        $("#to").attr("disabled", true);
        $("#contract").attr("disabled", true);
        $("#quantity").attr("disabled", true);
        $("#send").attr("disabled", true);

        console.log("Metamask no está iniciado");
        return;
        
    }

    var provider = new ethers.providers.Web3Provider(window.ethereum);
    var promptWindowWallets= await provider.send("wallet_requestPermissions", [{eth_accounts:{}}]);

    var accounts = promptWindowWallets[0].caveats[1].value;

    accounts.forEach((a) => {
        let $option = $("<option>");
        $option.text(a);
        $("#from").append($option)
    
    })

    const network = await getNetwork();
    $("#metamaskNetwork").text("Metamask está conectado a la red " + network);

    updateFromBalance();
    updateToBalance();

    $("#to").change( async () => {

        updateToBalance();
    
    })

    $("#network").change( async () => {
    
        changeNetwork();
    
    })
    
    $("#from").change( async () => {
    
        updateFromBalance();
    
    })
    
    $("#send").click(async () => {
    
        let toAddress           = $("#to").val();
        let quantity            = $("#quantity").val();
        let contractAddress     = $("#contract").val();
        let network             = $("#network").val();
    
        let resultado = await sendTransaction(toAddress, quantity, contractAddress, network);

        console.log("resultado", resultado)
    
        updateFromBalance();
        updateToBalance();
    
    })

});
function notify(text) {
  $("#notifications").text(text);
}

PodemosCoin = '';

async function load() {

  PodemosCoin = await fetch ('PodemosCoin.json').then( r => r.json() )
  
}

load();


tokenAddToMetamask= async function (nombreToken, abreviacion, direccion) {
	//FROM: https://docs.metamask.io/guide/rpc-api.html#wallet-watchasset
	await ethereum
	.request({
	  method: 'wallet_watchAsset',
	  params: {
	    type: 'ERC20',
	    options: {
	      address: direccion,
	      symbol: abreviacion,
	      decimals: 18,
	      image: 'https://foo.io/token-image.svg',
	    },
	  },
	})
	.then((success) => {
	  if (success) {
	    notify(abreviacion+" se agrego a tu billetera")
	  } else {
	    throw new Error('Something went wrong.');
	  }
	})
	.catch(alert);
}

walletConectar = async function () { //U: llamar SIEMPRE para conectar la wallet
	//TODO: agregar manejo de errores similar a otras funciones
  try {
    console.log("d1");
    paso= "Pedir cuenta";
    const accounts= window.ethereum.request({ method: 'wallet_requestPermissions', params: [{eth_accounts: {} }] }); //A: volver a pedir account

    paso="Obtener provider";
    console.log("d2");

    provider = new ethers.providers.Web3Provider(window.ethereum, "any");

		// Prompt user for account connections
		await provider.send("eth_requestAccounts", []);

    paso="Obtener signer";
    console.log("d3");

    signer = provider.getSigner();

    paso="Obtener cuentas";
    console.log("d4");

    walletAddress= await signer.getAddress();
  
    paso="Obtener saldo";
    console.log("d5");

    balance = await provider.getBalance(walletAddress);

    console.log("d6");

    console.log({signer, walletAddress, balance});


    notify("Su cuenta="+walletAddress+" saldo="+balance);
    return {signer, walletAddress, balance}

  } catch (ex) {
    notify("Error conectando wallet paso="+paso)
    throw ex;
  }
}

createToken = async function (nombreToken, abreviacion, cantidad) {
  try {
    await walletConectar()

    paso="Obtener factory";
    factory = new ethers.ContractFactory(PodemosCoin.abi, PodemosCoin.bytecode, signer);

    paso="Obtener contrato";
    cantidadEnWei= ethers.utils.parseEther(cantidad+"")
    contract = await factory.deploy(nombreToken, abreviacion, cantidadEnWei, walletAddress);

    try {
       tokenDbGuardar(walletAddress,contract.address, nombreToken)
    }
    catch (ex) {
       notify("Error registrando token en nuestra base de datos.\nGuardalo en Metamask");
    }

    tokenAddToMetamask(nombreToken, abreviacion, contract.address)
    return contract;
} catch(ex) {
  notify("Error creando token paso="+paso);
}
}


var getBalance = async function(address, contractAddress) {

  var provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  var contract = new ethers.Contract(contractAddress, PodemosCoin.abi, signer);

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
  
  contract = new ethers.Contract(contractAddress, PodemosCoin.abi, signer);

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

tokenDbBuscar= async function() {
  await walletConectar();
  tokensCreados= await fetch('t.php',{
	method:'POST', 
	headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
	body: 'c='+walletAddress
  }).then(r=>r.json())
  return tokensCreados;
}

tokenDbGuardar= async function(creador_addr, token_addr, token_desc) {
  tokensCreados= await fetch('t.php',{
	method:'POST', 
	headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
	body: 'c='+creador_addr+'&t='+token_addr+'&d='+token_desc
  }).then(r=>r.json())
}


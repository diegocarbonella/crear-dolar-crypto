async function main() {

    const [owner] = await ethers.getSigners();

    console.log("owner.address", owner.address);

    const SecondWalletAddress = "0x86e9fD4703b4b1da9020eF12549FC19D71720813";

    const contract = await ethers.getContractFactory("PodemosCoin");

    const RCPT = await contract.deploy("PodemosCoin", "PAC", 100, owner.address);
 
    console.log("Contract deployed to address:", RCPT.address);

    console.log("Balance MyWallet: ", await RCPT.balanceOf(SecondWalletAddress));
    console.log("Balance Owner: ", await RCPT.balanceOf(owner.address));

    const encolada = await RCPT.transfer(SecondWalletAddress, 5); //A: envia pero no se procesa todavía

    console.log("recibida", encolada);

    const resultado = await encolada.wait(); //A: esperamos que se procese

    console.log(resultado);

    console.log("Balance MyWallet: ", await RCPT.balanceOf(SecondWalletAddress));
    console.log("Balance Owner: ", await RCPT.balanceOf(owner.address));

}
 
main()
  .then(() => process.exit(0))
  .catch(error => {
 
     console.error(error);
 
     process.exit(1);
 
   });
 
 
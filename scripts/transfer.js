const path = require("path");
const fs = require("fs-extra")

//este script sirve para hacer transacciones con un contrato ya creado
//podés hacerlo en ropsten o en localhost

async function main() {

    const [owner] = await ethers.getSigners();

    const SecondWalletAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

    const contractMeta = await fs.readJson(path.resolve("artifacts/contracts/PodemosCoin.sol/PodemosCoin.json"));

    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    
    const contract = new ethers.Contract(contractAddress, contractMeta.abi, owner);

    let saldoOwner = await contract.balanceOf(owner.address);

    console.log({saldoOwner:ethers.utils.formatEther(saldoOwner)});

    let SecondWalletSaldo = await contract.balanceOf(SecondWalletAddress);
    
    console.log({SecondWalletSaldo:ethers.utils.formatEther(SecondWalletSaldo)});

    let tx = await contract.transfer(SecondWalletAddress, 5);

    //A:mandamos la transacción pero no se procesó

    let recibo = await tx.wait();

    //A:ahora se procesó

    saldoOwner = await contract.balanceOf(owner.address);

    console.log({saldoOwner:ethers.utils.formatEther(saldoOwner)});

    SecondWalletSaldo = await contract.balanceOf(SecondWalletAddress);
    
    console.log({SecondWalletSaldo:ethers.utils.formatEther(SecondWalletSaldo)});

}
 
main()
  .then(() => process.exit(0))
  .catch(error => {
 
     console.error(error);
 
     process.exit(1);
 
   });
 
 
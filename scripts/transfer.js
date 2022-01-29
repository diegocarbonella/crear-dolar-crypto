const path = require("path");
const fs = require("fs-extra")

async function main() {

    const [owner] = await ethers.getSigners();

    const SecondWalletAddress = "0x86e9fD4703b4b1da9020eF12549FC19D71720813";

    const contract = await ethers.getContractFactory("PodemosCoin");

    const contractMeta = await fs.readJson(path.resolve("artifacts/contracts/PodemosCoin.sol/PodemosCoin.json"));

    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    
    const contract2 = new ethers.Contract(contractAddress, contractMeta.abi, owner);

    let saldoOwner = await contract2.balanceOf(owner.address);

    console.log({saldoOwner:ethers.utils.formatEther(saldoOwner)});

    let SecondWalletSaldo = await contract2.balanceOf(SecondWalletAddress);
    
    console.log({SecondWalletSaldo:ethers.utils.formatEther(SecondWalletSaldo)});

    let tx = await contract2.transfer(SecondWalletAddress, 3);

    //A:mandamos la transacción pero no se procesó

    let recibo = await tx.wait();

    //A:ahora se procesó

    saldoOwner = await contract2.balanceOf(owner.address);

    console.log({saldoOwner:ethers.utils.formatEther(saldoOwner)});

    SecondWalletSaldo = await contract2.balanceOf(SecondWalletAddress);
    
    console.log({SecondWalletSaldo:ethers.utils.formatEther(SecondWalletSaldo)});

}
 
main()
  .then(() => process.exit(0))
  .catch(error => {
 
     console.error(error);
 
     process.exit(1);
 
   });
 
 
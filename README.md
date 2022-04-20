# Comandos útiles

npx hardhat compile # compila el contrato

npx hardhat node # dejar ejecutando el nodo local en una terminal

npx hardhat run scripts/token.js --network localhost # desplegar en nodo local, OJO, abrir el nodo antes!

npx hardhat run scripts/token.js --network ropsten # desplegar en ropsten network

npx http-server # para tener un servidor estático

# Cómo obtener la PRIVATE KEY en MetaMask

Saqué la clave privada de las cuentas de la ventanita donde ejecuté el nodo y las importé en metamask "Import Private Key"

# Conectar ethers.js con MetaMask (front)

Crear una red en metamask que se llame localhost y que tenga el chainId de hardhat (31337 por defecto)

https://docs.ethers.io/v5/single-page/#/v5/getting-started/-%23-getting-started--connecting

# Si da error a la hora de hacer envios locales, puede solucionarse resetenado la wallet de metamask

https://docs.metamask.io/guide/getting-started.html#resetting-your-local-nonce-calculation

# Dirección de contrato en ropsten

0x8811ccEbd0cF789716049c9C4D8bf4eA2CA25f26

# Dirección de contrato en local

0x86e9fD4703b4b1da9020eF12549FC19D71720813

# Probar el contrato y hacer transacciones

https://diegocarbonella.github.io/crear-dolar-crypto/
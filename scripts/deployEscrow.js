const { ethers } = require("hardhat");

async function main() {
    const LibraryFactory = await ethers.getContractFactory("Price");
    const Price = await LibraryFactory.deploy();
    await Price.deployed();

    const ContractFactory = await ethers.getContractFactory(
        "Escrow", 
        {
            libraries: {
                Price: Price.address
            }
        }
    );
    const Escrow = await ContractFactory.deploy();
    await Escrow.deployed();
    console.log(`Escrow smart contract has been deployed to address: ${Escrow.address}\n`);
}

main().catch((err) => {
    console.log(err);
})
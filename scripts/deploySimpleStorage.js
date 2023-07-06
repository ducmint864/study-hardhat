// imports

const { ethers, run, network } = require("hardhat")

// async main
async function main() {
    const ContractFactory = await ethers.getContractFactory("SimpleStorage");
    const Contract = await ContractFactory.deploy();
    await Contract.deployed();

    console.log("Contract deployed to " + Contract.address);
    console.log("\t\t------------------------ Network information ------------------------\n");
    console.log(network.config);
    console.log("\n\t\t---------------------------------------------------------------------\n");
    // console.log("\n-> Waiting 5 blocks before verifying contract:)\n")
    // await Contract.deployTransaction.wait(5); // wait 5 blocks after receiving transaction receipt to verify the contract 
    // await verify(Contract.address);

    // interacting with the contract
    const currentValue = await Contract.retrieve();
    console.log(`The current value is ${currentValue}\n`);
    await Contract.store(currentValue + 1);
}

async function verify(contractAddress) {
    console.log("Verifying contract!\n");
    try {
        await run("verify:verify", {
            address: contractAddress,
            network: "goerli_testnet"
        });
    } catch (e) { console.log(e); }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// call main
main().then(() => {
    process.exit(0)
        .catch((error) => {
            console.log(error);
            process.exit(1);
        })
})
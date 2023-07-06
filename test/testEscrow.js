const { ethers } = require("hardhat");
const { assert, expect } = require("chai");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Escrow", function() {
    let EscrowContractFactory
    let PriceLibraryFactory
    let Price;
    let Escrow;
    const testTask1 = "Hi, this is test task number 1";
    const testTask2 = "Hi, this is test task number 2";

    beforeEach(async function() {
        PriceLibraryFactory = await ethers.getContractFactory("Price");
        Price = await PriceLibraryFactory.deploy();
        EscrowContractFactory = await ethers.getContractFactory(
            "Escrow",
            {
                libraries: {
                    Price: Price.address
                }
            }
        );
        Escrow = await EscrowContractFactory.deploy();
        await Escrow.deployed(); 
    })

    // Tested functions: addTask(), viewTask()
    it("should be able to register new tasks", async function() {
        await Escrow.addTask(testTask1);
        assert.equal(await Escrow.viewTask(), testTask1);
    })

    // Testted function: addTask(), viewTask()
    it("should show only the most-recently added task", async function() {
        await Escrow.addTask(testTask1);
        await Escrow.addTask(testTask2);
        assert.equal(await Escrow.viewTask(), testTask1);
    })

    // Tested functions: addTask(), taskCount()
    it("should show the correct number of tasks", async function() {
        await Escrow.addTask(testTask1);
        await Escrow.addTask(testTask2);
        assert.equal(await Escrow.taskCount(), 2);
    })

    // Tested functions: fund(), viewBalance(), viewBalanceInUSD()
    it("should update the balance correctly whenever it gets funded", async function() {
        const amount = "1000000000000000000";
        await Escrow.fund({value : amount});
        assert.equal(await Escrow.viewBalanceInString(), amount);
    })


    // // Tested function: startTask(), 
    // it("should be able to start tasks successfully")
    // {
    //     if (tasks > 0) 
    // }
});
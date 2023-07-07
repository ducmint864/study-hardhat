const { ethers } = require("hardhat");
const { assert, expect } = require("chai");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Escrow", function () {
    let EscrowContractFactory
    let PriceLibraryFactory
    let Price;
    let Escrow;
    const testTask1 = "Hi, this is test task number 1";
    const testTask2 = "Hi, this is test task number 2";

    beforeEach(async function () {
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
    it("should be able to register new tasks", async function () {
        await Escrow.addTask(testTask1);
        assert.equal(await Escrow.viewTask(), testTask1);
    })

    // Testted function: addTask(), viewTask()
    it("should show only the most-recently added task", async function () {
        await Escrow.addTask(testTask1);
        await Escrow.addTask(testTask2);
        assert.equal(await Escrow.viewTask(), testTask1);
    })

    // Tested functions: addTask(), taskCount()
    it("should show the correct number of tasks", async function () {
        await Escrow.addTask(testTask1);
        await Escrow.addTask(testTask2);
        assert.equal(await Escrow.taskCount(), 2);
    })

    // Tested functions: fund(), viewBalanceInString()
    it("should update and show the correct the balance of escrow whenever it gets funded", async function () {
        const expectedAmount = await ethers.BigNumber.from("1000000000000000000");
        await Escrow.fund({ value: expectedAmount });
        let tmp = await Escrow.viewBalanceInString();
        const actualAmount = await ethers.BigNumber.from(tmp);
        assert.isTrue(actualAmount.eq(expectedAmount));
    })
});
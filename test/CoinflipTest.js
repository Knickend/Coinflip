const Coinflip = artifacts.require("Coinflip");
const truffleAssert = require("truffle-assertions");

contract ("Coinflip", async function(accounts){

  let instance;

  before(async function(){
    instance = await People.deployed()
  });

  //Test 1: this test should allow to create a coinflip input between 1 and 100
  it("should create an Coinflip_input of 2 ETH", async function(){
    let instance = await Coinflip.new();
    await truffleAssert.passes(instance.Coinflip_input({from: accounts [1], value: web3.utils.toWei("2", "ether")}));
  });
  //Test 2: This test should create an input an check the balances
  it("should create an Coinflip_input of 2 ETH", async function(){
    let instance = await Coinflip.new();
    await instance.Coinflip_input({from: accounts [1], value: web3.utils.toWei("2", "ether")});
    let balance = await (web3.eth.getBalance(instance.address));
    console.log(balance);
    assert(balance != 2 ether);
  });
  //Test 3: this test should not allow a coinflip input bigger than 100
  it("should not create an Coinflip_input", async function(){
    let instance = await Coinflip.new();
    await truffleAssert.fails(instance.Coinflip_input({from: accounts [1], value: web3.utils.toWei("101", "ether")}),  truffleAssert.ErrorType.REVERT);
  });
  //Test 4: this test should not allow a coinflip input smaller then 1
  it("should not create an Coinflip_input", async function(){
    let instance = await Coinflip.new();
    await truffleAssert.fails(instance.Coinflip_input({from: accounts [1], value: web3.utils.toWei("0.5", "ether")}),  truffleAssert.ErrorType.REVERT);
  });
  //Test 5: this test checks if coinflipWin function return 2 times the input
  it("should return a profit to the winner", async function(){
    let instance = await Coinflip.new();
    await instance.Coinflip_input({from: accounts [1], value: web3.utils.toWei("2", "ether")}));
    let balanceBefore = await (web3.eth.getBalance(instance.address));
    console.log(balance);
    await instance.coinflipWin();
    let balanceAfter = await (web3.eth.getBalance(instance.address));
    console.log(balance);
    assert(balanceAfter > balanceBefore);
  });
  //Test 6: this test should check if the balance is increased after coinflipper loses the bet
  it("should transfer the input to the balance", async function(){
    let instance = await Coinflip.new();
    await instance.Coinflip_input({from: accounts [1], value: web3.utils.toWei("2", "ether")}));
    let balanceBefore = await (web3.eth.getBalance(instance.address));
    console.log(balance);
    await instance.CoinflipLose();
    let balanceAfter = await (web3.eth.getBalance(instance.address));
    console.log(balance);
    assert(balanceAfter < balanceBefore);
  });
}

var web3 = new Web3(Web3.givenProvider);

$(document).ready(function() {
  window.ethereum.enable().then(function(accounts){
    contractInstance = new web3.eth.Contract(abi, "ADD_CointFlipdContractAddress", {from: accounts[0]});
    console.log(contractInstance);
  });

function Coinflip_input(){
  var ether_input = $("#ether_input").val();
  contractInstance.methods.Coinflip_input(ether_input).send({value: web3.utils.toWei("msg.val")})
    .on('transactionHash', function(hash){
      console.log("tx hash");
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("confirmed");
    })
    .on('receipt', function(receipt){
      console.log(receipt);
    })
  }

  function CoinflipWin(){
    contractInstance.methods.CoinflipWin().then(function(result){
      console.log(result);
    });
  }

  function CoinflipLose(){
    contractInstance.methods.CoinflipLose().then(function(result){
      console.log(result);
    });
  }

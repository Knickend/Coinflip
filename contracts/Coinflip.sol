import "./SafeMath.sol";
import "./ContractOwner.sol";
pragma solidity 0.5.8;

contract Coinflip is ContractOwner{

  using SafeMath for uint256;

  uint private balance;




  //This creates a map for storing addresses and coinflib ETH bets
  mapping (address => uint256) private CoinflipStorage;
  address[] private coinflipper;

  // Events
  event EthDepositComplete(uint256 EtherInput);

  //This function creates the input (minimum 1 ETH) for the coinflip
  //The input is stored in the map CoinflipStorage
  function Coinflip_input(uint256 EtherInput) public payable{
    //CHECK
    require (msg.value >= 1 ether);
    balance += msg.value;
    //EFFECTS
    uint256 EtherInput = uint256;
    //TRANSACTION
    coinflipper.push(msg.sender);
    //CHECK
    assert(EtherInput>100);
    //emit Event
    emit EthDepositComplete(EtherInput);
  }

  //This function returns  profit(ETH deposit*2) to the player
  function CoinflipWin(address[]) external payable {
      //CHECK
      require(address[1].val() > 0);
      address = msg.sender;
      var amount = address.val();
    //  var profit = mul(2,amount);
      var profit = 2*amount;

      //EFFECTS
      address.val() = 0;
      balance -= profit;
      //TRANSACTION
      address.transfer(profit);
      //CHECK
      assert (address.val() == 0);
    }

    // This function transfers the players ETH to contract balance
    function CoinflipLose(address[]) private payable {
        //CHECK
        require(address.msg.sender.val() > 0);
        address = address(1);
        var amount = address.val();
        //EFFECTS
        address.msg.sender.val() = 0;
        balance += amount;
        //TRANSACTION
        address.transfer(amount);
        //CHECK
        assert (address.msg.sender.val() == 0);
      }

      // This function allows the owner to withdraw the contract balance
      function withdrawAll() private onlyOwner returns(uint) {
          // CHECK
          require(balance > 0);
          uint256 toTransfer = balance;
          // EFFECTS
          balance = 0;
          // TRANSACTION
          msg.sender.transfer(toTransfer);
          return toTransfer;
          //CHECK
          assert(balance == 0 );
      }
      //This function checks the coinflip balance (only visible for owner)
      function getBalance() private returns(uint){
        return balance;
      }
}

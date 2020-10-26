pragma solidity 0.5.8;


contract ContractOwner{

address payable public owner;

 modifier onlyOwner(){
        require(address[0] == owner);
        _; //Continue execution
    }

    constructor () internal {
      owner = address[0];
    }

}

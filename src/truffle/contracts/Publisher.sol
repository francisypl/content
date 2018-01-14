pragma solidity ^0.4.15;

import './SafeMath.sol';

contract Publisher {
    
    using SafeMath for uint256;
    
    address owner;
    string public privateKey;
    uint256 public price;
    
    address promoter;

    function Publisher(string _privateKey, uint256 _price, address _promoter) payable {
        owner = msg.sender;
        privateKey = _privateKey;
        price = _price * 1000000000000000000;
        promoter = _promoter;
    }
    
    function () payable {
        fallBackCalled();
    }
    
    function fallBackCalled() constant returns (string) {
        return "fallback was called";
    }
   
    // for consumers
    function getKey() payable returns (string) {
        require(
            msg.value >= price
        );
        
        if (msg.value > price) {
            uint256 amountTransferBack = msg.value.sub(price);
            msg.sender.transfer(amountTransferBack);
        }
        
        return privateKey;
    }
    
    function publisherCashOut() {
        require(msg.sender == owner);
        
    }
    
    function promoterCashOut() {
        require(msg.sender == promoter);
    }
     
}
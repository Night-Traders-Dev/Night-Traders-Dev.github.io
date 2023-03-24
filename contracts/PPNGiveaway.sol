// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PolyPenGiveaway is Ownable {
    IERC20 public polyPenToken;
    mapping(address => bool) public authorizedSenders;

    event TokenSent(address indexed sender, address indexed receiver, uint256 amount);

    constructor(address _polyPenToken) {
        polyPenToken = IERC20(_polyPenToken);
    }

    modifier onlyAuthorizedSenders() {
        require(authorizedSenders[msg.sender], "Only authorized senders can perform this action");
        _;
    }

    function authorizeSender(address sender) public onlyOwner {
        authorizedSenders[sender] = true;
    }

    function revokeSenderAuthorization(address sender) public onlyOwner {
        authorizedSenders[sender] = false;
    }

    function depositTokens(uint256 amount) external {
        require(polyPenToken.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
    }

    function sendTokens(address recipient, uint256 amount) external onlyAuthorizedSenders {
        require(polyPenToken.transfer(recipient, amount), "Token transfer failed");
        emit TokenSent(msg.sender, recipient, amount);
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        require(polyPenToken.transfer(msg.sender, amount), "Token transfer failed");
    }
}

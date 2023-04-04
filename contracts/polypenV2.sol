// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.7; 

import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol"; 

contract PolyPen is ERC20, Ownable { 
    address public taxAddress;
    uint256 public taxRate;

    constructor() ERC20("PolyPen", "PPN") { 
        uint256 initialSupply = 100000000000 * 10**decimals(); 
        _mint(msg.sender, initialSupply); 
        taxAddress = msg.sender;
        taxRate = 8; // 8% tax rate by default
    }

    function setTaxAddress(address _taxAddress) public onlyOwner {
        require(_taxAddress != address(0), "Invalid tax address");
        taxAddress = _taxAddress;
    }

    function setTaxRate(uint256 _taxRate) public onlyOwner {
        require(_taxRate <= 100, "Invalid tax rate"); // Tax rate cannot be greater than 100%
        taxRate = _taxRate;
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        uint256 taxAmount = (amount * taxRate) / 100;
        uint256 netAmount = amount - taxAmount;
        _transfer(_msgSender(), taxAddress, taxAmount);
        _transfer(_msgSender(), recipient, netAmount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        uint256 taxAmount = (amount * taxRate) / 100;
        uint256 netAmount = amount - taxAmount;
        _transfer(sender, taxAddress, taxAmount);
        _transfer(sender, recipient, netAmount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()] - amount + netAmount);
        return true;
    }
}

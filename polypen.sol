// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PolyPen is ERC20, Ownable {
    constructor() ERC20("PolyPen", "PPN") {
            // Mint the initial supply of 100 billion tokens to the contract creator
                    uint256 initialSupply = 100000000000 * 10**decimals();
                            _mint(msg.sender, initialSupply);
                                }
                                }
                                

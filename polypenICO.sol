// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PolyPenICO is Ownable, ReentrancyGuard {
    IERC20 public polyPenToken;
        uint256 public tokensPerMatic;
            uint256 public constant FEE_PERCENTAGE = 120; // 1.2%

                event TokensPurchased(address indexed buyer, uint256 maticSpent, uint256 tokensReceived);
                    event TokensWithdrawn(address indexed owner, uint256 amount);
                        event MaticWithdrawn(address indexed owner, uint256 amount);

                            constructor(IERC20 _polyPenToken, uint256 _tokensPerMatic) {
                                    require(address(_polyPenToken) != address(0), "Invalid token address");
                                            require(_tokensPerMatic > 0, "Tokens per Matic must be greater than 0");

                                                    polyPenToken = _polyPenToken;
                                                            tokensPerMatic = _tokensPerMatic;
                                                                }

                                                                    function buyTokens() external payable nonReentrant {
                                                                            _buyTokens(msg.sender, msg.value);
                                                                                }

                                                                                    receive() external payable {
                                                                                            _buyTokens(msg.sender, msg.value);
                                                                                                }

                                                                                                    function _buyTokens(address buyer, uint256 maticAmount) private {
                                                                                                            uint256 tokensToBuy = maticAmount * tokensPerMatic;
                                                                                                                    uint256 fee = (tokensToBuy * FEE_PERCENTAGE) / 10000;
                                                                                                                            uint256 tokensReceived = tokensToBuy - fee;

                                                                                                                                    require(polyPenToken.balanceOf(address(this)) >= tokensReceived, "Not enough tokens in the contract");
                                                                                                                                            require(polyPenToken.transfer(buyer, tokensReceived), "Token transfer failed");

                                                                                                                                                    emit TokensPurchased(buyer, maticAmount, tokensReceived);
                                                                                                                                                        }

                                                                                                                                                            function withdrawTokens(uint256 amount) external onlyOwner {
                                                                                                                                                                    require(polyPenToken.balanceOf(address(this)) >= amount, "Not enough tokens in the contract");
                                                                                                                                                                            require(polyPenToken.transfer(msg.sender, amount), "Token transfer failed");

                                                                                                                                                                                    emit TokensWithdrawn(msg.sender, amount);
                                                                                                                                                                                        }

                                                                                                                                                                                            function withdrawMatic() external onlyOwner {
                                                                                                                                                                                                    uint256 maticBalance = address(this).balance;
                                                                                                                                                                                                            require(maticBalance > 0, "No Matic to withdraw");

                                                                                                                                                                                                                    (bool success, ) = msg.sender.call{value: maticBalance}("");
                                                                                                                                                                                                                            require(success, "Matic withdrawal failed");

                                                                                                                                                                                                                                    emit MaticWithdrawn(msg.sender, maticBalance);
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        

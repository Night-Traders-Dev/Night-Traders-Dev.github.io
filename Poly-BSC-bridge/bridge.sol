// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract PolyPenBridge {
    using SafeERC20 for IERC20;

    address public admin;
    address public bscToken;
    address public maticToken;
    uint256 public totalTransferredBSC;
    uint256 public totalTransferredMatic;

    event TransferredToBSC(address indexed user, uint256 amount);
    event TransferredToMatic(address indexed user, uint256 amount);

    constructor(address _admin, address _bscToken, address _maticToken) {
        admin = _admin;
        bscToken = _bscToken;
        maticToken = _maticToken;
    }

    function transferToBSC(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        IERC20(maticToken).safeTransferFrom(msg.sender, address(this), _amount);
        IERC20(bscToken).safeTransfer(msg.sender, _amount);
        totalTransferredBSC += _amount;
        emit TransferredToBSC(msg.sender, _amount);
    }

    function transferToMatic(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        IERC20(bscToken).safeTransferFrom(msg.sender, address(this), _amount);
        IERC20(maticToken).safeTransfer(msg.sender, _amount);
        totalTransferredMatic += _amount;
        emit TransferredToMatic(msg.sender, _amount);
    }

    function setAdmin(address _admin) external {
        require(msg.sender == admin, "Only admin can call this function");
        admin = _admin;
    }

    function withdrawBSC(address _to, uint256 _amount) external {
        require(msg.sender == admin, "Only admin can call this function");
        IERC20(bscToken).safeTransfer(_to, _amount);
    }

    function withdrawMatic(address _to, uint256 _amount) external {
        require(msg.sender == admin, "Only admin can call this function");
        IERC20(maticToken).safeTransfer(_to, _amount);
    }
}

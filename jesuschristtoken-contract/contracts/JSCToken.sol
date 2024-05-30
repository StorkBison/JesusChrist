// SPDX-License-Identifier: MIT

import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/OFTV2.sol";

pragma solidity ^0.8.0;

/// @notice Use this contract only on the BASE CHAIN. It locks tokens on source, on outgoing send(), and unlocks tokens when receiving from other chains.
contract JCT is OFTV2 {
    mapping(address => bool) private blackList;

    constructor(address _layerZeroEndpoint) OFTV2("JesusChristToken", "JCT", 8, _layerZeroEndpoint) {
        blackList[address(0)] = true;
        blackList[msg.sender] = true;
    }

    function mintTokens(address to, uint256 _amount) external onlyOwner {
        _mint(to, _amount * 10 ** super.decimals());
    }

    function addBlackList(address _address, bool _isBlack) external onlyOwner {
      blackList[_address] = _isBlack;
    }

    // Antibot function 
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) override internal virtual {
      if(!blackList[from] && !blackList[to])
        require(amount < super.totalSupply() / 1000, "Cant transfer tokens more than 0.1% of totalSupply.");
    }
    
    function burn(uint256 value) external {
        _burn(msg.sender, value);
    }
}
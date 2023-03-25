// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract ResourceData {
    bytes public resourcesJson = "{\"keys\": [\"Wood\", \"Maple\", \"Mahogany\", \"Bamboo\", \"Petrified Wood\", \"Teak\", \"Fish\", \"Pike Fish\", \"Salmon\", \"Tuna\", \"Swordfish\", \"Marlin\", \"Geodes\", \"Iron\", \"Olivine\", \"Magnetite\", \"Silver\", \"Gold\", \"Platinum\", \"Titanium\", \"Fungi\", \"Olives\", \"Coconut\", \"Lobster\", \"Truffles\", \"Caviar\", \"Saffron\", \"Vanilla\", \"Fresh Water\", \"Water Spring\", \"Hydroelectricity\", \"Geothermal\", \"Solar\", \"Wind\", \"Nuclear\", \"Lavender\", \"Rose\", \"Jasmine\", \"Orchid\", \"Peony\"], \"values\": [100, 350, 700, 1000, 2500, 3200, 100, 500, 800, 1200, 2000, 2500, 100, 500, 800, 1300, 5000, 10000, 15000, 18000, 250, 500, 250, 500, 1000, 2000, 3500, 4000, 10000, 25000, 25000, 25000, 30000, 35000, 40000, 2500, 3000, 3500, 4000, 4500]}";


    mapping(string => uint256) public resourceValues;

    constructor() {
        parseResourcesJson();
    }

    function parseResourcesJson() internal {
        (string[] memory keys, uint256[] memory values) = abi.decode(resourcesJson, (string[], uint256[]));

        require(keys.length == values.length, "Invalid JSON format");

        for (uint256 i = 0; i < keys.length; i++) {
            resourceValues[keys[i]] = values[i];
        }
    }

    function getResourceValue(string calldata resourceName) external view returns (uint256) {
        return resourceValues[resourceName];
    }
}

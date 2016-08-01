// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_owner1","type":"address"},{"name":"_owner2","type":"address"}],"name":"setOwners","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"a_portion","type":"uint256"},{"name":"b_portion","type":"uint256"}],"name":"setProportions","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"portionB","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner2","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner1","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"portionA","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a031916331790556101d3806100246000396000f36060604052361561006c5760e060020a600035046302d05d3f811461009f57806341c0e1b5146100b157806348405b49146100d9578063497af9d01461011657806351025b9e146101305780635270972514610139578063736889141461014b578063f5b0b70a1461015d575b6101666001546000906002340490600160a060020a03168282606082818181858883f19350505050151561018057610002565b6101b2600054600160a060020a031681565b6101c560005433600160a060020a03908116911614156101d157600054600160a060020a0316ff5b6101666004356024356001805473ffffffffffffffffffffffffffffffffffffffff19908116841782556002805491909116831790555b92915050565b610166600435602435600382905560048190556001610110565b6101c760045481565b6101b2600254600160a060020a031681565b6101b2600154600160a060020a031681565b6101c760035481565b60408051918252519081900360200190f35b600191505090565b600254604051600160a060020a0391909116908390348490039082818181858883f19350505050151561017857610002565b600160a060020a03166060908152602090f35b005b6060908152602090f35b56",
    unlinked_binary: "606060405260008054600160a060020a031916331790556101d3806100246000396000f36060604052361561006c5760e060020a600035046302d05d3f811461009f57806341c0e1b5146100b157806348405b49146100d9578063497af9d01461011657806351025b9e146101305780635270972514610139578063736889141461014b578063f5b0b70a1461015d575b6101666001546000906002340490600160a060020a03168282606082818181858883f19350505050151561018057610002565b6101b2600054600160a060020a031681565b6101c560005433600160a060020a03908116911614156101d157600054600160a060020a0316ff5b6101666004356024356001805473ffffffffffffffffffffffffffffffffffffffff19908116841782556002805491909116831790555b92915050565b610166600435602435600382905560048190556001610110565b6101c760045481565b6101b2600254600160a060020a031681565b6101b2600154600160a060020a031681565b6101c760035481565b60408051918252519081900360200190f35b600191505090565b600254604051600160a060020a0391909116908390348490039082818181858883f19350505050151561017857610002565b600160a060020a03166060908152602090f35b005b6060908152602090f35b56",
    address: "0x700f5e6f13afd7c186d6d69a91518a617f98738b",
    generated_with: "2.0.9",
    contract_name: "RevShare"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("RevShare error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("RevShare error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("RevShare error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("RevShare error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.RevShare = Contract;
  }

})();

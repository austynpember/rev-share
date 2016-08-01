/**
 * Simple revenue sharing contract.
 * Receives Ether payments and divides that payment amongst the owners.
 * @title RevShare
 * @author Paul Szczesny
 * updated and edited by Austyn Pember
 */

contract RevShare {
	address public creator;
	address public owner1;
	address public owner2;
	uint256 public portionA;
	uint256 public portionB;


	function RevShare() {
		creator = msg.sender;
	}
	
	function setOwners(address _owner1, address _owner2) returns (bool success) {
		owner1 = _owner1;
		owner2 = _owner2;
		return true;
	}
	
	function setProportions(uint a_portion, uint b_portion) returns (bool success) {
		portionA = a_portion;
		portionB = b_portion;
		return true;
	}

	function () returns (bool success) {
		uint amount = msg.value / 2;
		if (!owner1.send(amount)) throw;
		if (!owner2.send(msg.value - amount)) throw;
		return true;
	}

	function kill() {
    if (msg.sender == creator) suicide(creator); // Kill contract
  }
}

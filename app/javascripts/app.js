var accounts;
var account;
var balance;
var owner1;
var owner2;

/**
 * Set a message in the status bar
 * @param message The Message to place in the status bar
 * @param type The kind of message to place, based on bootstrap alerts (http://getbootstrap.com/components/#alerts)
 */
function setStatus(message, type="info") {
  var status = document.getElementById("status");
  $("#status").removeClass (function (index, css) {
    return (css.match (/(^|\s)alert-\S+/g) || []).join(' ');
  }).addClass("alert-" + type);
  status.innerHTML = message;
};

function setAddress() {
  document.getElementById("c_address").innerHTML = RevShare.deployed_address;
  document.getElementById("qr").innerHTML = "<img src=\"https://chart.googleapis.com/chart?cht=qr&chs=350&chl=ether:"+ RevShare.deployed_address +"\" height=\"250\" />";
}

function refreshBalances() {
  document.getElementById("c_balance").innerHTML = web3.fromWei(web3.eth.getBalance(RevShare.deployed_address), "ether").toFixed(5);
  document.getElementById("a_balance").innerHTML = web3.fromWei(web3.eth.getBalance(document.getElementById("a_address").value), "ether").toFixed(5);
  document.getElementById("b_balance").innerHTML = web3.fromWei(web3.eth.getBalance(document.getElementById("b_address").value), "ether").toFixed(5);
  document.getElementById("cb_balance").innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), "ether").toFixed(5)+ " ETH";
};

/*function getOwners(){
  var revshare = RevShare.deployed();
  revshare.getOwners.call(RevShare.deployed_address, {from:account}).then(function(data){
  	document.getElementById("a_address").value = data[0].valueOf();
  	document.getElementById("b_address").value = data[1].valueOf();
  }).catch(function(error){
    console.log(error);
  });
}*/

/**
 * Set the owners of the accounts we are splitting the ETH into
 * @param owner1
 * @param owner2
 */
function setOwners() {
  if(isAddress(document.getElementById("a_address").value) && isAddress(document.getElementById("b_address").value)) {
	 setStatus("Setting the owner accounts and unlocking if necessary... (please wait)");
	  if (isProportionsValid()) {
		setProportions();
	  }
	  else {
		setStatus("Your proportion percentages need to add up to 100", "danger");
		return;
	  }
  	 var revshare = RevShare.deployed();
  	 revshare.setOwners.call(document.getElementById("a_address").value, document.getElementById("b_address").value,  {from:account}).then(function(data){
  	  /*web3.eth.personal.unlockAccount(owner1, document.getElementById("a_password").value, 1000);
	  web3.eth.personal.unlockAccount(owner2, document.getElementById("b_password").value, 1000);*/
	  refreshBalances();
	  document.getElementById("a_address").style.border = "1px solid green";
	  document.getElementById("b_address").style.border = "1px solid green";
	  document.getElementById("inputIconA").style.visibility = "hidden";
	  document.getElementById("inputIconB").style.visibility = "hidden";
	  setStatus("Owners set successfully", "success");
	}).catch(function(error){
		setStatus("Error setting owners: " + error, "danger");
		console.log(error);
  	}); 
  }
	else {
		setStatus("1 or more addresses were not valid", "danger");
	}
}

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
		console.log("Address does not meet basic requirements");
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};
/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x','');
    var addressHash = sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            console.log("NotChecksumAddress");
			return false;
        }
    }
    return true;
};

/**
 * Set the proportion percentages of distribution to the owners (recipients)
 * @param owner1
 * @param owner2
 */
function setProportions() {
  	 var revshare = RevShare.deployed();
  	 revshare.setProportions.call(parseInt(document.getElementById("a_portion").value), parseInt(document.getElementById("b_portion").value),  {from:account}).then(function(data){
	  refreshBalances();
	}).catch(function(error){
		setStatus("Error setting proportion: " + error, "danger");
		console.log(error);
  	});
}

var isProportionsValid = function () {
    var a = parseInt(document.getElementById("a_portion").value, 10);
    var b = parseInt(document.getElementById("b_portion").value, 10);
    if ( a + b == 100 ) {
		return true;
    }
	else {
		return false;
	}
}

function killContract(){
  var selectBox = document.getElementById('select-box');
  var selectedAddr = selectBox.options[selectBox.selectedIndex].text;
  RevShare.deployed().kill({from: selectedAddr}).then(function(result){
    console.log(result);
  });
}

function send() {
  var rs = RevShare.deployed();

  var amount = web3.toWei(parseFloat(document.getElementById("amount").value), "ether");

  setStatus("Initiating transaction... (please wait)");

  web3.eth.sendTransaction({from: web3.eth.coinbase, to: RevShare.deployed_address, value: amount}, function(error, result) {
    if(error) {
      console.log(error);
      setStatus(error);
    }
    else {
      web3.eth.getTransactionReceiptMined(result).then(function(receipt) {
        setStatus("Transaction complete!");
        refreshBalances();
      }).catch(function(e) {
        console.log(e);
        setStatus(e);
      });
    }
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
	  
      document.getElementById("select-box").innerHTML += '<option>' + RevShare.deployed_address + '</option>'

    accounts = accs;
    account = accounts[0];
	  
    setAddress();
    refreshBalances();
  });

  web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
    var transactionReceiptAsync;
    interval |= 500;
    transactionReceiptAsync = function(txnHash, resolve, reject) {
        try {
            var receipt = web3.eth.getTransactionReceipt(txnHash);
            if (receipt == null) {
                setTimeout(function () {
                    transactionReceiptAsync(txnHash, resolve, reject);
                }, interval);
            } else {
                resolve(receipt);
            }
        } catch(e) {
            reject(e);
        }
    };

    return new Promise(function (resolve, reject) {
        transactionReceiptAsync(txnHash, resolve, reject);
    });
  };
}

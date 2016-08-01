# RevShare
Simple revenue sharing dApp. Splits incoming ether between the owners of the contract.
Updated and added to by Austyn Pember
Original author Paul Szczesny

## Dependencies
* [Node.js & npm](https://nodejs.org)
* [Truffle](https://github.com/ConsenSys/truffle)
* [Geth](https://github.com/ethereum/go-ethereum/wiki/geth) or [testrpc](https://github.com/ethereumjs/testrpc)

## Run
*  `truffle build`
*  `truffle serve`

##Updates
Added Kill button
Added functionality for manually inputting accounts to recieve funds
Added proportional percentages but could not get this to work as it requires some intricate use of solidity ETH math that I am not versed on
Added password check but found that there is no way to do unlock an account from the front end as far as I understand it.

## License
[MIT](https://github.com/dsystems-io/rev-share/blob/master/LICENSE)

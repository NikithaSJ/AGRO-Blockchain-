//var db = require('../Database/db.js');
var express = require('express');
var Web3 =require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider ("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

var Farmers = web3.eth.contract([
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "FarmersData",
    "outputs": [
      {
        "name": "FarmersAddress",
        "type": "address"
      },
      {
        "name": "FarmersName",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "RetailersData",
    "outputs": [
      {
        "name": "RetailersAddress",
        "type": "address"
      },
      {
        "name": "RetailersName",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "FarmersMData",
    "outputs": [
      {
        "name": "FarmersMAddress",
        "type": "address"
      },
      {
        "name": "FarmersMName",
        "type": "string"
      },
      {
        "name": "WeightofCrop",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_error",
        "type": "string"
      }
    ],
    "name": "errorLog",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "fmname",
        "type": "string"
      }
    ],
    "name": "FarmersMDataEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "fname",
        "type": "string"
      }
    ],
    "name": "FarmersDataEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "rname",
        "type": "string"
      }
    ],
    "name": "RetailersDataEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "farmeradd",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "farmersmarketadd",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "weight",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "balfarmer",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "balfm",
        "type": "uint256"
      }
    ],
    "name": "SellGoods",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "retailersadd",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "farmersmarketadd",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "weight",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "balretailer",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "balfm",
        "type": "uint256"
      }
    ],
    "name": "BuyGoods",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "sucess",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "_FarmersMName",
        "type": "string"
      }
    ],
    "name": "AddFarmersMarketData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_FarmersAddress",
        "type": "address"
      },
      {
        "name": "_FarmersName",
        "type": "string"
      }
    ],
    "name": "AddFarmersData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_RetailersAddress",
        "type": "address"
      },
      {
        "name": "_RetailersName",
        "type": "string"
      }
    ],
    "name": "AddRetailerData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "_FarmersAddress",
        "type": "address"
      },
      {
        "name": "_weight",
        "type": "uint256"
      }
    ],
    "name": "FarmersMarketSell",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "_RetailersAddress",
        "type": "address"
      },
      {
        "name": "_weight",
        "type": "uint256"
      }
    ],
    "name": "RetailersMarketBuy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]);


var Farmers = Farmers.at("0xd62c42ecbac4bc8ece51abab4287f816f1c2a761");


exports.Farmers = Farmers;
exports.web3Module = web3;

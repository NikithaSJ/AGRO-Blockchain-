var FarmersModule = require('./configuration.js');
var db = require('../Database/db.js');
var express = require('express');

var Farmers = FarmersModule.Farmers;
var Web3 = FarmersModule.web3Module;
var listAccount = Web3.eth.accounts;
var data1 = "";
var temp = "";
var teacherID = "";


exports.addFarmersDataGet = function(req,res){
	
	var query = db.query('SELECT * FROM farmers_details',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('addFarmersData',{page_title:"Farmers details",data:rows});
		}
	 });

	//res.render('addFarmersData', {page_title:"Farmers details"});
}

exports.addFarmersData = function(req,res){
	
	var query = db.query('SELECT * FROM farmers_details',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('addFarmersData',{page_title:"Farmers details",data:rows});
		}
	 });
	var FID = req.body.farmersId;
	var FName = req.body.farmersName;
	
	
	var bodyParser = require('body-parser');
	
	console.log("Farmer Ethereum Address " + FID);
	console.log("Farmer Name "+ FName);
	
	Farmers.AddFarmersData(FID, FName,{gas:400000});


	var eventAddFarmer = Farmers.FarmersDataEvent({_from:Web3.eth.coinbase},{fromBlock:'latest', toBlock :'latest'});


	eventAddFarmer.watch(function(error, result){
	if (error)
	{
		console.log("Error inserting : %s ",error );
	} else {
		var insertData = {
		TX_HASH : result.transactionHash,
		ETH_Address : result.args.owner,
		FarmersName : result.args.fname, 
		};
		console.log(result);
		var query = db.query("INSERT INTO farmers_details set ? ",insertData, function(err, rows)
		{
				if (err)
					console.log("Error inserting : %s ",err );
			});
	}
	});

	
};




exports.addRetailersDataGet = function(req,res){
	var query = db.query('SELECT * FROM retailers_details',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('addRetailersData',{page_title:"Farmers details",data:rows});
		}
	 });
	//res.render('addRetailersData', {page_title:"Retailers details"});

	
}


exports.addRetailersDataPost = function(req,res){
	
	var query = db.query('SELECT * FROM retailers_details',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('addRetailersData',{page_title:"Farmers details",data:rows});
		}
	 });

	var RID = req.body.RID;
	var RName = req.body.RName;
	
	
	var bodyParser = require('body-parser');
	
	console.log("Retailer Ethereum Address " + RID);
	console.log("Retailer Name "+ RName);

	Farmers.AddRetailerData(RID, RName, {gas:400000});
	var insertData = {
		//TX_HASH : result.transactionHash,
		ETH_Address : RID,
		RatailersName : RName,              
		};
	
		var query = db.query("INSERT INTO retailers_details set ? ",insertData, function(err, rows)
		{
				if (err)
					console.log("Error inserting : %s ",err );
			});
/*	
	var eventAddRetailers = Farmers.RetailersDataEvent({_from:Web3.eth.coinbase},{fromBlock:'latest', toBlock :'latest'});

	eventAddRetailers.watch(function(error, result){
	if (error)
	{
		console.log("Error inserting : %s ",error );
	} else {
		var insertData = {
		TX_HASH : result.transactionHash,
		ETH_Address : RID,
		RatailersName : RName,              
		};
		console.log(result);
		var query = db.query("INSERT INTO retailers_details set ? ",insertData, function(err, rows)
		{
				if (err)
					console.log("Error inserting : %s ",err );
			});
	}
	});
*/
	Farmers.transfer(RID,1000, {gas:400000});

};

exports.addFMDataGet = function(req,res){
	
var query = db.query('SELECT * FROM farmersmarket_details',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('addFMData',{page_title:"Farmers details",data:rows});
		}
	 });
	
}


exports.addFMDataPost = function(req,res){
	
	var query = db.query('SELECT * FROM farmersmarket_details',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('addFMData',{page_title:"Farmers details",data:rows});
		}
	 });

	var FMName = req.body.FMName;
	var FMID = req.body.FMID;
	
	
	var bodyParser = require('body-parser');
	
	console.log(FMID, FMName);
	
	console.log("Farmer Market Ethereum Address " + FMID);
	console.log("Farmer Market Name "+ FMName);

	Farmers.AddFarmersMarketData(FMID, FMName, {gas:400000});

	var eventAddFM = Farmers.FarmersMDataEvent({_from:Web3.eth.coinbase},{fromBlock:'latest', toBlock :'latest'});


	eventAddFM.watch(function(error, result){
	if (error)
	{
		console.log("Error inserting : %s ",error );
	} else {
		var insertData = {
		TX_HASH : result.transactionHash,
		ETH_Address : FMID,
		Fmname : FMName,           
		};
		console.log(result);
		var query = db.query("INSERT INTO farmersmarket_details set ? ",insertData, function(err, rows)
		{
				if (err)
					console.log("Error inserting : %s ",err );
			});
	}
	});

};



exports.FarmersSellGet = function(req,res){
	var query = db.query('SELECT * FROM sell ',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('FarmersSell',{page_title:"Farmers details",data:rows});
		}
	 });
	//res.render('FarmersSell', {page_title:"Farmers Seller Market"});
	
}


exports.FarmersSellPost = function(req,res){
	
	var query = db.query('SELECT * FROM sell',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('FarmersSell',{page_title:"Farmers details",data:rows});
		}
	 });

	var FMID = req.body.FMID;
	var farmersId = req.body.farmersId;
	var weight = req.body.weight;
	
	var bodyParser = require('body-parser');
	
	console.log(FMID, farmersId, weight);

	Farmers.FarmersMarketSell(FMID, farmersId, weight, {gas:400000});
	var x = Farmers.balanceOf(FMID);
	var y = Farmers.balanceOf(farmersId);
	var z = Farmers.FarmersMData(FMID);
	console.log("Balance of Farmers Market" + JSON.stringify(x) + " Farmer Token");
	console.log("Balance of Farmer" + JSON.stringify(y) + " Farmer Token");
	console.log("Weight of goods for Farmers Market" + JSON.stringify(z[2]) + " Pounds");

	var eventSell = Farmers.SellGoods({_from:Web3.eth.coinbase},{fromBlock:'latest', toBlock :'latest'});


	eventSell.watch(function(error, result){
	if (error)
	{
		console.log("Error inserting : %s ",error );
	} else {
		var insertData = {
		TX_HASH : result.transactionHash,
		FETH_Address : result.args.farmeradd,
		FMETH_Address : result.args.farmersmarketadd,
		weight : result.args.weight,
		farmerbal :	result.args.balfarmer,
		farmermbal : result.args.balfm,         
		};
		console.log(result);
		var query = db.query("INSERT INTO sell set ? ",insertData, function(err, rows)
		{
				if (err)
					console.log("Error inserting : %s ",err );
			});
	}
	});

};

exports.RetailersBuyGet = function(req,res){

	var query = db.query('SELECT * FROM buy',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('RetailersBuy',{page_title:"Farmers details",data:rows});
		}
	 });
	
	//res.render('RetailersBuy', {page_title:"Retailers Market"});
	
	
}


exports.RetailersBuyPost = function(req,res){
	
	var query = db.query('SELECT * FROM buy',function(err,rows){
		if(err){
			  console.log("Error Selecting : %s ",err );
		} else {
		  res.render('RetailersBuy',{page_title:"Farmers details",data:rows});
		}
	 });

	var FMID = req.body.FMID;
	var RID = req.body.RID;
	var weight = req.body.weight;
	
	var bodyParser = require('body-parser');
	
	console.log(FMID, RID, weight);
	
	//Farmers.transfer(RID,1000, {gas:400000});

	Farmers.RetailersMarketBuy(FMID, RID, weight, {gas:400000});
	var x = Farmers.balanceOf(FMID);
	var y = Farmers.balanceOf(RID);
	var z = Farmers.FarmersMData(FMID);
	console.log("Balance of Farmers Market" + JSON.stringify(x) + " Farmer Token");
	console.log("Balance of Retailer" + JSON.stringify(y) + " Farmer Token");
	console.log("Weight of goods" + JSON.stringify(z[2]) + " Pounds");
	
	var eventBuy = Farmers.BuyGoods({_from:Web3.eth.coinbase},{fromBlock:'latest', toBlock :'latest'});

	eventBuy.watch(function(error, result){
	if (error)
	{
		console.log("Error inserting : %s ",error );
	} else {
		var insertData = {
		TX_HASH : result.transactionHash,
		RETH_Address : result.args.retailersadd,
		FMETH_Address : result.args.farmersmarketadd,
		weight : result.args.weight,
		retailersbal :	result.args.balretailer,
		fmbal : result.args.balfm,         
		};
		console.log(result);
		var query = db.query("INSERT INTO buy set ? ",insertData, function(err, rows)
		{
				if (err)
					console.log("Error inserting : %s ",err );
			});
	}
	});

};




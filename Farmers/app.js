var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./routers/pages.js');
var modules = require('./routers/module.js');

var port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || port);


app.get('/addFarmer',modules.addFarmersDataGet);
app.post('/addFarmer',modules.addFarmersData);

app.get('/addRetailers',modules.addRetailersDataGet);
app.post('/addRetailers',modules.addRetailersDataPost);


app.get('/addFM',modules.addFMDataGet);
app.post('/addFM',modules.addFMDataPost);


app.get('/sell',modules.FarmersSellGet);
app.post('/sell',modules.FarmersSellPost);


//app.get('/balance',modules.BalanceGet);
//app.post('/balance',modules.BalancePost);


app.get('/buy',modules.RetailersBuyGet);
app.post('/buy',modules.RetailersBuyPost);

/*
app.get('/studentDataTable',modules.studentDataTable);


app.get('/error',routes.error);
app.get('/error1',routes.error1);
*/

app.listen(port, function() {
  console.log("Listening on " + port);

});

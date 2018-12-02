exports.addFarmersDataGet = function(req,res){
    res.render('addFarmersData', { title: 'BlockChain' });
};

exports.adminget = function(req,res){
    res.render('adminlogin', { title: 'BlockChain' });
};

exports.error = function(req,res) {
  res.render('error',{title: 'error teacher'});
};
exports.error1 = function(req,res) {
  res.render('error1',{title: 'error admin'});
};
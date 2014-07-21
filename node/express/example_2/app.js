var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

var performOp = function(paramStr, operation) {
    var paramArr = paramStr.split("/");

    var sum = paramArr.reduce(function(acc, num){
      return operation(parseInt(acc),parseInt(num));
    });
   
    console.log(paramStr);
    return sum;
}
  
 
app.get('/add/*', function(req, res) {
  var add = function(num1, num2){ 
    return num1 + num2;
  };
  var result = performOp(req.params['0'], add);
  res.send("" + result);
});

 
app.get('/subtract/*', function(req, res) {
  var subtract = function(num1, num2){ 
    return num1 - num2;
  };
  var result = performOp(req.params['0'], subtract);
  res.send("" + result);
});

app.get('/multiply/*', function(req, res) {
  var multiply = function(num1, num2){ 
    return num1 * num2;
  };
  var result = performOp(req.params['0'], multiply);
  res.send("" + result);
});

app.get('/divide/*', function(req, res) {
  var divide = function(num1, num2){ 
    return num1 / num2;
  };
  var result = performOp(req.params['0'], divide);
  res.send("" + result);
});

app.listen(3000);


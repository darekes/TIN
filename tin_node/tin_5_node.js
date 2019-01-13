var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    var operation = url.parse(req.url).pathname.substring(1);
    res.writeHead(200, {"Content-Type": "text/html"});
    validateRequest(operation, params, res);
    var number1 = parseInt(params['number1']);
    var number2 = parseInt(params['number2']);
    var result = calculate(operation, number1, number2);
    var htmlContent = 'Operation: ' + operation + '<br>' + 'Parameters: ' + number1 + ', ' + number2 + '<br>' + 'Calculation result: ' + result;
    res.end('<html lang="en"><body><p>' + htmlContent + '<p></body></html>');
});

function validateRequest(operation, params, res){
    var validation_successful = true;
    var allowed_operations = ['add', 'sub', 'mul', 'div'];
    var error_message = '';
    if(!allowed_operations.includes(operation)){
        error_message = error_message + 'Error: such operation: ' + operation + ' is not allowed.<br>';
        validation_successful = false;
    }
    if('number1' in params && 'number2' in params){
        if(isNaN(params['number1']) || isNaN(params['number2'])){
            error_message = error_message + 'Error: provided parameters are not a numbers.<br>';
            validation_successful = false;
        }
    } else {
        if(!('number1' in params) && !('number2' in params)){
            error_message = error_message + 'Error: bad both parameters.<br>';
        } else if (!('number1' in params) && 'number2' in params){
            error_message = error_message + 'Error: bad first parameter.<br>';
        } else if ('number1' in params && !('number2' in params)){
            error_message = error_message + 'Error: bad second parameter.<br>';
        }
        validation_successful = false;
    }

    if(!validation_successful){
        res.end('<html lang="en"><body><p>' + error_message + '<p></body></html>');
    }
}

function calculate(operation, n1, n2){
    var result = 0;
    switch(operation){
        case 'add':
            result = n1 + n2;
            break;
        case 'sub':
            result = n1 - n2;
            break;
        case 'mul':
            result = n1 * n2;
            break;
        case 'div':
            result = n1 / n2;
            break;
    }
    return result;
}

server.listen(8080);
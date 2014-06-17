/* Node JS script to deploy the web site ( minify HTML, JS and CSS / crunsh images ) */

/* configuration */

var jsFilesToMinimized = ["i18n/i18n.js", "js/main.js"];
var jsOutput = "../min.js";

/* ************* */


/* Global variable */

var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

var jsLoad = 0;
var jsData = '';

/* *************** */

/* Minify JS */

function minifiedJS(dataRead) {
    
    jsData += dataRead;
    ++jsLoad;

    if (jsLoad == jsFilesToMinimized.length) {

        var query = querystring.stringify({
            input: jsData.replace("../dev", "./dev")
        });

        var req = http.request({
                method: 'POST',
                hostname: 'javascript-minifier.com',
                path: '/raw',
            },
            function (resp) {
                // if the statusCode isn't what we expect, get out of here
                if (resp.statusCode !== 200) {
                    console.log('StatusCode=' + resp.statusCode);
                    return;
                }

                var minifiedJS = fs.createWriteStream(jsOutput);
                resp.pipe(minifiedJS);

                // This is here incase any errors occur
                minifiedJS.on('error', function (err) {
                    console.log(err);
                });

            }
        );
        req.on('error', function (err) {
            throw err;
        });
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setHeader('Content-Length', query.length);
        req.end(query, 'utf8');
    }
};

for	(var i = 0; i < jsFilesToMinimized.length; ++i) {
    
    fs.readFile(jsFilesToMinimized[i], 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        
        /// If there is no error
        minifiedJS(data);
    });
};

/* ********* */
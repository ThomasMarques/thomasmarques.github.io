/* Node JS script to deploy the web site ( minify HTML, JS and CSS / replacing libs to cdn / crunsh images ) */

/* configuration */

var jsFilesToMinimized = ["i18n/i18n.js", "js/main.js"];
var jsOutput = "../min.js";
var cssFilesToMinimized = ["css/font-face.css", "css/style.css"];
var cssOutput = "../min.css";

/* ************* */


/* Global variable */
var fs = require('fs');
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
var cleanCSS = require('clean-css');
var htmlMinifier = require('html-minifier')

var jsLoad = 0;
var jsData = '';
var cssLoad = 0;
var cssData = '';

/* *************** */


/* Minify JS */

function minifiedJS(dataRead) {

    jsData += dataRead;
    ++jsLoad;

    if (jsLoad == jsFilesToMinimized.length) {

        var ast = jsp.parse(jsData.replace("../dev", "./dev"));
        ast = pro.ast_mangle(ast); 
        ast = pro.ast_squeeze(ast);

        fs.writeFile(jsOutput, pro.gen_code(ast), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JS compressed !");
            }
        }); 
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


/* Minify CSS */

function minifiedCSS(dataRead) {

    cssData += dataRead;
    ++cssLoad;

    if (cssLoad == cssFilesToMinimized.length) {

        var minifiedCSS = new cleanCSS().minify(cssData.replace("../../", ""));

        fs.writeFile(cssOutput, minifiedCSS, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("CSS compressed !");
            }
        }); 
    }
};

for	(var i = 0; i < cssFilesToMinimized.length; ++i) {

    fs.readFile(cssFilesToMinimized[i], 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        /// If there is no error
        minifiedCSS(data);
    });
};

/* ********* */
/* Node JS script to deploy the web site ( minify HTML, JS and CSS / replacing libs to cdn / crunsh images ) */

/* configuration */

var jsFilesToMinimized = ["i18n/i18n.js", "js/main.js"];
var jsOutput = "min.js";
var jsCDN = ["//code.jquery.com/jquery-1.11.0.min.js", "//cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/1.4.11/jquery.scrollTo.min.js", "//cdnjs.cloudflare.com/ajax/libs/jquery-one-page-nav/3.0.0/jquery.nav.min.js", "//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js", "//cdn.jsdelivr.net/jquery.magnific-popup/0.9.9/jquery.magnific-popup.min.js"];

var cssFilesToMinimized = ["css/font-face.css", "css/style.css"];
var cssOutput = "min.css";
var cssCDN = ["//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css", "//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css", "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css", "//cdn.jsdelivr.net/jquery.magnific-popup/0.9.9/magnific-popup.css"];

var htmlToMinimized = "index.html";
var htmlOutput = "index.html";

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

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

/* *************** */


/* Minify JS */

function minifyJS(dataRead) {
    jsData += dataRead;
    ++jsLoad;

    if (jsLoad == jsFilesToMinimized.length) {

        var ast = jsp.parse(replaceAll(jsData,"\\.\\./dev", "./dev"));
        ast = pro.ast_mangle(ast); 
        ast = pro.ast_squeeze(ast);

        fs.writeFile("../" + jsOutput, pro.gen_code(ast), function(err) {
            if(err) {
                console.log(err);
            }

            else {
                console.log("JS compressed !");
            }
        }); 
    }
};

function insertJsScript(htmlData) {
    var index = htmlData.indexOf("</body>");
    var scriptForInsertion = "";    

    for(var i = 0 ; i < jsCDN.length; ++i) {
        scriptForInsertion += "<script src=\"" + jsCDN[i] + "\"></script>";
    }

    scriptForInsertion += "<script src=\"" + jsOutput + "\"></script>";

    return htmlData.slice(0, index) + scriptForInsertion + htmlData.slice(index);
}

for	(var i = 0; i < jsFilesToMinimized.length; ++i) {
    fs.readFile(jsFilesToMinimized[i], 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        ///If there is no error
        minifyJS(data);
    });
};

/* ********* */


/* Minify CSS */

function minifyCSS(dataRead) {
    cssData += dataRead;
    ++cssLoad;

    if (cssLoad == cssFilesToMinimized.length) {

        var minifiedCSS = new cleanCSS().minify(replaceAll(cssData, "\\.\\./\\.\\./", ""));

        fs.writeFile("../" + cssOutput, minifiedCSS, function(err) {
            if(err) {
                console.log(err);
            }

            else {
                console.log("CSS compressed !");
            }
        }); 
    }
};

function insertCssScript(htmlData) {
    var index = htmlData.indexOf("</head>");
    var scriptForInsertion = "";    

    for(var i = 0 ; i < cssCDN.length; ++i) {
        scriptForInsertion += "<link href=\"" + cssCDN[i] + "\" rel=\"stylesheet\" type=\"text/css\">";
    }

    scriptForInsertion += "<link href=\"" + cssOutput + "\" rel=\"stylesheet\" type=\"text/css\">";

    return htmlData.slice(0, index) + scriptForInsertion + htmlData.slice(index);
}

for	(var i = 0; i < cssFilesToMinimized.length; ++i) {
    fs.readFile(cssFilesToMinimized[i], 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        ///If there is no error
        minifyCSS(data);
    });
};

/* ********* */


/* Minify HTML */

function minifyHTML(htmlData) {
    /// Removing all script and css tag
    htmlData = replaceAll(htmlData, "(<script.*></script>)|(<link.*text/css.*>)", "");
    htmlData = replaceAll(htmlData, "\\.\\./images", "images");

    htmlData = insertCssScript(insertJsScript(htmlData));

    var result = htmlMinifier.minify(htmlData, { 
        removeComments: true,                               
        collapseBooleanAttributes: true, 
        collapseWhitespace: true, 
        removeAttributeQuotes: true, 
        removeEmptyAttributes: true;
    });

    fs.writeFile("../" + htmlOutput, result, function(err) {
        if(err) {
            console.log(err);
        }

        else {
            console.log("HTML compressed !");
        }
    }); 
};

fs.readFile(htmlToMinimized, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    ///If there is no error
    minifyHTML(data);
});


/* ********* */
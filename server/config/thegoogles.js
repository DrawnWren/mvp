var google = require('googleapis');
var creds = require('./creds.js');
var language = google.language('v1beta1');
var gCloud = require('google-cloud');
var translate = gCloud.translate({key: creds.key});
//returns a promise that will (hopefully) be fulfilled by the Google API
function readText (text) {
    return new Promise( function(fulfill, reject) {
        console.log('About to make a document.');
        var doc = { 
            type: 'PLAIN_TEXT', content: text};

        var googReq = {
                        document: doc, 
                        encodingType: 'UTF16', 
                        features: {
                            extractEntities: true, 
                            extractDocumentSentiment: false,
                            extractSyntax: false
                        }
        };

        language.documents.annotateText({
            auth: creds.key,
            resource: googReq
            }, 
            function (err, d) {
                if (err) {
                    console.log('ERROR FROM GOOGLE, ' , err);
                    reject(err);
                } else {
                    fulfill(d);
                }
            });
    });
}

function translateTexts (texts) {
    return new Promise( function(fulfill, reject) {
        console.log('Trying to translate ', texts);
        translate.translate(texts, 'en', function (err, tra){
            if (err) reject(err)
            else {
                console.log('Got translations : ', tra);
                fulfill(tra);
            }
        });
    });
}


module.exports = {readText: readText, translateTexts: translateTexts};

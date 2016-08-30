var google = require('googleapis');
var creds = require('./creds.js');
var language = google.language('v1beta1');

//returns a promise that will (hopefully) be fulfilled by the Google API
function readText (text) {
    return new Promise( function(fulfill, reject) {
        console.log('About to make a document.');
        var doc = {language: 'EN', 
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

module.exports = {readText: readText};

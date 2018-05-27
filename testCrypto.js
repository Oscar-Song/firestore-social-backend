/*
* Asymmetric encryption proof of concept
* @author: Oscar Song
*/



var ursa = require('ursa');
var fs = require('fs');

// create a pair of keys (a private key contains both keys...)
var keys = ursa.generatePrivateKey();

// reconstitute the private key from a base64 encoding
var privPem = keys.toPrivatePem('base64');
var priv = ursa.createPrivateKey(privPem, '', 'base64');

// make a public key, to be used for encryption
var pubPem = keys.toPublicPem('base64');
var pub = ursa.createPublicKey(pubPem, 'base64');

// encrypt, with the public key, then decrypt with the private
var text = 'what is died may never die';
var data = new Buffer(text);

var enc = pub.encrypt(data);

var unenc = priv.decrypt(enc);

var decrypted = unenc.toString();
console.log("text:     ",text);
console.log("decrypted:",decrypted);

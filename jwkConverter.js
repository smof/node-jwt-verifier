//Tranforms JWK into PEM format
//Simon Moffatt 29/07/16

// Import libs
var jwkToPEM = require('jwk-to-pem'); //Converter lib
var fs = require('fs'); // To access file system to read in cert data
var colors = require('colors/safe'); // To print diff colours to console

console.log(colors.green("JWK Converter: ") + "starting");

// Globals --------------------------------------------------------------------------------------------------------------------------------

var pathToJWK = "jwk"; // Captured from jwk_uri. Eg {{OpenAM}}/openam/oauth2/connect/jwk_uri
var jwk;

// Globals ---------------------------------------------------------------------------------------------------------------------------------

function readJWK(){
	
	// Read in external file that contains JWK
	try {
		
		jwk = JSON.parse(fs.readFileSync(pathToJWK, 'utf8'));

	} catch (err){
		
		console.log(colors.red("JWK Converter: " + err));
		console.log(colors.green("JWK Converter: exiting"));
		process.exit(1);
	}	
}

readJWK();
console.log(colors.green("JWK Converter: ") +"converting");
pem = jwkToPEM(jwk);
console.log("");
console.log(pem);
console.log(colors.green("JWK Converter: ") +"exiting");

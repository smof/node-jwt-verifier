//Verifies a presented JWT and introspects
//Simon Moffatt 27/07/16
//Based on https://github.com/auth0/node-jsonwebtoken

// Import libs
var jwt = require('jsonwebtoken'); // 3rd party JWT verification library
var fs = require('fs'); // To access file system to read in cert data
var colors = require('colors/safe'); // To print diff colours to console

console.log(colors.green("JWT Verifier: ") + "starting");

// Globals --------------------------------------------------------------------------------------------------------------------------------

var pathToSignatureVerifier = "SignatureVerifier"; // Either shared secret of certificate
var pathToClaims = "claims"; //Place claims to be checked as a JSON object in here

var submittedJWT, header, payload, signature, signatureVerifier = "";

// Globals ---------------------------------------------------------------------------------------------------------------------------------

// Check for the correct number of submitted arguments
if (process.argv.length < 3){
		
	console.log(colors.red("JWT Verifier: ") + "Error! Argument missing.  Usage: node app.js JWT");
	console.log(colors.green("JWT Verifier: ") + "exiting");
	return;	

} else {
	
	//Capture submitted JWT
	submittedJWT = process.argv[2];
}


function readFiles(){
	
	// Read in external file that contains HMAC shared secret or cert
	try {
		
		signatureVerifier = fs.readFileSync(pathToSignatureVerifier,'utf8').trim();
		console.log(signatureVerifier);

	} catch (err){
		
		console.log(colors.red("JWT Verifier: " + err));
		console.log(colors.green("JWT Verifier: exiting"));
		process.exit(1);

	}
	
	
	// Read in external file that contains claims to be checked
	try {
		
		claims = JSON.parse(fs.readFileSync(pathToClaims).toString());
		
	} catch (err){
		
		console.log(colors.red("JWT Verifier: " + err));
		console.log(colors.green("JWT Verifier: exiting"));
		process.exit(1);

	}
	
}

//Checks the string format is expected
function readJWT(submittedJWT){
	
		console.log(colors.green("JWT Verifier: ") + "reading JWT");
				
		//Check submissions looks like a JWT...
		if(submittedJWT.split('.').length < 3){
			return console.log(colors.red("JWT Verifier: ") + "error reading JWT. Malformed string!");
		}
			
		header = submittedJWT.split('.')[0];
	    	payload = submittedJWT.split('.')[1];
	     	signature = submittedJWT.split('.')[2];
		console.log("");
     		console.log(colors.bold("Header: ") + header);
		console.log(colors.bold("Payload: ") + payload);
		console.log(colors.bold("Signature: ") + signature);
		console.log("");

		//Pass to verify
		verifyJWT(submittedJWT)
}


// Verify the tokenId against either the RSA or HMAC algo using the jsonwebtoken library
function verifyJWT(submittedJWT){

		console.log(colors.green("JWT Verifier: ") + "verifying JWT");
		
		//Go through verifier function
		try {
				
				console.log(signatureVerifier);
				var verifiedJWT = jwt.verify(submittedJWT, signatureVerifier);
				console.log(colors.green("JWT Verifier: ") + "signature verified true");
				//Pass to introspect
				checkClaims(verifiedJWT,claims);
				
		} catch(err) { //This is signature invalid
			
			return console.log(colors.red("JWT Verifier: " + err));
			
		}

}

//Introspects token checking attribute values
function checkClaims(payload,claims){
	
		console.log(colors.green("JWT Verifier: ") + "checking claims");
		console.log(colors.green("JWT Verifier: ") + "introspect payload \n");
		console.log(JSON.stringify(payload, null, 4));
		console.log("");
		console.log(colors.green("JWT Verifier: ") +"comparing to claims \n");
		console.log(JSON.stringify(claims,null,4));
		console.log("");
		
		//Iterate over presented claims, check they exist and then check value is as expected
		for(var claimKey in claims){
			  
			  //Payload does has claim attribute
			  if(payload.hasOwnProperty(claimKey)){
			        
				  console.log(colors.green("JWT Verifier: ") + colors.bold(claimKey) + " attribute found in payload" );
				  
				  //Check to make sure claim value matches expected claim value
				  if(claims[claimKey] == payload[claimKey]){
					  
					  console.log(colors.green("JWT Verifier: ") + colors.bold(claimKey) + " value " + colors.bold(claims[claimKey]) + " found in payload" );
					  
				  //Claim attribute values different	  
				  } else {
					  
					  console.log(colors.red("JWT Verifier: ") + colors.bold(claimKey) + " value in payload " + colors.bold(payload[claimKey]) + " should be " + colors.bold(claims[claimKey]));
					  
				  }
				  
			  //Payload has missing claim attribute
			  } else {
				  
				  console.log(colors.red("JWT Verifier: ") + colors.bold(claimKey) + " attribute not found in payload" );
				  
			  }	  
		}
}


// Run through
readFiles();
readJWT(submittedJWT)
console.log(colors.green("JWT Verifier: ") + "exiting");



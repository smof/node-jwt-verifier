<b>Node JWT Verifier</b>
</br>
</br>
A basic JSON Web Token (JWT) verifier, decoder and JWT checker for the command line, based on the jsonwebtoken library.
<br/>
<br/>
<b>Installation</b>
<br/>
<br/>
This app is written in node.js, so node.js will need to be download and configured for your operating system. Once installed, clone 
the node-jwt-verifier project locally. Run "node install" from within this project directory to install dependencies
 from the package.json file.
<br/>
<br/>
<b>Usage</b>
<br/>
<br/>
Edit the necessary HMACSharedSecret or RSAPublicKey files for signature verification.  Add any claims to be checked in the claims file as a JSON object.
<br/>
To run enter <b>node app.js JWT</b> where JWT is the dot-delimited base64 encoded JWT token.
<br/>
<br/>
<br/>
Based on https://github.com/auth0/node-jsonwebtoken
<br/>
Use as-is no warranty.

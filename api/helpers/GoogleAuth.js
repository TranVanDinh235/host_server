const config = require ('./Config').config;
const { OAuth2Client } = require( 'google-auth-library');

const GOOGLE_CLIENT_ID = config.web.client_id;
let client = new OAuth2Client( GOOGLE_CLIENT_ID, '', '' );

module.exports.getGoogleUser = ( code ) => {
    return client.verifyIdToken( { idToken: code, audience: GOOGLE_CLIENT_ID } )
        .then( login => {
            //if verification is ok, google returns a jwt
            const payload = login.getPayload();
            const userid = payload['sub'];

            //check if the jwt is issued for our client
            const audience = payload.aud;
            if ( audience !== GOOGLE_CLIENT_ID ) {
                throw new Error( "error while authenticating google user: audience mismatch: wanted [" + GOOGLE_CLIENT_ID + "] but was [" + audience + "]" )
            }
            //promise the creation of a user
            return {
                name: payload['name'], //profile name
                pic: payload['picture'], //profile pic
                id: payload['sub'], //google id
                email_verified: payload['email_verified'],
                email: payload['email']
            }
        } )
        .then( user => { return user; } )
        .catch( err => {
            throw new Error( "error while authenticating google user: " + JSON.stringify( err ) );
        } )
};
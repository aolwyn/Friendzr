// NOTE(Noah): The code gets run exactly one time when you import
// a javscript module.
// see -> https://stackoverflow.com/questions/37325667/does-es6-module-importing-execute-the-code-inside-the-imported-file#:~:text=Yes%2C%20it%20does%2C%20exactly%20one%20time.

/* NOTE(Noah):
As I continue to read the documentation, it is seeming more and more apparent that
the there are two patterns when using Firebase.
    - One is like, directly from the client.
    - And the other is directly from the backend via the Firebase Admin SDK.

And the issue right now is that we are using the client API in the bakend
    -> and that is why I am seeing this stuff about "getting the current user".

So we must switch to the Admin SDK. Then generate JWT tokens to be used as Cookies by
the frontend.

NOTE(Noah):
Okay so we have more things to discuss about. Basically, here's what I am thinking. 
We might be able to store user passwords...
- We simply have a secret key. 
- The user gives us their email. We then have a mapping of email and uid.
- and we store an encrypted password with the uid and secret key.
    - decrypt and compare.

I think this actually makes more sense than we might think,
- We are trying to write our own backend. So not using Firebase actually 
makes sense.

Here is the other option: https://medium.com/@_josueperalta/using-firebase-auth-with-a-custom-node-js-server-part-1-53bdb622c89a
We do ALL AUTH in Firebase.
- The only thing the backend actually does is to verify the state of authentication. 
- AND, this can be done in via the Firebase ADMIN SDK.
    - Then we add this as like, middleware or something like this.
*/

// TODO(Noah): Email-verfication when creating an account.
// https://firebase.google.com/docs/auth/admin/email-action-links

// -------------- INITIALIZE THE FIREBASE ADMIN SDK ------------
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
// TODO(Noah): Ensure that this serviceAccountKey file is only used to build the node.js server.
// It should never be the case that this file is actually on the Google Cloud VM.
//     And if it IS on the VM, it should never be something that is accessible via 
//     whatever URI corresponds to the file.
import {serviceAccount} from "./serviceAccountKey.js";

initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// -------------- INITIALIZE THE FIREBASE ADMIN SDK ------------

// Cookie is a JWT managed by the Firebase service, 
// and given as a cookie from the client.
// function return true on success, false on failure.
export async function VerifyUser(cookie) {
    getAuth()
    .verifyIdToken(cookie)
    .then((decodedToken) => {
        // const uid = decodedToken.uid;
        // ...
        return true;
    })
    .catch((error) => {
        // TODO(Noah): Maybe there is something more intelligent we can do here.
        return false;
    });
}


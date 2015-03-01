# Drupal-Ionic-AngularJS-API-Client
This repo is all about making clientside authed rest-calls easy to use.



 Any calls that use POST, PUT, or DELETE must now have a header key/value pair with "X-CSRF-Token" being the key, and the token retrieved from /services/session/token as the value to send along with the header key.

[https://www.drupal.org/node/2012982]https://www.drupal.org/node/2012982
 Description
This module enables you to expose an API to third party systems using REST, XML-RPC or other protocols.

The module doesn't sufficiently verify writing requests (POST, PUT, DELETE) with session cookie authentication, thereby exposing a Cross Site Request Forgery vulnerability.

This vulnerability is mitigated by the fact that session based authentication must be enabled for an endpoint.

Homepage is tour
If firsVisit is true then homepage is register
If HasLoggedIn is true then homepage is login
If user is authed homepage is porfile

Tokens
After register if successful we log the user in automatically. 
Tokens and cookies only apply to logging in or system connect requests.

Cookies
On login we save a cookie with the name of the session_name returned in the logged in user data. 

Therefore the cookie saved is $cookie[session_name] = session_id 

This cookie is used to validate the session on drupal when doing a authenticated request
Angularjs *does not* automatically save cookies and use them when doing requests
Therefore on login we need to save the cookie and use it when doing requests.
*Chrome does this automatically, it’s for Safari and Firefox and for iPhones

Tokens
Drupal requires us to send a header with the token. I’m not 100% sure yet about whether we need a new token each time.


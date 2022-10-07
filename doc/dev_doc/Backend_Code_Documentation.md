# Backend Code Flow Documentation
## Login: 
The user will enter their UofT email and password, then press the login button. Then Frontend will send the email and password to the API as a request and wait for a response. If the request is good, then it will sign the user in.

### Login Flow:
#### Send a post request to http://localhost:8000/api/auth, requires headers



#### Returns JWT for authorization



#### Use JWT and send a get request to http://localhost:8000/api/auth, which returns a User object


## Register: 
The user enters his/her UTOrid username, email address, and password and then presses the signup button. The Frontend will send the sign-up info that the user has entered in the request body to ‘BACK_END_BASE_URL/api/users.

### Register Flow:
#### Send post request to http://localhost:8000/api/users
#### Requires headers


#### Returns JWT for authentication


## Delete User:
After you successfully log in, you go to the profile page, and there’s a logout button and a delete account button. If you click the logout button, it will lead you back to the login page, but the account info is still stored in the database. While for the delete account button, it will navigate back to the login page after you click it, but the entire account is deleted, and you have to sign up again to log in. You may sign up with same credentials after deleting it.

### Delete Flow:
#### Send delete request to http://localhost:8000/api/users
#### No headers



#### Returns response if deletion is successful

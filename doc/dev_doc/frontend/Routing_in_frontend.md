# Routing in Frontend (React with React Router)

To add a new route, open `index.js`, import the component you want to use for the page, and inside the `<Routes>` component, add 
```
<Route path=ROUTE_PATH exact element={ ROUTE_PAGE }/>
```
where `ROUTE_PATH` is a string specifying the path (ex: `"/"`, `"/login"`) and `ROUTE_PAGE` is the component to use for that page (ex: `<Signup />`).

## Login Flow:
The user will enter their UofT email and the password, then press the login button in Login.jsx. Then Login.jsx will send the email and password to the API and wait for a response. If the response is good, then it will sign the user in. Otherwise an error is sent to the console and displayed on the page.

## Register Flow:
The user enters his/her UTOrid username, email address, and password and then presses the signup button.
- Send the sign-up info that the user has entered in the request body to ‘BACK_END_BASE_URL/api/users.

## Profile Page:
After you successfully log in, you go to the profile page, and there’s a log-out button and a deleted account button. If you click the log out button, it will lead you back to the login page, but the account information is still stored in the database. While for the delete account button, it will navigate back to the login page after you click it, the entire account is deleted, which means if you log in with the same account, the authentication will fail and you have to sign up again to create a new account.

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

## Event Flow:
The user can go to the event page by clicking on the event button in the navigation bar after log in to see all the events posted. If you click on the "post event" button, you will go to the post event page where you can post an event by entering the event title and description. You can also upload pictures when creating the event.  Once you click submit, you will go back to the event page and see your post there. If you click on an event, you will go to the event detail page where you can see the event title, description and photos. There is also a join event button, if you click on it, you will be added to that event. You can see all you joined event and posted event in your profile page.

## Market Flow:
The user can go to the market page by clicking on the market button in the navigation bar after log in to see all the items posted. If you click on the "post item" button, you will go to the post item page where you can post an item by entering the event title, description and price you want to sell it for. You can also upload pictures when creating the item post. Once you click submit, you will go back to the market page and see your posted item there. If you click on an item, you will go to the item detail page where you can see the item title, description, price and photos.

## Item Purchasing Flow:
The user can click on bookmarked items in their "My Items" page or items listed in the Market to open a page giving details on the item. Here they can add the item to cart, and will be brought to their Cart page. When they click "Place Order", the seller gets an email saying someone wishes to buy their item. The item is moved from their cart, to the list of items they bought, in their "My Items" page.

## Messaging Flow:
The user can click on the "Message" link on the navbar, leading them to the messaging interface. They can send chat messages in the channel, and other users will see the message and can reply to it. The user can also create a new channel allowing other users to join the chat room.

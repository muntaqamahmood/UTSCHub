# Backend Code Flow Documentation
## Login: 
The user will enter their UofT email and password, then press the login button. Then Frontend will send the email and password to the API as a request and wait for a response. If the request is good, then it will sign the user in.

### Login Flow:
#### Send a post request to http://localhost:8000/api/auth, requires headers
![Screenshot 2022-10-07 185544](https://user-images.githubusercontent.com/69706702/194673964-259292ff-d3c4-48a8-ae84-84d3753ee81b.png)



#### Returns JWT for authorization
![image](https://user-images.githubusercontent.com/69706702/194673951-ea0a9e3e-c951-41a9-aca7-db74a2584213.png)



#### Use JWT and send a get request to http://localhost:8000/api/auth, which returns a User object
![image](https://user-images.githubusercontent.com/69706702/194674020-cd9d394a-bff3-4da5-b910-1767ec30b72c.png)


## Register: 
The user enters his/her UTOrid username, email address, and password and then presses the signup button. The Frontend will send the sign-up info that the user has entered in the request body to ‘BACK_END_BASE_URL/api/users.

### Register Flow:
#### Send post request to http://localhost:8000/api/users
#### Requires headers
![image](https://user-images.githubusercontent.com/69706702/194674055-547d2c5e-ae57-447c-b22f-d1fae6757eaf.png)


#### Returns JWT for authentication
![image](https://user-images.githubusercontent.com/69706702/194674087-373d84a7-6788-404a-b001-a539537028a8.png)


## Delete User:
After you successfully log in, you go to the profile page, and there’s a logout button and a delete account button. If you click the logout button, it will lead you back to the login page, but the account info is still stored in the database. While for the delete account button, it will navigate back to the login page after you click it, but the entire account is deleted, and you have to sign up again to log in. You may sign up with same credentials after deleting it.

### Delete Flow:
#### Send delete request to http://localhost:8000/api/users
#### No headers, returns response if deletion is successful
![image](https://user-images.githubusercontent.com/69706702/194674125-d7c97d0d-bdd1-422f-b693-0dcbd3f336b4.png)

## Events:
After you successfully log in, you go to the profile page, from there you can go to your events that you have posted or you can go to the Events Page from Navbar on the side. In the Events Page, you can post an event, click on a currently posted Event to check the details of that event and join the event.

### Events Routing:
#### GET Request for events sent to http://localhost:8000/api/events
![image](https://user-images.githubusercontent.com/69706702/197316032-e5e4b2a1-e455-46d7-a6a3-28535d365171.png)

#### POST Request for events sent to http://localhost:8000/api/postevent/uploadEvent
#### Auth Token is required as a header so that the request can stay Private to a user
![image](https://user-images.githubusercontent.com/69706702/197316138-a53159de-8efa-4f2c-a1c8-14c2512acc0d.png)

#### DELETE Request for events sent to http://localhost:8000/api/events/:id
#### id of the Event is required to delete the right event
![image](https://user-images.githubusercontent.com/69706702/197316080-b1a705ee-cbd5-43f5-8b9f-ac379f5de4e9.png)

#### GET Request, get all items a user has bookmarked http://localhost:8000/api/postitems/array
<img width="671" alt="image" src="https://user-images.githubusercontent.com/51491033/200084027-554bc857-de1f-4041-b9e3-1147b7f8146c.png">

#### PUT Request, adding/removing a bookmark
<img width="601" alt="image" src="https://user-images.githubusercontent.com/51491033/200084200-e9fc930c-8a9b-4ac5-8cb7-13fb7d943da8.png">

#### PUT Request, adding event
<img width="520" alt="image" src="https://user-images.githubusercontent.com/51491033/200084289-1f77a92b-58c9-43a6-a468-26924a39f1bd.png">





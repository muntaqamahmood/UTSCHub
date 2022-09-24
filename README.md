UTSC Hub is an application that targets all UTSC students and faculty members to distribute further convenience within the community and explore the embedded demands and supplies by offering a UTSC specific eCommerce platform. Besides that, our website also aims to accomplish more sophisticated community engagement with our distinctive SMS and event planning features. 


 ## Development



 ### Requirements

 - NodeJS (16.17.0 LTS)
 
 Optional
 - Postman (for manual testing of backend API)

 ### Setup

 Clone the project with Git.

 If developing for the server, run `npm install` in the `server` directory. 

 If developing for the client, run `yarn` in the `client` directory.


 ### Running web client server locally

 Switch to the `client` directory. Run `yarn start` to start the web client server. The local server can be connected to by visiting `localhost:3000` in your browser.

 ### Running backend API server locally

 Switch to the `server` directory. Run `npm run server` to start the backend API server. Requests to the backend server are sent to `http://localhost:8000`. Ex: `http://localhost:8000/api/items`

 How it should look like after running `npm run server`:

 ![image](https://user-images.githubusercontent.com/69706702/192059643-aab9938c-783b-497e-b19f-4291653a4cec.png)



## Contribution

To get setup, see the Development section above.

Once you get a ticket to work on, checkout the develop branch then make a new branch with the start of the name being the ticket ID. Ex: Ticket ID is `PROJ-123`, branch name can be `PROJ-123-add-feature`.

Once you are done with your changes, push your changes to a new remote branch with the same name as your local branch, then open a PR. The PR title should give a high-level description of what the PR does, and the description should have details on the approach and implementation. Add 2 people to review the PR. After changes are made and approved, the PR can be merged by one of the reviewers.

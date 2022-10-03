# Routing in Frontend (React with React Router)

To add a new route, open `index.js`, import the component you want to use for the page, and inside the `<Routes>` component, add 
```
<Route path=ROUTE_PATH exact element={ ROUTE_PAGE }/>
```
where `ROUTE_PATH` is a string specifying the path (ex: `"/"`, `"/login"`) and `ROUTE_PAGE` is the component to use for that page (ex: `<Signup />`).

Store and optimize image and video -> Imagekit.io
1. For multiple page and navigate across them , we use react-router-dom
2. Created folder structure and NAVbar.jsx.
3. Wrote code in navbar.jsx for for the navbar
5. Created the Nav bar logic to hide it in ownere page 
6. create all the pages inside pages folder.
 - Cars.jsx
 - CarDetails.jsx
 - MyBookings.jsx
 - Home.jsx

7. Now add Paths in app.jsx for the following created above
8. Now we will prepare Home Page and for that we need -
  - Hero component, FeaturedSelection,Banner.jsx , UserReview part newsletter part and all

9.  we have created CarCard then used it in the FeaturedSection part , where we map it , and as Title is used many where like we will use it lots of time so created a separete title over there
10. now the featuedSelection we mounted on the Home section we got the cars deisplayed ther e,
 - Now we add the navigate / click function - whenever we click on the car it will redirect us to the carDetials

11. Now we Created the 3rd part of the Home page - Banner.jsx

- Using Prebuilt AI :-

12. Now for the 4th part we are building the user review -> Testimonial part and all
13. Now it comes to 5th part -> Newsletter part
16. Now for the 6th and last part we add -> Footer.jsx in the app.jsx .
17. Then we Created the CarDeatils.jsx part.
18. Then we Created the Cars.jsx part were all the cars are listed.
19. Then we Created the MyBookings.jsx part.
20. Then Moving on to the Dashboard :-
    - We Created the /pages/Owner
       - And 5 files
       - AddCar, Dashboard, Layout, ManageBookings, ManageCar
    - Then we Created the /Components/Owner
       - We Created 3 files over there
       - NavbarOwner, OTitle, Sidebar
21. Then we Wrote the code for all the mini pages created above , and the Completed the whole Owner section in the pages
 After Creating small owner Navbar sidebar all in the components/owner part.
22. Then we Created the Login from the prebuilt.ui 
23. Now Moving to the Server -> Backend part 
         - Remaining code in the Server folder .

### ----------------------------------------  BACKEND STARTS -----------------------------------------

24. Now after creating the Server entirely , its time to Connet Frontend and backend
   -  For that we Create a context Folder :-
      - We store all the global variables so that we can access them all in multiple files
25. We create appcontext.js and added that to main.js to use it in the entire app
26. Now we downloaded Axios -> we have to make the api call , and we willdo it in different component , so we will do that using axios, 
and we will define the baseurl in the appcontext , so that we dont have to define it again and agian
  - and react-hot-toast for notification

###    ------------------- IMPORTANT FOR NOTIFICATIONS --------------------------
  -- But Before using toast we add it to the App.jsx , we import toaster to there and add it to that return , after the fragment , we call it there.
###    ------------------- IMPORTANT FOR NOTIFICATIONS --------------------------

27. Then we created the whole :-
   
   1.  { navigate,currency,axios,
        token,setToken,
        user,setUser,fetchUser,
        isOwner,setIsOwner,
        showLogin,setShowLogin,
        pickupDate,setPickupDate,returnDate,setReturnDate,
        cars,setCars,fetchCars,logout
     }
     - Whole part in the Appcontext and , then we changed the login and logout button functionality in Navbar ,
       - We used the ternary operator there to logout if it is useer and show login if user is not login , 
       we removed the setShowLogin part from the children prop and created a state varible.
       - We added that login to the login button below 
   2. Then we made changes to the dashboard button , and add ternary operator to that too ,
   We created a ChangeRole function over there .

### ---------------------- We had some problem with useEffect hook , so we created a separate folder and wrote the logic of the useEffect over there -----------------------------------------

28. We added a missinng getUserCars in the backend that we forgot in the userController , and add the routes in userRoutes
29. Then we added the Login from logic and that click outside anywhere to close the form that one to :-
   -  For that we changed the setShowlogin component in apps , and Login.jsx and all
30. Now we updated the navbar -> dummy data to useAppContext ,
    - We updated the sidebar dummydata , and updated the save image function it was not working 
    - Then we updated the Pages/owner/Layout.jsx
    - Now Dashboard
31. Then we added some error handleing and fixed them  in and Then we are adding Some Motions to it .
    - npm i motion
32. then we imported motiononfig in main.jsx and wrapped our app component inside it 
    - now we are working on Navbar
    - For Home.jsx
      - We added motion tag to the first div after the return , and to the Logoo in navbar
      - Then we added animation to Hero.jsx , where we added animation to the form tag , to the search button , to the car image
      - We added motion to the Featured Section
      - Now we add Motion to Banner.jsx
      - Now to the Testinomial.jsx
      - Now to the Newsletter.jsx
      - Now at the Footer
   
   - Cars.jsx 
   -CarDetailos.jsx
   - MyBookings.jsx

   



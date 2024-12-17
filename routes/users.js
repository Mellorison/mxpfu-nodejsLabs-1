const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
    {
      "firstName": "Jon",
      "lastName": "Lovato",
      "email": "jonlovato@theworld.com",
      "DOB": "10/10/1995"
   }
   
    
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users)
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Extract the email parameter from the request URL
  const email = req.params.email;
  //Filter the users array to find users whose email matches the extracted email paramenter
  let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users);  // Also updated to return the filtered users
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  });
  res.send("The user" + req.query.firstName + " has been added successfully");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract the email parameter and find the user with the matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {

    let filtered_user = filtered_users[0];

    //Extract and update DOB if provided
    let DOB = req.query.DOB;
    if(DOB){
      filtered_user.DOB = DOB;
    }

    //Extract and update firstName if provided
    let firstName = req.query.firstName;
    if(firstName){
      filtered_user.firstName = firstName;
    }

    //Extract and update lastName if provided
    let lastName = req.query.lastName;
    if(lastName){
      filtered_user.lastName = lastName;
    }

    //Replace old user entry with updated user entry
    users = users.filter((user) => user.email !== email);
    users.push(filtered_user);

    //Send a success message indicating the update
    res.send(`User with email  ${email} updated. `);
  }
    else {
      res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email !== email);
  //Send a success message indicating the deletion
  res.send(`User with email ${email} deleted.`);
});

module.exports=router;

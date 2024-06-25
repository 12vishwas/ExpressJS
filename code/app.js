const express = require('express')
const fs = require('fs')

const users = require("./MOCK_DATA.json");
const { urlencoded } = require('body-parser');


const app = express()
const PORT = 3000;

//using middleware
app.use(express.urlencoded({extended:false}))

//routes

app.get("/api/users", (req,res) => {
  return res.json(users)
})

app
  .route("/api/users/:email")
  .get( (req,res) => {
  const email = req.params.email;
  const user = users.find((user) => user.email === email)
  return res.json(user)
})

  .put((req,res) =>{
    const email = req.params.email;
    const user = users.find((user) => user.email === email)

    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.gender = req.body.gender || user.gender;
      user.age = req.body.age || user.age;
    }

    return res.json({status:user})
  })

  .delete((req,res) => {
    const email = req.params.email;
    const userIndex = users.findIndex((user) => user.email === email)
    if(userIndex !== -1){
      users.splice(userIndex,1)
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      return res.json({ status : "successfully deleted"})
      })
    }
    else{
      return res.json({status:"User not found" })
    }
  })

app.post("/api/users", (req,res) => {
  const body = req.body;
  users.push(body);
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({status:"successs"})
  })
})

app.listen(PORT, () => console.log('server is running at PORT:' + PORT))
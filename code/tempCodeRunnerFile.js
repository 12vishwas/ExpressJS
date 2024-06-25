.delete((req,res) => {
    const email = req.params.email;
    const user = users.find((user) => user.email === email)
    return res.json(user)
  })
const express = require("express")
const app = express()
const PORT = 8080

app.get("/",(res,req) => {
    req.send("Server is up")    
})



app.listen(PORT,() => console.log(`Server Running on port ${PORT}`))
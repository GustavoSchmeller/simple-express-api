
const express = require("express")
const app = express()
const port = 8080
const usersRoutes = require("./routes/users")

app.use(express.json())
app.use(usersRoutes)

app.listen(port, ()=>{
    console.log(`Servidor ativo na porta ${port}`)
})
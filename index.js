import express from "express"
import session from "express-session"
import sessionConfig from "./config/session.js"
import { login,logout } from "./controllers/authController.js"
import { adicionarPessoa,listarPessoas,listarUnicaPessoa,excluirPessoa,alterarPessoa } from "./controllers/pessoaController.js"
import validarAutenticacao from "./middlewares/validarAutenticacao.js"
import autenticar from "./middlewares/autenticar.js"
import validarCampos from "./middlewares/validarCampos.js"
import validarPessoa from "./middlewares/validarPessoa.js"

const app = express()
const port = 8080

app.use(express.json())

app.use(session(sessionConfig))

app.post("/login", validarAutenticacao, login)
app.get("/logout", autenticar, logout)

app.post("/pessoa", autenticar, validarCampos, adicionarPessoa)
app.get("/pessoa", autenticar, listarPessoas)

app.get("/pessoa/:id", autenticar, validarPessoa, listarUnicaPessoa)
app.delete("/pessoa/:id", autenticar, validarPessoa, excluirPessoa)
app.put("/pessoa/:id", autenticar, validarPessoa, alterarPessoa)

app.use( (req,res,next) => {
    res.status( 404 ).send( "Página não encontrada!" )
  })

app.listen(port, ()=>{console.log(`Servidor rodando na porta ${port}`)})


const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const express = require("express")
const router = express()
const db = require('../database/database')

let usuarios = [] // TESTES
let contador = 0 // TESTES

router.use(express.json())

const SECRET = "SECR33"

// MIDDLEWARES

function validarUsuario(req,res,next){
    const {name, password} = req.body
    if (!name || !password) return res.status(404).json({error: "Requisição JSON incompleta."})
    next()
}


// GET USER

router.get("/users",(req,res)=>{
    //return res.status(200).json({message: "Usuários cadastrados: ", usuarios})
    db.all("SELECT id, name, password FROM usuarios", (err, rows)=>{
        if (err) {
            return res.status(500).json({Erro: "erro ao listar usuários"})
        }
        return res.status(200).json({Usuarios: rows})
    })
})

// POST USER

router.post("/users",validarUsuario, async(req,res)=>{
    const {name, password} = req.body
    contador++
    const hashedPassword = await bcrypt.hash(password, 10)
    
    db.run('INSERT INTO usuarios (name, password) VALUES (?,?)', [name, hashedPassword], (err)=>{
        if (err) {
            return res.status(500).json({Erro: "Erro ao salvar usuário"})
        }
        return res.status(201).json({message: "Usuário criado!",})
    })

//    const usuario = {
//        id: contador,
//        name: name,
//        password: hashedPassword
//    }
//  usuarios.push(usuario)
})

router.post("/login", validarUsuario, async (req, res)=>{
    const {name, password} = req.body
    const usuario = usuarios.find(u => u.name === name)
    if (!usuario) return res.status(404).json({error: "Usuário informado não existe."}) 
    
    const senhaValida = await bcrypt.compare(password, usuario.password)

    if (!senhaValida) return res.status(401).json({message: "Senha inválida."})

    const token = jwt.sign({id: usuario.id, name: usuario.name}, SECRET, {expiresIn: "1h"})

    console.log(token)

    return res.status(200).json({message: "Login efetuado com sucesso!"})
})

// PUT USER


router.put("/users/:id",validarUsuario, (req,res)=>{
    const id = Number(req.params.id)
    const {name, password} = req.body
    const usuario = usuarios.find(u => u.id === id)
    if (!usuario) return res.status(404).json({error: "Usuário inexistente."})


    usuario.name = name
    usuario.password = password
    return res.status(200).json({message: "Usuário alterado!", usuarios})
})

// DELETE USER

router.delete("/users/:id",(req,res)=>{
    const id = Number(req.params.id)
    const index = usuarios.findIndex(u => u.id === id)

    if (index === -1) return res.status(404).json({error: "Usuário não encontrado."})

    usuarios.splice(index, 1)

    return res.status(200).json({message: "Usuário removido com sucesso!", usuarios})
})

module.exports = router
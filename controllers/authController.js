import bcrypt from "bcrypt";
import supabase from "../config/supabase.js"

export async function login(req,res){
    const { nome,senha } = req.body

    const { data,error } = await supabase
    .from('pessoa')
    .select('*')
    .eq('nome', nome)
    .single()

    if (error || !data) return res.status(500).json({
        message: "Usuário não existe"
    })

    const verificarSenha = await bcrypt.compare(senha, data.senha)

    if (!verificarSenha) return res.status(500).json({
        message: "Senha inválida!"
    }) 
   
    req.session.data = {
        id: data.id,
        nome: data.nome
    }
    return res.status(500).json({message: "Login bem-sucedido!"})
}

export async function logout(req,res){
    req.session.destroy(err=>{
        if(err) return res.status(500).json({
            message: "Erro ao encerrar a sessão."
        })
    })

    res.clearCookie("connect.sid")
    return res.status(200).json({
        message: "A sessão foi encerrada com sucesso!"
    })
}
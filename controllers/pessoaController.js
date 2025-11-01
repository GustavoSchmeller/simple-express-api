import bcrypt from "bcrypt";
import supabase from "../config/supabase.js"

export async function adicionarPessoa(req,res){
    try{

        const { nome,idade,curso,senha } = req.body

        const senhaCriptografa = await bcrypt.hash(senha, 10)

        const { error:postErro } = await supabase
        .from('pessoa')
        .insert({nome:nome,idade:idade,curso:curso,senha:senhaCriptografa})
        
        if (postErro) {
            return res.status(500).json({message: "Erro ao cadastrar usuário:", erro: postErro.message})
        } else {
            return res.status(200).json({message:"Usuário cadastrado com sucesso!"})
        }

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}

export async function listarPessoas(req,res){
    try{

        const { data:selectPessoas,error:selectErro } = await supabase
        .from('pessoa')
        .select()
        .order('id', {ascending: true})
    
        if (selectErro){
            return res.status(500).json({message: "Erro ao listar usuários.", erro: selectErro.message})
        } else if (!selectPessoas || selectPessoas.length === 0) {
            return res.status(500).json({message: "Não há usuários cadastrados no banco de dados"})
        } else {
            return res.status(200).json({message:selectPessoas});
        }

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}

export async function listarUnicaPessoa(req,res){ 
    try{

        const { id } = req.params 
        const { data,error } = await supabase
        .from('pessoa')
        .select()
        .eq('id',id)
    
        if (error){
            return res.status(500).json({message: "Erro ao listar usuários."})
        } else {
            return res.status(200).json({message:data})
        }

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}

export async function excluirPessoa(req,res){
    try{

        const { id } = req.params 
        const { data,error } = await supabase
        .from('pessoa')
        .delete()
        .eq('id', id)
        .select()
        return res.status(200).json({message:"Usuario excluido com sucesso!"})

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}

export async function alterarPessoa(req,res){
    try{

        const { id } = req.params
        const { nome,idade,curso,senha } = req.body
        const { data:selectUsuario,error:selectErro } = await supabase
        .from('pessoa')
        .select()
        .eq('id',id)
        
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        if (!selectUsuario || selectUsuario.length == 0) {
            return res.status(500).json({message: "Usuario inexistente."})
        }
        if (selectErro) {
            return res.status(500).json({message: "Houve um erro.", erro: selectErro.message})
        }
        
        const { data:updateUsuario,error:updateErro} = await supabase
        .from('pessoa')
        .update({nome:nome,idade:idade,curso:curso,senha:senhaCriptografada})
        .eq('id',id)

        if (updateErro){
            return res.status(500).json({message: "Ocorreu um erro ao atualizar: ", erro: updateErro.message})
        } else {
            return res.status(200).json({message:"Usuário atualizado com sucesso!"})
        }

    } catch(err) {
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}
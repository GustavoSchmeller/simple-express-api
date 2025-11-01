import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


async function validarPessoa (req,res,next){ 
    try{

        const { id } = req.params 
        const { data:selectUsuario,error:selectErro } = await supabase
        .from('pessoa')
        .select()
        .eq('id',id)

        if (!selectUsuario || selectUsuario.length === 0) {
            return res.status(500).json({message: "O usuário não existe"})
        }
        if (selectErro) {
            return res.status(500).json({message: "Houve um erro:", erro: selectErro.message})
        }
        next();

    } catch (err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }

}


function validarCampos(req,res,next){ 
    try{
        
        const { nome,idade,curso } = req.body;
        if (!nome || nome.length == 0){
            return res.status(500).json({message: "O nome deve estar preenchido"});
        }
        if (typeof idade !== "number" || idade < 18){
            return res.status(500).json({message: "A idade inserida não é valida"});
        }
        if (!curso || curso.length == 0){
            return res.status(500).json({message: "O curso deve estar preenchido"});
        }
        next();

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}


app.post("/pessoa", validarCampos,async (req,res)=>{
    try{

        const { nome,idade,curso } = req.body;
        const { error:postErro } = await supabase
        .from('pessoa')
        .insert({nome:nome,idade:idade,curso:curso})
        
        if (postErro) {
            return res.status(500).json({message: "Erro ao cadastrar usuário:", erro: postErro.message});
        } else {
            return res.status(200).json({message:"Usuário cadastrado com sucesso!"});
        }

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
});


app.get("/pessoa", async (req,res)=>{ // IFF PARA CASO NÃO HAJA USUARIOS CADASTRADOS
    try{

        const { data:selectPessoas,error:selectErro } = await supabase
        .from('pessoa')
        .select()
        .order('id', {ascending: true})
    
        if (selectErro){
            return res.status(500).json({message: "Erro ao listar usuários.", erro: selectErro.message});
        } else {
            return res.status(200).json({message:selectPessoas});
        }

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
});



app.get("/pessoa/:id",validarPessoa, async (req,res)=>{   // AJUSTAR POIS ESTÁ DANDO ERRO E ESTA PUXANDO OBJETOS SEM VALORES E POR O validarPessoa
    try{

        const { id } = req.params 
        const { data,error } = await supabase
        .from('pessoa')
        .select()
        .eq('id',id)
    
        if (error){
            return res.status(500).json({message: "Erro ao listar usuários."});
        } else {
            return res.status(200).json({message:data});
        }

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
})


app.delete("/pessoa/:id", validarPessoa, async (req,res)=>{
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
});

app.put("/pessoa/:id", validarPessoa, async (req,res)=>{
    try{

        const { id } = req.params;
        const { nome,idade,curso } = req.body;
        const { data:selectUsuario,error:selectErro } = await supabase
        .from('pessoa')
        .select()
        .eq('id',id)
        
        if (!selectUsuario || selectUsuario.length == 0) {
            return res.status(500).json({message: "Usuario inexistente."})
        }
        if (selectErro) {
            return res.status(500).json({message: "Houve um erro.", erro: selectErro.message})
        }
        
        const { data:updateUsuario,error:updateErro} = await supabase
        .from('pessoa')
        .update({nome:nome,idade:idade,curso:curso})
        .eq('id',id)

        if (updateErro){
            return res.status(500).json({message: "Ocorreu um erro ao atualizar: ", erro: updateErro.message})
        } else {
            return res.status(200).json({message:"Usuário atualizado com sucesso!"})
        }

    } catch(err) {
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
});

app.use( ( req, res, next ) => {
    res.status( 404 ).send( "Página não encontrada!" );
  });


app.listen(8080, ()=>{console.log("Servidor rodando")})
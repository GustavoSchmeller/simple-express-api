import supabase from "../config/supabase.js"

export default async function validarPessoa (req,res,next){ 
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
        next()

    } catch (err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}
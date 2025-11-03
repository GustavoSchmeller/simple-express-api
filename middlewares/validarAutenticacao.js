export default function validarAutenticacao(req,res,next){
    try{

        if (req.session.data){
            return res.status(200).json({
                message: "Você já está autenticado."
            })
        }
        next()

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}
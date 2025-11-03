export default function autenticar(req,res,next){
    try{

        if (!req.session.data) {
            return res.status(500).json({
                message: "Acesso negado. Você precisa estar logado!"
        })}
        next()

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}
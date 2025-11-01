export default function validarAutenticacao(req,res,next){
    if (req.session.data){
        return res.status(200).json({
            message: "Você já está autenticado."
        })
    }
    next()
}
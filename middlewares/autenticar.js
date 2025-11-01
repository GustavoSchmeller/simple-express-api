export default function autenticar(req,res,next){
    if (!req.session.data) {
        return res.status(500).json({
            message: "Acesso negado. Você precisa estar logado!"
    })}
    next()
}
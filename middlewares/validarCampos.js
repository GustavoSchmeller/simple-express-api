export default function validarCampos(req,res,next){ 
    try{
        
        const { nome,idade,curso } = req.body
        if (!nome || nome.length == 0){
            return res.status(500).json({message: "O nome deve estar preenchido"})
        }
        if (typeof idade !== "number" || idade < 18){
            return res.status(500).json({message: "A idade inserida não é valida"})
        }
        if (!curso || curso.length == 0){
            return res.status(500).json({message: "O curso deve estar preenchido"})
        }
        next()

    } catch(err){
        return res.status(500).json({message: "Ocorreu um erro inesperado: ", erro: err.message})
    }
}
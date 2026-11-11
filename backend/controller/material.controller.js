const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Material = require('../models/Material')
const Condominio = require('../models/Condominio')

const cadastrar = async(req,res) =>{
    const valores = req.body 

    if(!valores.descricao || !valores.categoria || !valores.quantidadeEstoque || !valores.codigoLote || !valores.idCondominio){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{

        const condominio = await Condominio.findByPk(valores.idCondominio)

        if(!condominio){
            return res.status(404).json({message: 'Condomínio não encontrado!'})
        }

        const codigoLoteCriptografada = CryptoJS.AES.encrypt(valores.codigoLote, CHAVE_SECRETA).toString()

        await Material.create({
            descricao: valores.descricao,
            categoria: valores.categoria,
            quantidadeEstoque: valores.quantidadeEstoque,
            codigoLote: codigoLoteCriptografada,
            idCondominio: valores.idCondominio
        })

        return res.status(200).json({message: 'Material cadastrado com sucesso!'})
    }catch(err){
        console.error('Erro ao cadastrar material!')
        return res.status(500).json({message: 'Erro ao cadastrar material!'})
    }
}

const atualizar = async(req,res) =>{
    const valores = req.body 
    const id = req.params.id 

    try{
        const material = await Material.findByPk(id)

        if(!material){
            return res.status(404).json({message: 'Material não encontrado!'})
        }

        const dadosAtualizados = {...valores}

        if(valores.codigoLote){
            dadosAtualizados.codigoLote = CryptoJS.AES.encrypt(valores.codigoLote, CHAVE_SECRETA).toString()
        }

        await Material.update(dadosAtualizados, {where: {codMaterial: id}})

        return res.status(200).json({message: 'Material atualizado com sucesso!'})
    }catch(err){
        console.error('Erro ao atualizar material!')
        return res.status(500).json({message: 'Erro ao atualizar material!'})
    }
}

module.exports = {cadastrar, atualizar}
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Condominio = require('../models/Condominio')

const cadastrar = async(req,res) =>{
     const valores = req.body 

    if(!valores.nome || !valores.cnpj){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        const cnpjCriptografada = CryptoJS.AES.encrypt(valores.cnpj, CHAVE_SECRETA).toString()

        await Condominio.create({
            nome: valores.nome,
            cnpj: cnpjCriptografada
        })

        return res.status(200).json({message: 'Condomínio cadastrado com sucesso!'})
    }catch(err){
        console.error('Erro ao cadastrar condomínio!')
        return res.status(500).json({message: 'Erro ao cadastrar condomínio!'})
    }
}

const consultarNome = async(req,res) =>{
    const nome = req.params.nome 

    try{
        const condominio = await Condominio.findOne({where: {nome: nome}})

        if(!condominio){
            return res.status(404).json({message: 'Condomínio não encontrado!'})
        }

        const bytesCNPJ = CryptoJS.AES.decrypt(condominio.cnpj, CHAVE_SECRETA)
        const cnpjDescriptografado = bytesCNPJ.toString(CryptoJS.enc.Utf8)

        return res.status(200).json({
            codCondominio: condominio.codCondominio,
            nome: condominio.nome,
            cnpj: cnpjDescriptografado
        })
    }catch(err){
        console.error('Erro ao consultar condomínio!')
        return res.status(500).json({message: 'Erro ao consultar condomínio!'})
    }
}

const atualizar = async(req,res) =>{
    const valores = req.body 
    const id = req.params.id 

    try{
        const condominio = await Condominio.findByPk(id)

        if(!condominio){
            return res.status(404).json({message: 'Condomínio não encontrado!'})
        }

        const dadosAtualizados = {...valores}

        if(valores.cnpj){
            dadosAtualizados.cnpj = CryptoJS.AES.encrypt(valores.cnpj, CHAVE_SECRETA).toString()
        }

        await Condominio.update(dadosAtualizados, {where: {codCondominio: id}})

        return res.status(200).json({message: 'Condomínio atualizado com sucesso!'})
    }catch(err){
        console.error('Erro ao atualizar condomínio!')
        return res.status(500).json({message: 'Erro ao atualizar condomínio!'})
    }
}

const apagar = async(req,res) =>{
    const id = req.params.id 

    try{
        const condominio = await Condominio.findByPk(id)

        if(!condominio){
            return res.status(404).json({message: 'Condomínio não encontrado!'})
        }

        await Condominio.destroy({where: {codCondominio: id}})

        return res.status(200).json({message: 'Condomínio apagado com sucesso!'})
    }catch(err){
        console.error('Erro ao apagar condomínio!')
        return res.status(500).json({message: 'Erro ao apagar condomínio!'})
    }
}

module.exports = {cadastrar, consultarNome, atualizar, apagar}
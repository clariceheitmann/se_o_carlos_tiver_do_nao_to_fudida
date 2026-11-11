const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Material = db.define('Material',{
    codMaterial:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    categoria:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quantidadeEstoque:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigoLote:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idCondominio:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codCondominio',
            model: 'condominios'
        }
    },
},{
    timestamps: false,
    tableName: 'materiais'
})

module.exports = Material
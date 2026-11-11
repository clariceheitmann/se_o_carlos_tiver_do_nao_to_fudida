const Funcionario = require('./Funcionario')
const Condominio = require('./Condominio')
const Material = require('./Material')
const Movimento = require('./Movimento')

Condominio.hasMany(Material,{
    foreignKey: 'idCondominio',
    as: 'materiaisCondominio',
    onDelete: 'CASCADE'
})

Material.belongsTo(Condominio,{
    foreignKey: 'idCondominio',
    as: 'condominioMaterial',
    allowNull: false
})

Material.hasMany(Movimento,{
    foreignKey: 'idMaterial',
    as: 'movimentosMaterial',
    onDelete: 'CASCADE'
})

Movimento.belongsTo(Material,{
    foreignKey: 'idMaterial',
    as: 'materialMovimento',
    allowNull: false
})

module.exports = {Funcionario, Condominio, Material, Movimento}
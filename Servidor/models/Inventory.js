const Sequelize = require('sequelize');
const db = require('../config/database');
const DistributionPoint = require( './DistributionPoint');
const Book = require('./Book')

const Inventory = db.define ('inventario',{
    id_dp:{
        type: Sequelize.INTEGER,
        primaryKey: true 
    },
    ISBN:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    availability:{
        type: Sequelize.INTEGER,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})
Inventory.belongsTo(DistributionPoint,{foreingkey: 'id_dp', sourcekey:'id_dp'});
Inventory.hasMany(Book,{foreingkey: 'ISBN', sourcekey:'ISBN'});

module.exports = Inventory;
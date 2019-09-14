const Sequelize = require('sequelize');
const db = require('../config/database');


const Bill = db.define ('bill',{
    id_bill:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})
/*

Bill.hasMany(BillBook,{ foreignKey: 'id_bill'});
BillBook.belongsTo(Bill,{ foreignKey: 'id_bill',source:'id_bill'});

Bill.hasMany(BillCard,{ foreignKey: 'id_bill'});
BillCard.belongsTo(Bill,{ foreignKey: 'id_bill',source:'id_bill'});
*/  




module.exports = Bill;
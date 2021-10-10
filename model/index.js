const {Sequelize,DataTypes}= require('sequelize');
const sequelize=new Sequelize(process.env.DB_NAME||'admin_mysql_db',process.env.DB_USER||'admin_mysql_db',process.env.DB_PASS||'Noor@123',{
    host:process.env.HOST_NAME||'db4free.net',
    dialect: 'mysql',
    logging:true,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
});
sequelize.authenticate()
.then(()=>{
    console.log("Connected.")
})
.catch(err=>{
    console.log("Error:"+err)
});
const db={};
db.Sequelize=Sequelize;
db.sequelize= sequelize;

db.users=require('./users')(sequelize, DataTypes);
db.sequelize.sync()
.then(()=>{
    console.log("re-sync...");
})
module.exports=db;
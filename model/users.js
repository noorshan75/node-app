module.exports=(sequelize, DataTypes)=>{
var Users=sequelize.define('testdbs',{
    name:DataTypes.STRING,
    email:{
        type:DataTypes.STRING,
        defaultValue:'example@gmail.com',
        unique:true,
    },
    gender:DataTypes.STRING,
    password:DataTypes.STRING,
});
//Insert data into db.
// Users.sync().then(()=> {
//     // Table created
//    Users.create({
//       name: 'gfdf',
//       email: 'dfhghghg@gmail.com',
//       gender:'female'
//     });
//   });

//getting data from db.
return Users;
};
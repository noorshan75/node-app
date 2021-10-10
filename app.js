const express = require('express')
const app = express()
const models=require('./model');
const controller=require('./controller');
var bodyParser=require('body-parser');
var cors = require("cors");
const authJwt=require('./verifyToken');

const swaggerDocs = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swagger = require('./swagger/swagger')

const swaggerjsDocs = swaggerDocs(swagger)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
    next();
  });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send("Hello World ");
})
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerjsDocs))
app.post('/login',controller.login)
app.post('/addUser', controller.addUser)
app.get('/fetchUsers', authJwt, controller.fetchUsers)
app.get('/fetchUser/:id',authJwt, controller.fetchUserById)
app.put('/updateById/:id',authJwt, controller.updateById)
app.delete('/delete/:id',authJwt, controller.deleteById)


app.listen(process.env.PORT || 3306,()=>{
    console.log(`Server is running on 3306.`);
})
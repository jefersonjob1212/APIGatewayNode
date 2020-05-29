var http = require('http');
var express = require('express')
var httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const hemlet = require('helmet')
const swagger = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const domainCadastro = 'http://34.67.169.192';
const domainClassificacao = 'http://localhost:8080';

const cadastroFamilias = httpProxy(domainCadastro)
const classifFamilias = httpProxy(domainClassificacao)
const swaggerOptions = {
  swaggerDefinition: {
    info:{
      version: '1.0.0',
      title: 'API Gateway Digix',
      description: 'API Gateway Cadastro e contemplação de casas populares',
      contact: {
        name: 'Jeferson Job'
      }
    },
    servers: ['http://localhost:3001']
  },
  apis: ['index.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocs))

//Cadastro principal
/**
 * @swagger
 * /v1/familias:
 *  get:
 *    description: Método que lista as famílias cadastradas que não foram validadas
 *    responses:
 *      '200':
 *        description: Requisição trouxe registro
 *      '204':
 *        description: Requisição não trouxe registros
 *      '500':
 *        description: Ocorreu erro na requisição
 * 
 */
app.get('/v1/familias', (req, res, next) =>{
  cadastroFamilias(req, res, next);
})

/**
 * @swagger
 * /v1/familias/pessoas/{cpf}:
 *  get:
 *    description: Método retorna a família pelo CPF da pessoa
 *    responses:
 *      '200':
 *        description: Requisição trouxe registro
 *      '204':
 *        description: Requisição não trouxe registro
 *      '500':
 *        description: Ocorreu erro na requisição
 * 
 */
app.get('/v1/familias/pessoas/:cpf', (req, res, next) =>{
  cadastroFamilias(req, res, next);
})

/**
 * @swagger
 * /v1/familias:
 *  post:
 *    description: Método retorna a família pelo CPF da pessoa    
 *    responses:
 *      '201':
 *        description: Família cadastrada com sucesso
 *      '400':
 *        description: Família não possui pessoa
 *      '409':
 *        description: Existem dois pretendentes na família
 *      '500': 
 *        description: Ocorreu erro na requisição
 * 
 */
app.post('/v1/familias', (req, res, next) => {
  cadastroFamilias(req, res, next);
})

/**
 * @swagger
 * /v1/familias:
 *  put:
 *    description: Método altera o status de validação da família pelo Id
 *    responses:
 *      '201':
 *        description: Família alterada com sucesso
 *      '500': 
 *        description: Ocorreu erro na requisição
 */
app.put('/v1/pessoas/:id', (req, res, next) => {
  cadastroFamilias(req, res, next);
})

/**
 * @swagger
 * /v1/pessoas:
 *  get:
 *    description: Método que lista as pessoas cadastradas
 *    responses:
 *      '200':
 *        description: Requisição trouxe registro
 *      '204':
 *        description: Requisição não trouxe registros
 *      '500':
 *        description: Ocorreu erro na requisição
 * 
 */
app.get('/v1/pessoas', (req, res, next) => {
  cadastroFamilias(req, res, next);
})

/**
 * @swagger
 * /v1/pessoas/{id}:
 *  get:
 *    description: Método que traz uma pessoa pelo Id
 *    responses:
 *      '200':
 *        description: Requisição trouxe registro
 *      '204':
 *        description: Requisição não trouxe registros
 *      '500':
 *        description: Ocorreu erro na requisição
 * 
 */
app.get('/v1/pessoas/:id', (req, res, next) => {
  cadastroFamilias(req, res, next);
})

/**
 * @swagger
 * /v1/familias/{cpf}:
 *  get:
 *    description: Método que traz uma pessoa pelo CPF
 *    responses:
 *      '200':
 *        description: Requisição trouxe registro
 *      '204':
 *        description: Requisição não trouxe registros
 *      '500':
 *        description: Ocorreu erro na requisição
 * 
 */
app.get('/v1/pressoas/:cpf', (req, res, next) => {
  cadastroFamilias(req, res, next);
})

/**
 * @swagger
 * /v1/pessoas:
 *  post:
 *    description: Método que traz uma pessoa pelo CPF
 *    responses:
 *      '201':
 *        description: Pessoa cadastrada com sucesso
 *      '400':
 *        description: CPF inválido
 *      '409':
 *        description: Já existe uma pessoa cadastrada
 *      '500': 
 *        description: Ocorreu erro na requisição
 * 
 */
app.post('/v1/pessoas', (req, res, next) => {
  cadastroFamilias(req, res, next);
})

/**
 * @swagger
 * /v1/pessoas/{id}:
 *  delete:
 *    description: Método que remove uma pessoa pelo Id
 *    responses:
 *      '200':
 *        description: Pessoa cadastrada com sucesso
 *      '204':
 *        description: Pessoa não existe
 *      '500': 
 *        description: Ocorreu erro na requisição
 * 
 */
app.delete('/v1/pessoas/:id', (req, res, next) => {
  cadastroFamilias(req, res, next);
})

//Classificação
app.get('/v1/classificacao', (req, res, next) =>{
  classifFamilias(req, res, next);
})

app.post('/v1/classificacao', (req, res, next) =>{
  classifFamilias(req, res, next);
})

app.use(logger('dev'))
app.use(hemlet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

var server = http.createServer(app)
server.listen(3001)

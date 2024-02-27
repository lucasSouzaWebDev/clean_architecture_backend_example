import { log } from 'console'
import dotenv from 'dotenv'
import express from 'express'
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario'
import SenhaCripto from './external/auth/SenhaCripto'
import RegistrarUsuarioController from './external/api/RegistrarUsuarioController'
import RepositorioUsuarioEmMemoria from './external/db/RepositorioUsuarioEmMemoria'
import LoginUsuario from './core/usuario/service/LoginUsuario'
import LoginUsuarioController from './external/api/LoginUsuarioController'
import ObterProdutoPorId from './core/produto/service/ObterProdutoPorId'
import ObterProdutoPorIdController from './external/api/ObterProdutoPorIdController'
import usuarioMiddleware from './external/api/UsuarioMiddleware'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 4000
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(port, () => {
    console.log(`Server is running in port ${port}...`)
})

// -------------------------------- Rotas Abertas

const repositorioUsuario = new RepositorioUsuarioEmMemoria()
const provedorCripto = new SenhaCripto()
const registrarUsuario = new RegistrarUsuario(repositorioUsuario, provedorCripto)

const loginUsuario = new LoginUsuario(
    repositorioUsuario,
    provedorCripto
)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

// -------------------------------- Rotas Protegidas
const usuarioMid = usuarioMiddleware(repositorioUsuario)

const obterProdutoPorId = new ObterProdutoPorId()
new ObterProdutoPorIdController(app, obterProdutoPorId, usuarioMid)
const UsuarioFactory = require('src/repositories/userRepository.js')
const ErrorHandler = require('src/middlewares/errorHandler.js')

class UsuarioController {
    constructor() {
        this.usuarioRepository = new UsuarioFactory();
    }
    async createUser(req, res) {
        try {
            const { nombre, correo, contraseña} = req.body;
            const nuevoUsuario = this.usuarioRepository.crearUsuario(nombre, correo, contraseña);

            // Aca iria logica para guardar el dato en la bd

            res.json(nuevoUsuario);
        } catch (error) {
            ErrorHandler.handleCreateUserError(error, req, res);
        }
    }

    async obtenerUsuarios(req, res) {
        try {
            const usuarios = await this.usuarioRepository.obtenerUsuarios();
            res.json(usuarios);
        } catch (error) {
            ErrorHandler.handlerGetUsersError(error, req, res);
        }
    }
}

module.exports = UsuarioController;
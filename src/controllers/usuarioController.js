const UsuarioFactory = require('src/repositories/userRepository.js')
const ErrorHandler = require('src/middlewares/errorHandler.js')

class UsuarioController {
    createUser(req, res) {
        try {
            const { nombre, correo, contraseña} = req.body;
            const nuevoUsuario = UsuarioFactory.crearUsuario(nombre, contraseña, correo);

            // Aca iria logica para guardar el dato en la bd

            res.json(nuevoUsuario);
        } catch (error) {
            ErrorHandler.handleCreateUserError(error, req, res);
        }
    }
}

module.exports = UsuarioController;
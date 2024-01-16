const Usuario = require('src/models/usuarioModel.js')

class UsuarioFactory {
    crearUsuario(nombre, correo, contraseña) {
        // Logica para guardar el nuevo usuario en la bd
        return new Usuario(nombre, correo, contraseña);
    }
}

module.exports = UsuarioFactory;
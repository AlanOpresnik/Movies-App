const Review = require('src/models/reviewModel.js')

class ReviewFactory {
    crearReview(pelicula, contenido, usuario) {
        // Logica para crear reviews
        return new Review(pelicula, contenido, usuario)
    }
}

module.exports = ReviewFactory;
const ReviewFactory = require('src/repositories/reviewRepository.js')
const ErrorHandler = require('src/middlewares/errorHandler.js')

class ReviewController {
    constructor() {
        this.reviewFactory = new ReviewFactory();
    }

    async createReview(req, res) {
        try {
            const { pelicula, contenido, usuario } = req.body;
            const nuevaReview = await this.reviewFactory.crearReview(pelicula, contenido, usuario);

            // Aca se guardan las reviews en las bd

            res.json(nuevaReview);
        } catch (error) {
            ErrorHandler.handleCreateReviewError(error, req, res);
        }
    }

    async obtenerReviews(req, res) {
        try {

            // el metodo obtenerReviews no esta implementado
            const reviews = await this.reviewFactory.obtenerReviews();
            res.json(reviews);
        } catch (error) {
            ErrorHandler.handleGetReviewsError(error, req, res);
        }
    }
}

module.exports = ReviewController;
class ErrorHandler {
    static sendErrorResponse(res, statusCode, errorMessage) {
      console.error(errorMessage);
      res.status(statusCode).json({ error: errorMessage });
    }
  
    static handle404Error(req, res, next) {
      ErrorHandler.sendErrorResponse(res, 404, 'Ruta no encontrada');
    }
  
    static handleGeneralErrors(err, req, res, next) {
      ErrorHandler.sendErrorResponse(res, 500, 'Error interno del servidor');
    }
  
    static handleCreateUserError(req, res, next) {
      ErrorHandler.sendErrorResponse(res, 400, 'Error al crear el usuario');
    }
  
    static handleCreateReviewError(req, res, next) {
      ErrorHandler.sendErrorResponse(res, 400, 'Error al crear la review');
    }
  
    static handleGetReviewsError(req, res, next) {
      ErrorHandler.sendErrorResponse(res, 500, 'Error al obtener las reviews');
    }
  }
  
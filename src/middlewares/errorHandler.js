class ErrorHandler {
    static sendErrorResponse(res, statusCode, errorMessage, err) {
      console.error(errorMessage);
      if (err) {
        console.error(err.stack || err.message || err);
      }
      res.status(statusCode).json({ error: errorMessage });
    }
  
    static handle404Error(req, res, next) {
      ErrorHandler.sendErrorResponse(res, 404, 'Ruta no encontrada');
    }
  
    static handleGeneralErrors(err, req, res, next) {
      ErrorHandler.sendErrorResponse(res, 500, 'Error interno del servidor', err);
    }
  
    static handleCreateUserError(err, req, res, next) {
      ErrorHandler.sendErrorResponse(res, 400, 'Error al crear el usuario', err);
    }
  
    static handleCreateReviewError(err, req, res, next) {
      ErrorHandler.sendErrorResponse(res, 400, 'Error al crear la review', err);
    }
  
    static handleGetReviewsError(err, req, res, next) {
      ErrorHandler.sendErrorResponse(res, 500, 'Error al obtener las reviews', err);
    }
  }
  
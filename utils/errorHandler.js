function errorHandler(res , status , error){
    res.status(status).json({
        success : false , 
        status : status || 500 , 
        error : error?.message || error?.error?.message || error || 'Internal Server Error'
    })
}

module.exports = errorHandler
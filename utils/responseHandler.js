function responseHandler(res , status , data , isSuccess){
    res.status(status).json({
        success : isSuccess,
        status : status || 200 , 
        data : data
    })
}

module.exports = responseHandler
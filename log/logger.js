function requestLogger(req,res,next)
{
    const timestamp=new Date().toISOString();
    console.log(`Time:=> ${timestamp} reqMethod:=>${req.method} requrl:=>${req.url}`);

    next();
}

export default requestLogger;
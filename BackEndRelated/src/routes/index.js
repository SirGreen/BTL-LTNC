const adminRouter = require('./admin')

function router(app)
{
    app.use('/admin',adminRouter)
    //app.get('/bap',BapTora)
}
var router = require('./lib/router');

module.exports = function (app,config){

    require.extensions['.ctrl.js'] = require.extensions['.js'];
    require.extensions['.model.js'] = require.extensions['.js'];
    require.extensions['.routes.js'] = require.extensions['.js'];


    router(app).then(function(){
        app.listen(config.port);
        console.log('app listening on port ' + config.port + ' and in ' + config.env + ' environment');
    })
};
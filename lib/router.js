var glob = require('./services/glob'),
    router = require('koa-router'),
    fileSystem = require("q-io/fs"),
    _ = require('lodash');

//todo its ugly do something !!!!
module.exports = function (app){
    return new Promise(function(resolve,reject){
        fileSystem
            .listTree('./src')
            .then(function(tree){
                var routes = [];
                tree.forEach(function(path){
                    let part = path.split('/')[1];
                    if(part != '_common' && part != 'src'){
                        routes.push(part);
                    }
                });
                routes = _.uniq(routes);
                routes.forEach(function(route){
                    let myRouter = new router(app);
                    glob('./src/'+route+'/**/*.routes.js')
                        .forEach(function (routePath) {
                            require(require('path').resolve(routePath))(myRouter);
                        });
                    app.use(require('koa-mount')('/'+route, myRouter.middleware()));
                });
                resolve()
            })
            .catch(function(err){
                reject(err);
            });
    });
};
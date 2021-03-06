import 'babel-register';
import Express from 'express';
import Path from 'path';
import {default as Logger} from 'morgan';
import BodyParser from 'body-parser';
import Mongoose from 'mongoose';

import Swig from 'swig';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {match, RoutingContext} from 'react-router';

import routes from './app/src/routes/routes';
import Config from './server/config';
import Business from './server/biz/Business';


let app = Express();
{
  Mongoose.connect(Config.database);
  Mongoose.connection.on('error', function () {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
  });

  app.set('port', process.env.PORT || 3000);
  app.use(Logger('dev'));
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({extended: false}));
  app.use(Express.static(Path.join(__dirname, 'app/public')));
}

app.post('/api/mission', function (req, res, next) {
  let item = {
    parentId: req.body.parentId,
    name: req.body.name,
    description: req.body.description,
    type: req.body.type
  };
  Business.addItem(item)
    .then((data) => {
      console.log('/api/mission', data);
      res.send(data);
    });
});

app.put('/api/mission', function (req, res, next) {
  let condition = req.body;
  console.log('put/api/mission', JSON.stringify(condition));
  Business.updateItem(condition)
    .then((data) => {
      res.send(data);
    });
});

app.get('/api/missionList', function (req, res, next) {
  let condition = req.query.condition;
  if (req.query.type == 'PLAN') {
    Object.assign(condition,{parentId:{$eq: null}});
  };
  Business.getGeneralList(condition).then((data)=>{
    res.send(data);
  });
});

app.get('/api/mission', function (req, res, next) {
  console.log('get mission' + req.query.id);
  if (req.query.id) {
    console.log('get mission' + req.query.id);
    var para = {"_id": req.query.id};
    Mission
      .find(para)
      .exec(function (err, missions) {
        if (err) return next(err);
        res.send(missions);
      });
  }
});

app.get('/api/test', function (req, res, next) {
  //res.send(Business.addTask());
  //res.send(Business.updateTask());
   let promise = Business.getItemWithSubList({_id:'5896919ca63ea406b976b67b'});
   promise.then(function (v) {
   console.log('tmp1',v);
   res.send(v);
   })

});
app.get('/api/migration', function (req, res, next) {
  Utils.migration().then((data)=>{
    res.send(data);
  });
});


app.use(function (req, res) {
  match({routes: routes, location: req.url}, function (err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(RoutingContext, renderProps));
      var page = Swig.renderFile('./app/public/index.html', {html: html});
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});



app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

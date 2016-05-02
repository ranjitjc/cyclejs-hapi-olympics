/*jshint esversion: 6 */
'use strict';

// import fs from 'fs';
// import Rx from 'rx';

const fs = require('fs');
const Rx = require('rxjs');
const _ = require('lodash')
var Discipline = require('../../models/discipline.js');

exports.findDisciplines = {
  handler: (request, reply) => {
    var disStream = new Rx.Subject();

    let readFileAsObservable = Rx.Observable.of()

    Discipline.find(function(err, discipline) {
      if (err) {
        reply({info: 'error during find cats', error: err});
      };
      data.subscribe(data => { 
        console.log('data.length' + data.length); 
        disStream.next(data); 
      });
    
    });


    
    
    disStream.subscribe(disciplines => { 
        return reply({info: 'disciplines found successfully', data: disciplines}); 
    });
    
  }
}


function connect() {
  return rx.Observable.create(function (observer) {
    mongo.connect('mongodb://127.0.1:27017/olympics', function(err, db) {
      if(err) observer.onError(err);
      observer.onNext(db);
    });
  }).publish().refCount();
}

function getThings() {
  return connect()
    .flatMap(function(db) {
      return rx.Observable.create(function (observer) {
        db.collection('olympics').find().toArray(function(err, results) {
          if(err) observer.onError(err);
          observer.onNext(results);
          observer.onCompleted();
        });
        return function () {
          db.close();
        };
      });
    });
}

connect().subscribe(
  function (db) {
    getThings(db).subscribe(console.log);
  }, function (err) {
    console.log(err);
  }
);
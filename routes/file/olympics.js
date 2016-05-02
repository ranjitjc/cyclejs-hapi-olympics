/*jshint esversion: 6 */
'use strict';

// import fs from 'fs';
// import Rx from 'rx';

const fs = require('fs');
const Rx = require('rxjs');
const _ = require('lodash')


exports.getDisciplines = {
  handler: (request, reply) => {
    var disStream = new Rx.Subject();

    let readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
    let data = readFileAsObservable('./data/discipline.json', 'utf8');
    data.subscribe(data => { console.log('data.length : ' + _.size(JSON.parse(data))); disStream.next(data); });
    
    disStream.subscribe(disciplines => { return reply(disciplines); });
    
  }
}

exports.getEvents = {
  handler: (request, reply) => {
    var disStream = new Rx.Subject();

    let readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
    let data = readFileAsObservable('./data/events.json', 'utf8');
    data.subscribe(data => { console.log('data.length : ' + _.size(JSON.parse(data))); disStream.next(data); });
    
    disStream.subscribe(events => { return reply(events); });
    
  }
}

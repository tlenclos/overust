import Router from 'koa-router';
import json from 'koa-json';
import { Wipe } from './database/index';
import parse from 'co-body';

let api = new Router();
api.use(json());

api.get('/wipe', function*(next) {
    this.body = yield Wipe.findAll();
});

api.post('/wipe', function*(next) {
    console.log('post');
    let body = yield parse(this); // TODO Blocking the response, don't know why
    console.log('body', body);
    /*
     from, to, serverName, serverUrl
     */
});

export default api;
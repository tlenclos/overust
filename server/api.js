import Router from 'koa-router';
import { Wipe } from './database/index';
import parse from 'co-body';

let api = new Router();

api.get('/wipe', function*(next) {
    this.body = yield Wipe.findAll();
});

api.post('/wipe', function*(next) {
    let body = yield parse(this);
    this.body = yield Wipe.create({
        from: body.from,
        to: body.to,
        serverName: body.serverName,
        serverUrl: body.serverUrl
    });
    this.status = 201;
});

export default api;

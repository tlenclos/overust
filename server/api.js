import Router from 'koa-router';
import { User, Wipe } from './database/index';
import parse from 'co-body';

let api = new Router();

api.get('/wipe', function*(next) {
    this.body = yield Wipe.findAll({
        include: [{
            model: User,
            through: {
                // TODO Filter seems to happen on relation table, not on user
                attributes: ['username']
            }
        }]
    });
});

api.post('/wipe', function*(next) {
    let body = yield parse.json(this);

    try {
        let currentUser = yield User.findOne({ where: {steamId: this.req.user.id} });
        let wipe = yield Wipe.create({
            from: body.from,
            to: body.to,
            serverName: body.serverName,
            serverUrl: body.serverUrl
        });

        this.body = wipe.addUser([currentUser]);
        this.status = 201;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            this.body = { errors: error.errors };
            this.status = 400;
        } else {
            throw error;
        }
    }
});

export default api;

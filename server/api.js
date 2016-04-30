import Router from 'koa-router';
import { User, Wipe } from './database/index';
import parse from 'co-body';
import steam from 'steam-web';
import memoryCache from 'memory-cache';

memoryCache.debug(true);
const steamApi = new steam({
    apiKey: '97505E040CF70988B993C6FF6B5F6DA3',
    format: 'json'
});

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
        if (currentUser) {
            throw new Error('Invalid user !');
        }

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


api.get('/friends', function*(next) {
    // Fetch steam friends and populate their basic profile information
    const cacheKey = `friends_${this.req.user.id}`;
    const cacheValue = memoryCache.get(cacheKey);

    if (cacheValue) {
        this.body = cacheValue;
    } else {
        yield new Promise((resolve, reject) => {
            steamApi.getFriendList({
                steamid: this.req.user.id,
                relationship: 'all', //'all' or 'friend'
                callback: (err, data) => {
                    if (err) {
                        this.body = err;
                    } else {
                        let steamIds = data.friendslist.friends.map((friend) => {
                            return friend.steamid;
                        });

                        steamApi.getPlayerSummaries({
                            steamids: steamIds,
                            callback: (err, data) => {
                                if (err) {
                                    this.body = err;
                                } else {
                                    let friends = data.response.players;
                                    memoryCache.put(cacheKey, friends, 3600*1000);
                                    this.body = friends;
                                }

                                resolve();
                            }
                        });
                    }
                }
            });
        });
    }
});

export default api;

import http from './API'
import config from '../config'

export async function login(email, password) {
    try {
        const res = await http.post(config.endpoints.user.login, {email, password});
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function register(email, password, username) {
    try {
        const res = await http.post(config.endpoints.user.register, {email, password, username});
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getMe() {
    try {
        const res = await http.get(config.endpoints.user.getMe);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getLeaderBoard() {
    try {
        const res = await http.get(config.endpoints.user.leaderBoard);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateScore(score) {
    try {
        const res = await http.post(config.endpoints.user.updateScore, {score});
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const dev = {
    baseUrl: 'http://localhost:5000/api/v1'
}

const prod = {
    baseUrl: 'https://snake-backend-1.herokuapp.com/api/v1'
}

const config = process.env.REACT_APP_ENV === 'dev' ? dev : prod;

export default {
    ...config,
    endpoints: {
        user: {
            login: '/user/login',
            register: '/user/register',
            getMe: '/user/getme',
            leaderBoard: '/user/leaderboard',
            updateScore: '/user/updatescore'
        }
    }
}
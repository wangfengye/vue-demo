import App from '../App.vue'

const home = r => require.ensure([], () => r(require('../page/home')), 'home');
const fade = r => require.ensure([], () => r(require('../page/fade')), 'fade');
const resume = r => require.ensure([], () => r(require('../page/resume')), 'resume');
const test = r => require.ensure([], () => r(require('../page/test')), 'test');

const elmhome = r => require.ensure([], () => r(require('../elmpage/home')), 'elmhome');
const login = r => require.ensure([], () => r(require('../elmpage/login')), 'login');
const city = r => require.ensure([], () => r(require('../elmpage/city')), 'city');
const msite = r => require.ensure([], () => r(require('../elmpage/msite')), 'msite');

export default [{
    path: '/',
    component: App,
    redirect: '/elmhome',
    children: [{
        path: '/home',
        component: home
    },
    {
        path: '/fade',
        component: fade
    },
    {
        path: '/resume',
        component: resume
    },
    {
        path: '/test',
        component: test
    },
    /*elm*/
    {
        path: '/elmhome',
        component: elmhome
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/city/:cityid',
        component: city
    },
    {
        path:'/msite',
        component:msite
    }

    ]
}]
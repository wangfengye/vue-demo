import App from '../App.vue'

const home = r => require.ensure([], () => r(require('../page/home')), 'home');
const fade = r => require.ensure([], () => r(require('../page/fade')), 'fade');
const resume = r => require.ensure([], () => r(require('../page/resume')), 'resume');
const test = r => require.ensure([], () => r(require('../page/test')), 'test');

const elmhome = r => require.ensure([], () => r(require('../elmpage/home')), 'elmhome');
const login = r => require.ensure([], () => r(require('../elmpage/login')), 'login');
const city = r => require.ensure([], () => r(require('../elmpage/city')), 'city');
const msite = r => require.ensure([], () => r(require('../elmpage/msite')), 'msite');
const shop = r => require.ensure([], () => r(require('../elmpage/shop/shop')), 'shop')
const foodDetail = r =>require.ensure([],()=>r(require('../elmpage/shop/foodDetail')),'foodDetail');
const shopDetail = r =>require.ensure([],()=>r(require('../elmpage/shop/shopDetail')),'shopDetail');
const shopSafe = r =>require.ensure([],()=>r(require('../elmpage/shop/shopSafe')),'shopSafe');


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
    },
    {
        path:'/shop',
        component:shop,
        children:[{
            path:'foodDetail',//食品详情
            component:foodDetail
        },
        {
            path:'shopDetail',//商铺详情
            component:shopDetail,
            children:[{
                path:'shopSafe',//商铺安全认证
                component:shopSafe
            }]
        }
        
        ]
    }

    ]
}]
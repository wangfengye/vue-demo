import App from '../App.vue'
import fade from '../page/fade.vue'
import resume from '../page/resume.vue'
import home from '../page/home.vue'
import test from '../page/test.vue'
import elmhome from '../elmpage/home.vue'
import login from '../elmpage/login.vue'


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
    }

    ]
}]
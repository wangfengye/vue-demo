import App from '../App.vue'
import headTop from '../components/head-top.vue'
import fade from '../page/fade.vue'
import resume from '../page/resume.vue'
import home from '../page/home.vue'
import test from '../page/test.vue'


export default [{
    path: '/',
    component: App,
    redirect: '/home',
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
    }

    ]
}]
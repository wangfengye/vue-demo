import App from '../App.vue'
import headTop from '../components/head-top.vue'
import fade from '../page/fade.vue'
import resume from '../page/resume.vue'

export default [{
    path: '/',
    component: App,
    children: [{
        path: '/a',
        component: headTop
    }
        ,
    {
        path: '/fade',
        component: fade
    },
    {
        path:'/resume',
        component :resume
    }
    ]
}]